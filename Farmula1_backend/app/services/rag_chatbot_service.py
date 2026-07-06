"""
RAG Chatbot Service with ChromaDB and OpenAI API
Updated for latest LangChain libraries (v0.3+)
"""

import os
import hashlib
from typing import List, Optional
from pathlib import Path

# Updated imports for LangChain v0.3+
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.runnables import RunnablePassthrough
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.output_parsers import StrOutputParser
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.documents import Document

# Text splitting - using simple implementation to avoid heavy dependencies
from typing import Sequence


class RAGChatbotService:
    """
    RAG Chatbot Service managing vector DB and conversational AI
    
    Key Components:
    - ChromaDB: Vector database for storing document embeddings
    - OpenAI: For embeddings and chat responses
    - LangChain: Framework orchestrating RAG pipeline
    
    Architecture:
    1. PDF Ingestion → Text Extraction → Chunking → Embeddings → ChromaDB
    2. User Query → Retrieval → Context + Chat History → LLM → Response
    """
    
    @staticmethod
    def _simple_text_splitter(text: str, chunk_size: int = 1000, chunk_overlap: int = 200) -> list[str]:
        """
        Simple text splitter to avoid heavy sentence_transformers dependency
        
        Splits text on paragraph boundaries first, then on sentences, then on words
        
        Args:
            text: Text to split
            chunk_size: Maximum size of each chunk
            chunk_overlap: Number of characters to overlap between chunks
            
        Returns:
            List of text chunks
        """
        if not text or len(text) <= chunk_size:
            return [text] if text else []
        
        chunks = []
        separators = ["\n\n", "\n", ". ", " "]
        
        def split_text_recursive(text: str, separators: list[str]) -> list[str]:
            if not separators:
                # No separators left, split by character
                result = []
                for i in range(0, len(text), chunk_size - chunk_overlap):
                    result.append(text[i:i + chunk_size])
                return result
            
            separator = separators[0]
            splits = text.split(separator)
            
            result = []
            current_chunk = ""
            
            for split in splits:
                # If adding this split would exceed chunk_size, process current chunk
                if len(current_chunk) + len(split) + len(separator) > chunk_size:
                    if current_chunk:
                        # If current chunk is still too large, recursively split
                        if len(current_chunk) > chunk_size:
                            result.extend(split_text_recursive(current_chunk, separators[1:]))
                        else:
                            result.append(current_chunk)
                        current_chunk = split
                    else:
                        # Single split is too large, recursively split it
                        if len(split) > chunk_size:
                            result.extend(split_text_recursive(split, separators[1:]))
                        else:
                            result.append(split)
                else:
                    # Add to current chunk
                    if current_chunk:
                        current_chunk += separator + split
                    else:
                        current_chunk = split
            
            # Add remaining chunk
            if current_chunk:
                if len(current_chunk) > chunk_size:
                    result.extend(split_text_recursive(current_chunk, separators[1:]))
                else:
                    result.append(current_chunk)
            
            return result
        
        # Initial split
        initial_chunks = split_text_recursive(text, separators)
        
        # Add overlap between chunks
        for i, chunk in enumerate(initial_chunks):
            if i > 0 and chunk_overlap > 0:
                # Add overlap from previous chunk
                prev_chunk = initial_chunks[i - 1]
                overlap = prev_chunk[-chunk_overlap:] if len(prev_chunk) >= chunk_overlap else prev_chunk
                chunk = overlap + chunk
            chunks.append(chunk)
        
        return chunks
    
    @staticmethod
    def _split_documents(documents: Sequence[Document], chunk_size: int = 1000, chunk_overlap: int = 200) -> list[Document]:
        """
        Split documents into smaller chunks while preserving metadata
        
        Args:
            documents: List of Document objects
            chunk_size: Maximum size of each chunk
            chunk_overlap: Overlap between chunks
            
        Returns:
            List of Document chunks
        """
        split_docs = []
        
        for doc in documents:
            text_chunks = RAGChatbotService._simple_text_splitter(
                doc.page_content, 
                chunk_size=chunk_size, 
                chunk_overlap=chunk_overlap
            )
            
            for chunk in text_chunks:
                split_docs.append(
                    Document(
                        page_content=chunk,
                        metadata=doc.metadata.copy()
                    )
                )
        
        return split_docs
    
    def __init__(
        self,
        openai_api_key: str,
        persist_directory: str = "./chroma_db",
        collection_name: str = "farming_knowledge",
        embedding_model: str = "text-embedding-3-small",
        chat_model: str = "gpt-3.5-turbo"
    ):
        """
        Initialize the RAG Chatbot Service
        
        Args:
            openai_api_key: OpenAI API key
            persist_directory: Directory to persist ChromaDB
            collection_name: Name of the ChromaDB collection
            embedding_model: OpenAI embedding model (text-embedding-3-small or text-embedding-3-large)
            chat_model: OpenAI chat model (gpt-4o, gpt-4o-mini, gpt-3.5-turbo, etc.)
        """
        self.openai_api_key = openai_api_key
        self.persist_directory = persist_directory
        self.collection_name = collection_name
        
        # Track processed PDFs to avoid reprocessing
        self.metadata_file = Path(persist_directory) / "processed_pdfs.txt"
        
        # Initialize embeddings model (OpenAI)
        self.embeddings = OpenAIEmbeddings(
            model=embedding_model,
            api_key=openai_api_key
        )
        
        # Initialize or load existing vector store
        self.vector_store = self._initialize_vector_store()
        
        # Initialize OpenAI chat model
        self.llm = ChatOpenAI(
            model=chat_model,
            api_key=openai_api_key,
            temperature=0.7
        )
        
        # Create custom prompt template for farming context
        self.prompt_template = self._create_prompt_template()
        
        # Initialize conversation memory (session-based)
        self.message_history = ChatMessageHistory()
        
        # Create RAG chain (new LangChain v0.3 pattern)
        self.rag_chain = self._create_rag_chain()
    
    def _initialize_vector_store(self) -> Chroma:
        """
        Initialize ChromaDB vector store
        Loads existing DB if available, creates new one otherwise
        
        Returns:
            Chroma vector store instance
        """
        # Ensure persist directory exists
        Path(self.persist_directory).mkdir(parents=True, exist_ok=True)
        
        # Check if DB already exists
        chroma_path = Path(self.persist_directory) / "chroma.sqlite3"
        
        if chroma_path.exists():
            print(f"✅ Loading existing ChromaDB from {self.persist_directory}")
        else:
            print(f"🆕 Creating new ChromaDB at {self.persist_directory}")
        
        # Use updated Chroma initialization (langchain-chroma package)
        return Chroma(
            collection_name=self.collection_name,
            embedding_function=self.embeddings,
            persist_directory=self.persist_directory
        )
    
    def _create_prompt_template(self) -> ChatPromptTemplate:
        """
        Create a custom prompt template for farming assistant
        Uses ChatPromptTemplate for better chat-based interactions
        
        Returns:
            ChatPromptTemplate instance
        """
        system_message = """You are an expert AI farming assistant helping farmers with their questions.
Use the following pieces of context from the farming knowledge base to answer the question.
If you don't know the answer based on the context, say so honestly and provide general farming advice if relevant.
Always be helpful, practical, and consider the farmer's perspective.

Context from knowledge base:
{context}"""

        # Create chat prompt with system message and conversation history
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_message),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}")
        ])
        
        return prompt
    
    def _create_rag_chain(self):
        """
        Create the RAG chain using LCEL (LangChain Expression Language)
        
        This is a more direct approach that doesn't require langchain.chains
        
        Chain flow:
        1. Retrieve relevant documents from vector store
        2. Format documents into context string
        3. Add to prompt with chat history
        4. Send to LLM
        5. Parse output
        
        Returns:
            Configured RAG chain with memory
        """
        # Create retriever from vector store
        retriever = self.vector_store.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 4}  # Retrieve top 4 most relevant chunks
        )
        
        # Function to format retrieved documents
        def format_docs(docs):
            return "\n\n".join(doc.page_content for doc in docs)
        
        # Create the base RAG chain using LCEL
        # Input should be a string (the question), not a dict
        rag_chain_core = (
            RunnablePassthrough.assign(
                context=lambda x: format_docs(retriever.invoke(x["input"]))
            )
            | self.prompt_template
            | self.llm
            | StrOutputParser()
        )
        
        # Wrap with message history for conversation memory
        conversational_chain = RunnableWithMessageHistory(
            rag_chain_core,
            lambda session_id: self.message_history,
            input_messages_key="input",
            history_messages_key="chat_history",
        )
        
        return conversational_chain
    
    def _get_pdf_hash(self, pdf_path: str) -> str:
        """
        Generate hash of PDF file to track if it's already processed
        
        Args:
            pdf_path: Path to PDF file
            
        Returns:
            SHA256 hash of the file
        """
        hash_sha256 = hashlib.sha256()
        with open(pdf_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_sha256.update(chunk)
        return hash_sha256.hexdigest()
    
    def _is_pdf_processed(self, pdf_hash: str) -> bool:
        """
        Check if PDF has already been processed
        
        Args:
            pdf_hash: Hash of the PDF file
            
        Returns:
            True if already processed, False otherwise
        """
        if not self.metadata_file.exists():
            return False
        
        with open(self.metadata_file, "r") as f:
            processed_hashes = f.read().splitlines()
        
        return pdf_hash in processed_hashes
    
    def _mark_pdf_processed(self, pdf_hash: str, pdf_name: str):
        """
        Mark PDF as processed by saving its hash
        
        Args:
            pdf_hash: Hash of the PDF file
            pdf_name: Name of the PDF file for reference
        """
        with open(self.metadata_file, "a") as f:
            f.write(f"{pdf_hash}  # {pdf_name}\n")
    
    def ingest_pdf(self, pdf_path: str) -> dict:
        """
        Ingest a PDF into the vector database
        Skips if already processed
        
        Args:
            pdf_path: Path to the PDF file
            
        Returns:
            Dictionary with status and message
            
        Process Flow:
        1. Hash PDF file to check if already processed
        2. Load PDF using PyPDFLoader (extracts text from each page)
        3. Split text into chunks (1000 chars with 200 char overlap)
           - Overlap ensures context isn't lost at chunk boundaries
        4. Generate embeddings using OpenAI's embedding model
           - Converts text chunks into vector representations
        5. Store vectors in ChromaDB for similarity search
        6. Mark PDF as processed to avoid duplicate work
        """
        pdf_name = Path(pdf_path).name
        
        try:
            pdf_hash = self._get_pdf_hash(pdf_path)
            
            # Check if already processed
            if self._is_pdf_processed(pdf_hash):
                return {
                    "status": "skipped",
                    "message": f"PDF '{pdf_name}' already processed. Using existing data.",
                    "pdf_name": pdf_name
                }
            
            print(f"📄 Processing new PDF: {pdf_name}")
            
            # Load PDF
            loader = PyPDFLoader(pdf_path)
            documents = loader.load()
            
            if not documents:
                return {
                    "status": "error",
                    "message": f"PDF '{pdf_name}' appears to be empty or unreadable",
                    "pdf_name": pdf_name
                }
            
            print(f"   Loaded {len(documents)} pages")
            
            # Split documents into chunks using our custom splitter
            splits = self._split_documents(
                documents,
                chunk_size=1000,
                chunk_overlap=200
            )
            
            if not splits:
                return {
                    "status": "error",
                    "message": f"PDF '{pdf_name}' could not be split into chunks",
                    "pdf_name": pdf_name
                }
            
            print(f"   Created {len(splits)} chunks")
            
            # Add metadata to each chunk
            for i, split in enumerate(splits):
                split.metadata.update({
                    "source": pdf_name,
                    "chunk": i,
                    "total_chunks": len(splits)
                })
            
            # Add to vector store
            print(f"   Generating embeddings and storing in ChromaDB...")
            self.vector_store.add_documents(splits)
            
            # Mark as processed
            self._mark_pdf_processed(pdf_hash, pdf_name)
            
            print(f"✅ Successfully processed {len(splits)} chunks from '{pdf_name}'")
            
            return {
                "status": "success",
                "message": f"Successfully processed '{pdf_name}' - {len(splits)} chunks added to knowledge base",
                "pdf_name": pdf_name,
                "chunks_added": len(splits)
            }
            
        except Exception as e:
            import traceback
            error_msg = f"Error processing '{pdf_name}': {str(e)}"
            print(f"❌ {error_msg}")
            traceback.print_exc()
            
            return {
                "status": "error",
                "message": error_msg,
                "pdf_name": pdf_name,
                "error_details": traceback.format_exc()
            }
    
    def ingest_multiple_pdfs(self, pdf_paths: List[str]) -> List[dict]:
        """
        Ingest multiple PDFs at once
        
        Args:
            pdf_paths: List of paths to PDF files
            
        Returns:
            List of results for each PDF
        """
        results = []
        for pdf_path in pdf_paths:
            try:
                result = self.ingest_pdf(pdf_path)
                results.append(result)
            except Exception as e:
                results.append({
                    "status": "error",
                    "message": f"Error processing '{Path(pdf_path).name}': {str(e)}",
                    "pdf_name": Path(pdf_path).name
                })
        
        return results
    
    def has_knowledge_base(self) -> bool:
        """
        Check if the knowledge base has any data
        
        Returns:
            True if DB has documents, False otherwise
        """
        try:
            # Access the underlying collection
            collection = self.vector_store._collection
            return collection.count() > 0
        except:
            return False
    
    def get_knowledge_base_stats(self) -> dict:
        """
        Get statistics about the knowledge base
        
        Returns:
            Dictionary with stats (document count, processed PDFs, etc.)
        """
        try:
            collection = self.vector_store._collection
            doc_count = collection.count()
            
            # Get processed PDFs
            processed_pdfs = []
            if self.metadata_file.exists():
                with open(self.metadata_file, "r") as f:
                    for line in f.read().splitlines():
                        if "#" in line:
                            pdf_name = line.split("#")[1].strip()
                            processed_pdfs.append(pdf_name)
            
            return {
                "total_chunks": doc_count,
                "total_pdfs": len(processed_pdfs),
                "processed_pdfs": processed_pdfs,
                "has_data": doc_count > 0
            }
        except Exception as e:
            return {
                "total_chunks": 0,
                "total_pdfs": 0,
                "processed_pdfs": [],
                "has_data": False,
                "error": str(e)
            }
    
    def chat(self, question: str, language: str = "en") -> dict:
        """
        Process a chat message and return AI response
        
        Args:
            question: User's question
            language: Language code (en, hi, pa, etc.)
            
        Returns:
            Dictionary with answer and source documents
            
        How it works:
        1. User asks a question
        2. Question is converted to embedding vector
        3. ChromaDB finds top 4 similar document chunks (cosine similarity)
        4. Retrieved chunks + chat history + question sent to LLM
        5. LLM generates contextual response
        6. Response and sources returned to user
        """
        # Add language instruction if not English
        language_instruction = ""
        if language != "en":
            lang_map = {
                "hi": "Hindi (हिंदी)",
                "pa": "Punjabi (ਪੰਜਾਬੀ)",
                "mr": "Marathi (मराठी)",
                "ta": "Tamil (தமிழ்)",
                "te": "Telugu (తెలుగు)"
            }
            language_instruction = f" Please respond in {lang_map.get(language, 'the requested language')}."
        
        full_question = question + language_instruction
        
        # Get retrieved documents manually for source tracking
        retriever = self.vector_store.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 4}
        )
        retrieved_docs = retriever.invoke(full_question)
        
        # Invoke the chain with session_id for memory management
        # The chain expects {"input": "question text"}
        answer = self.rag_chain.invoke(
            {"input": full_question},
            config={"configurable": {"session_id": "default"}}
        )
        
        # Extract source information from retrieved docs
        sources = []
        for doc in retrieved_docs:
            sources.append({
                "source": doc.metadata.get("source", "Unknown"),
                "chunk": doc.metadata.get("chunk", 0),
                "content": doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content
            })
        
        return {
            "answer": answer,
            "sources": sources,
            "has_sources": len(sources) > 0
        }
    
    def reset_conversation(self):
        """
        Reset conversation memory
        Clears all chat history from the current session
        """
        self.message_history.clear()
    
    def delete_knowledge_base(self):
        """
        Delete entire knowledge base (use with caution!)
        Removes ChromaDB and processed PDFs metadata
        """
        import shutil
        import time
        
        # Clear the vector store
        try:
            self.vector_store.delete_collection()
        except:
            pass
        
        # Give Windows time to release file handles
        time.sleep(1)
        
        if Path(self.persist_directory).exists():
            try:
                shutil.rmtree(self.persist_directory)
                print("🗑️ Knowledge base deleted")
            except PermissionError:
                print("⚠️ Could not delete some files (they may be in use)")
                print("   Knowledge base will be reset on next initialization")
                if self.metadata_file.exists():
                    self.metadata_file.unlink()
        else:
            print("🗑️ Knowledge base already empty")
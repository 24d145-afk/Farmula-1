"""
FastAPI routes for RAG Chatbot with OpenAI
File location: Farmula1_backend/app/routes/chatbot.py
"""

import os
import logging
from typing import List, Optional
from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from pathlib import Path
import tempfile
import shutil
import traceback

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/chatbot", tags=["Chatbot"])

# Global service instance
_rag_service = None
_initialization_error = None


def get_rag_service():
    """
    Get or create RAG service instance with proper error handling
    """
    global _rag_service, _initialization_error
    
    if _rag_service is not None:
        return _rag_service
    
    # If we already tried and failed, return the cached error
    if _initialization_error is not None:
        raise _initialization_error
    
    try:
        # Check API key first
        openai_api_key = os.getenv("OPENAI_API_KEY")
        if not openai_api_key:
            error_msg = (
                "OPENAI_API_KEY environment variable not set. "
                "Set it before starting the server: export OPENAI_API_KEY='your-key'"
            )
            logger.error(error_msg)
            _initialization_error = ValueError(error_msg)
            raise _initialization_error
        
        logger.info("Initializing RAG Chatbot Service with OpenAI...")
        
        # Import here to catch import errors
        try:
            from app.services.rag_chatbot_service import RAGChatbotService
        except ImportError as e:
            error_msg = f"Failed to import RAGChatbotService: {str(e)}"
            logger.error(error_msg)
            logger.error("Make sure app/services/rag_chatbot_service.py exists")
            _initialization_error = ImportError(error_msg)
            raise _initialization_error
        
        # Create data directory if it doesn't exist
        data_dir = Path("./data/chroma_db")
        data_dir.mkdir(parents=True, exist_ok=True)
        logger.info(f"Data directory: {data_dir.absolute()}")
        
        # Initialize service with OpenAI
        _rag_service = RAGChatbotService(
            openai_api_key=openai_api_key,
            persist_directory=str(data_dir),
            collection_name="farming_knowledge",
            embedding_model="text-embedding-3-small",  # or "text-embedding-3-large"
            chat_model="gpt-4o-mini"  # or "gpt-4o", "gpt-3.5-turbo"
        )
        
        logger.info("✅ RAG Chatbot Service initialized successfully with OpenAI")
        return _rag_service
        
    except Exception as e:
        error_msg = f"Failed to initialize RAG service: {str(e)}"
        logger.error(error_msg)
        logger.error(traceback.format_exc())
        _initialization_error = e
        raise


# Pydantic models
class ChatRequest(BaseModel):
    message: str
    language: str = "en"


class ChatResponse(BaseModel):
    answer: str
    sources: List[dict]
    has_sources: bool


class KnowledgeBaseStats(BaseModel):
    total_chunks: int
    total_pdfs: int
    processed_pdfs: List[str]
    has_data: bool
    error: Optional[str] = None


class UploadResponse(BaseModel):
    status: str
    message: str
    results: List[dict]


@router.get("/health")
async def health_check():
    """
    Health check endpoint - useful for debugging
    """
    try:
        service = get_rag_service()
        return {
            "status": "healthy",
            "service_initialized": True,
            "provider": "OpenAI",
            "message": "RAG Chatbot service is running with OpenAI"
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {
            "status": "unhealthy",
            "service_initialized": False,
            "error": str(e),
            "message": "RAG Chatbot service failed to initialize. Check logs."
        }


@router.get("/status", response_model=KnowledgeBaseStats)
async def get_knowledge_base_status():
    """
    Get current status of the knowledge base
    """
    try:
        logger.info("Getting knowledge base status...")
        service = get_rag_service()
        stats = service.get_knowledge_base_stats()
        logger.info(f"Knowledge base stats: {stats}")
        return stats
        
    except ValueError as e:
        # API key not set
        logger.error(f"Configuration error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Configuration Error",
                "message": str(e),
                "solution": "Set OPENAI_API_KEY environment variable"
            }
        )
    except ImportError as e:
        # Import error
        logger.error(f"Import error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Import Error",
                "message": str(e),
                "solution": "Check that all required packages are installed and rag_chatbot_service.py exists"
            }
        )
    except Exception as e:
        # Generic error
        logger.error(f"Error getting status: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal Server Error",
                "message": str(e),
                "traceback": traceback.format_exc()
            }
        )


@router.post("/upload-pdfs", response_model=UploadResponse)
async def upload_pdfs(files: List[UploadFile] = File(...)):
    """
    Upload and ingest PDF files into knowledge base
    """
    try:
        logger.info(f"Received {len(files)} files for upload")
        service = get_rag_service()
        
        # Create temp directory
        temp_dir = Path(tempfile.mkdtemp())
        pdf_paths = []
        
        try:
            # Save uploaded files
            for file in files:
                logger.info(f"Processing file: {file.filename}")
                
                if not file.filename.endswith('.pdf'):
                    raise HTTPException(
                        status_code=400,
                        detail=f"File '{file.filename}' is not a PDF"
                    )
                
                # Save to temp directory
                temp_path = temp_dir / file.filename
                with open(temp_path, "wb") as f:
                    shutil.copyfileobj(file.file, f)
                
                pdf_paths.append(str(temp_path))
                logger.info(f"Saved {file.filename} to {temp_path}")
            
            # Ingest PDFs
            logger.info(f"Ingesting {len(pdf_paths)} PDFs...")
            results = service.ingest_multiple_pdfs(pdf_paths)
            
            # Log detailed results
            for result in results:
                if result["status"] == "error":
                    logger.error(f"PDF Upload Error - {result['pdf_name']}: {result['message']}")
                    if "error_details" in result:
                        logger.error(f"Error details:\n{result['error_details']}")
                elif result["status"] == "success":
                    logger.info(f"PDF Upload Success - {result['pdf_name']}: {result.get('chunks_added', 0)} chunks")
                else:
                    logger.info(f"PDF Upload Skipped - {result['pdf_name']}: {result['message']}")
            
            # Count results
            success_count = sum(1 for r in results if r["status"] == "success")
            skipped_count = sum(1 for r in results if r["status"] == "skipped")
            error_count = sum(1 for r in results if r["status"] == "error")
            
            # Create summary
            message_parts = []
            if success_count > 0:
                message_parts.append(f"{success_count} new PDF(s) processed")
            if skipped_count > 0:
                message_parts.append(f"{skipped_count} already in knowledge base")
            if error_count > 0:
                message_parts.append(f"{error_count} failed")
            
            logger.info(f"Upload complete: {', '.join(message_parts)}")
            
            return {
                "status": "success" if error_count == 0 else "partial",
                "message": ", ".join(message_parts),
                "results": results
            }
        
        finally:
            # Clean up temp directory
            import time
            time.sleep(0.5)  # Give Windows time to release file handles
            try:
                shutil.rmtree(temp_dir, ignore_errors=True)
                logger.info("Cleaned up temporary files")
            except Exception as e:
                logger.warning(f"Could not fully clean temp directory: {e}")
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading PDFs: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Upload Failed",
                "message": str(e),
                "traceback": traceback.format_exc()
            }
        )


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat with the AI assistant
    """
    try:
        logger.info(f"Received chat request: {request.message[:50]}...")
        service = get_rag_service()
        
        # Check if knowledge base has data
        if not service.has_knowledge_base():
            logger.warning("Knowledge base is empty")
            return {
                "answer": (
                    "I notice you haven't uploaded any farming knowledge documents yet. "
                    "I can still help with general farming questions, but for specific guidance "
                    "tailored to your region or crops, please upload relevant PDF documents. "
                    f"\n\nRegarding your question about '{request.message}': "
                    "I'd be happy to provide general advice, but results will be better with uploaded documents."
                ),
                "sources": [],
                "has_sources": False
            }
        
        # Get response
        logger.info("Getting response from RAG service...")
        response = service.chat(request.message, request.language)
        logger.info(f"Response generated with {len(response.get('sources', []))} sources")
        
        return response
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing chat: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Chat Failed",
                "message": str(e),
                "traceback": traceback.format_exc()
            }
        )


@router.post("/reset-conversation")
async def reset_conversation():
    """
    Reset conversation history
    """
    try:
        logger.info("Resetting conversation...")
        service = get_rag_service()
        service.reset_conversation()
        logger.info("Conversation reset successful")
        return {"status": "success", "message": "Conversation history reset"}
    except Exception as e:
        logger.error(f"Error resetting conversation: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Reset Failed",
                "message": str(e)
            }
        )


@router.delete("/knowledge-base")
async def delete_knowledge_base():
    """
    Delete entire knowledge base
    ⚠️ Use with caution
    """
    try:
        logger.warning("Deleting knowledge base...")
        service = get_rag_service()
        service.delete_knowledge_base()
        
        # Reset global service
        global _rag_service
        _rag_service = None
        
        logger.info("Knowledge base deleted")
        return {
            "status": "success",
            "message": "Knowledge base deleted successfully"
        }
    except Exception as e:
        logger.error(f"Error deleting knowledge base: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Delete Failed",
                "message": str(e)
            }
        )
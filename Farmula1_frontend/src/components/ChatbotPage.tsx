import { useState, useEffect, useRef, JSX } from 'react';
import { Send, Bot, User, Upload, FileText, CheckCircle, AlertCircle, Database, Sprout, Languages, Sparkles, WifiOff } from 'lucide-react';
import { API_BASE } from "../config";
type Message = {
  type: 'bot' | 'user';
  text: string;
  time: string;
  sources?: { source: string }[];
};

type KBStats = {
  has_data: boolean;
  total_pdfs: number;
  total_chunks: number;
  processed_pdfs: string[];
};

type UploadStatus = { type: 'success' | 'error' | 'loading'; message: string };

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [kbStats, setKbStats] = useState<KBStats | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [theme, setTheme] = useState('light');
  const [farmerName, setFarmerName] = useState('Farmer');
  const [backendConnected, setBackendConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Load farmer profile
    fetch(`${API_BASE}/auth/farmer/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.full_name) {
          setFarmerName(data.full_name);
        }
      })
      .catch(() => {});

    // Load saved theme
    fetch(`${API_BASE}/farmer/theme`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.theme) {
          setTheme(data.theme);
        }
      })
      .catch(() => {});
  }, []);




  // Format bot message to handle markdown-style formatting
  const formatBotMessage = (text: string, messageType: 'bot' | 'user') => {
    if (messageType === 'user') {
      return <span>{text}</span>;
    }

    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      // Handle numbered lists (e.g., "1. **Title**:")
      const numberedListMatch = line.match(/^(\d+)\.\s\*\*(.+?)\*\*:\s*(.*)$/);
      if (numberedListMatch) {
        elements.push(
          <div key={index} className="mb-3">
            <div className="flex gap-2">
              <span className="font-bold text-blue-600">{numberedListMatch[1]}.</span>
              <div>
                <span className="font-bold text-gray-900">{numberedListMatch[2]}:</span>
                <span className="text-gray-700"> {numberedListMatch[3]}</span>
              </div>
            </div>
          </div>
        );
        return;
      }

      // Handle bold text with colons (e.g., "**Summary**:")
      const boldColonMatch = line.match(/^\*\*(.+?)\*\*:\s*(.*)$/);
      if (boldColonMatch) {
        elements.push(
          <div key={index} className="mb-2">
            <span className="font-bold text-gray-900">{boldColonMatch[1]}:</span>
            <span className="text-gray-700"> {boldColonMatch[2]}</span>
          </div>
        );
        return;
      }

      // Handle lines starting with "- " (bullet points)
      if (line.trim().startsWith('- ')) {
        elements.push(
          <div key={index} className="flex gap-2 mb-1 ml-4">
            <span className="text-blue-600">•</span>
            <span className="text-gray-700">{line.trim().substring(2)}</span>
          </div>
        );
        return;
      }

      // Handle empty lines
      if (line.trim() === '') {
        elements.push(<div key={index} className="h-2" />);
        return;
      }

      // Regular text
      elements.push(
        <div key={index} className="mb-1 text-gray-700">
          {line}
        </div>
      );
    });

    return <div className="space-y-1">{elements}</div>;
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch knowledge base status on component mount
  useEffect(() => {
    fetchKBStatus();
    // Try to get farmer name from localStorage
    const storedName = localStorage.getItem('farmer_name');
    if (storedName) {
      setFarmerName(storedName);
    }
  }, []);

  const fetchKBStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/chatbot/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Backend not responding');
      }
      
      const data = await response.json();
      setKbStats(data);
      setBackendConnected(true);
      
      // Add initial message based on KB status
      if (data.has_data) {
        setMessages([{
          type: 'bot',
          text: `Namaste! I am your AI farming assistant with knowledge from ${data.total_pdfs} document(s). How can I help you today?`,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        }]);
      } else {
        setMessages([{
          type: 'bot',
          text: 'Namaste! I am your AI farming assistant. Please upload PDF documents to build my knowledge base, then I can provide expert farming guidance!',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        }]);
      }
    } catch (error) {
      // Silently handle backend connection error
      setBackendConnected(false);
      setKbStats({
        has_data: false,
        total_pdfs: 0,
        total_chunks: 0,
        processed_pdfs: []
      });
      
      // Add offline message
      setMessages([{
        type: 'bot',
        text: '⚠️ Backend server is not connected. Please start your backend server at ${API_BASE} to use the AI assistant features.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (!backendConnected) {
      setUploadStatus({ type: 'error', message: 'Backend server is not connected' });
      setTimeout(() => setUploadStatus(null), 3000);
      event.target.value = '';
      return;
    }

    setUploadStatus({ type: 'loading', message: 'Processing PDFs...' });

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch(`${API_BASE}/api/chatbot/upload-pdfs`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setUploadStatus({ type: 'success', message: data.message });
        
        // Add bot message about upload
        setMessages(prev => [...prev, {
          type: 'bot',
          text: `✅ ${data.message}. I'm now ready to answer questions based on this knowledge!`,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        }]);
        
        // Refresh KB stats
        fetchKBStatus();
        
        // Clear upload status after 3 seconds
        setTimeout(() => setUploadStatus(null), 3000);
      } else {
        setUploadStatus({ type: 'error', message: data.detail || 'Upload failed' });
        setTimeout(() => setUploadStatus(null), 3000);
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Error uploading files. Check if backend is running.' });
      setTimeout(() => setUploadStatus(null), 3000);
      // Silently handle upload error
    }

    // Clear file input
    event.target.value = '';
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    if (!backendConnected) {
      const errorMessage: Message = {
        type: 'bot',
        text: '❌ Cannot send message. Backend server is not connected. Please start your server at ${API_BASE}',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }
    
    const userMessage: Message = {
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chatbot/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          language: language,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        const botMessage: Message = {
          type: 'bot',
          text: data.answer,
          sources: data.sources || [],
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.detail || 'Failed to get response');
      }
    } catch (error) {
      // Silently handle chat error
      setBackendConnected(false);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: '❌ Sorry, I encountered an error. The backend server may be offline. Please check if your server is running at ${API_BASE}',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    'What is the best time to irrigate?',
    'How to prevent pest attacks?',
    'Current weather forecast',
    'Fertilizer recommendations',
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: `url('https://wallpaperbat.com/img/9770247-regenerative-agriculture-illinois.jpg')`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50" style={{ backdropFilter: 'blur(2px)' }} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 px-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Farmer</h1>
              <div className="flex items-center gap-2">
                <p className="text-green-100 text-sm">Welcome back, {farmerName}</p>
                {!backendConnected && (
                  <div className="flex items-center gap-1 text-xs bg-red-500/30 px-2 py-1 rounded-full border border-red-300">
                    <WifiOff className="w-3 h-3" />
                    <span>Backend Offline</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 rounded-full bg-green-700/50 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 text-sm transition-transform hover:scale-105 cursor-pointer"
                style={{ color: 'white' }}
              >
                <option value="en" style={{ color: 'black' }}>English</option>
                <option value="hi" style={{ color: 'black' }}>हिंदी (Hindi)</option>
                <option value="pa" style={{ color: 'black' }}>ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="mr" style={{ color: 'black' }}>मराठी (Marathi)</option>
                <option value="ta" style={{ color: 'black' }}>தமிழ் (Tamil)</option>
                <option value="te" style={{ color: 'black' }}>తెలుగు (Telugu)</option>
              </select>

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={!backendConnected}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-transform hover:scale-105 text-sm border border-white/30 ${
                  backendConnected 
                    ? 'bg-green-700/50 hover:bg-green-700/70 text-white' 
                    : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Upload PDFs</span>
                <span className="sm:hidden">Upload</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                className="text-white hover:bg-green-700/50 rounded-full text-sm px-4 py-2 transition-transform hover:scale-105 border border-transparent hover:border-white/30"
                onClick={() => {
                  localStorage.removeItem("access_token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
              <button
                className="text-white hover:bg-green-700/50 rounded-full text-sm px-3 py-2 transition-transform hover:scale-105 border border-transparent hover:border-white/30"
                onClick={async () => {
                  const newTheme = theme === "dark" ? "light" : "dark";
                  setTheme(newTheme);
                  if (backendConnected) {
                    try {
                      await fetch(`${API_BASE}/farmer/theme`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                        body: JSON.stringify({ theme: newTheme }),
                      });
                    } catch (error) {
                      // Silently handle theme update error
                    }
                  }
                }}
              >
                {theme === "dark" ? "Dark" : "Light"}
              </button>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Upload Status */}
          {uploadStatus && (
            <div className="max-w-7xl mx-auto mt-4">
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                uploadStatus.type === 'success' ? 'bg-green-500/20 border border-green-300' :
                uploadStatus.type === 'error' ? 'bg-red-500/20 border border-red-300' :
                'bg-blue-500/20 border border-blue-300'
              }`}>
                {uploadStatus.type === 'success' && <CheckCircle className="w-5 h-5 text-green-200" />}
                {uploadStatus.type === 'error' && <AlertCircle className="w-5 h-5 text-red-200" />}
                {uploadStatus.type === 'loading' && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                <span className="text-white text-sm">{uploadStatus.message}</span>
              </div>
            </div>
          )}

          {/* Backend Connection Warning */}
          {!backendConnected && (
            <div className="max-w-7xl mx-auto mt-4">
              <div className="p-3 rounded-lg flex items-center gap-2 bg-orange-500/20 border border-orange-300">
                <AlertCircle className="w-5 h-5 text-orange-200" />
                <div className="flex-1">
                  <span className="text-white text-sm font-semibold">Backend Server Not Connected</span>
                  <p className="text-orange-100 text-xs mt-1">Please start your backend server at <code className="bg-black/20 px-1 rounded">${API_BASE}</code></p>
                </div>
                <button
                  onClick={fetchKBStatus}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs text-white transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-2">
              <div className="border-none shadow-2xl overflow-hidden rounded-xl bg-white/95" style={{ height: 'calc(100vh - 240px)', backdropFilter: 'blur(10px)' }}>
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'bot' 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                            : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                        }`}>
                          {message.type === 'bot' ? (
                            <Bot className="w-5 h-5 text-white" />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        
                        <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                          <div className={`rounded-2xl p-4 ${
                            message.type === 'bot'
                              ? 'bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200'
                              : 'bg-gradient-to-br from-green-600 to-green-700 text-white'
                          }`}>
                            <div className="text-sm">
                              {formatBotMessage(message.text, message.type)}
                            </div>
                            
                            <p className={`text-xs mt-2 ${
                              message.type === 'bot' ? 'text-gray-500' : 'text-green-100'
                            }`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t bg-gray-50/90">
                    <div className="flex gap-2">
                      <input
                        placeholder={backendConnected ? "Type your question here..." : "Backend server is offline..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading || !backendConnected}
                        className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                      <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim() || !backendConnected}
                        className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 rounded-full p-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                      >
                        <Send className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Knowledge Base Status */}
              <div className="p-6 rounded-xl shadow-2xl bg-white/95 border border-green-200" style={{ backdropFilter: 'blur(10px)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-green-600" />
                  <h3 className="text-green-900 font-bold text-lg">Knowledge Base</h3>
                </div>
                {kbStats && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Documents:</span>
                      <span className="font-semibold text-green-900">{kbStats.total_pdfs}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Knowledge Chunks:</span>
                      <span className="font-semibold text-green-900">{kbStats.total_chunks}</span>
                    </div>
                    {kbStats.processed_pdfs && kbStats.processed_pdfs.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-xs text-green-700 mb-2 font-semibold">Loaded PDFs:</p>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {kbStats.processed_pdfs.map((pdf, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-green-600">
                              <FileText className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span className="truncate">{pdf}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Suggested Questions */}
              <div className="p-6 rounded-xl shadow-2xl bg-white/95" style={{ backdropFilter: 'blur(10px)' }}>
                <h3 className="text-green-900 mb-4 font-bold text-lg">Quick Questions</h3>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      disabled={!backendConnected}
                      className={`w-full text-left p-3 rounded-lg border border-green-200 transition-all text-sm ${
                        backendConnected
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-800 hover:shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="p-6 rounded-xl shadow-2xl bg-gradient-to-br from-green-600 to-emerald-700 text-white">
                <h3 className="text-white mb-4 font-bold text-lg">Assistant Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Languages className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-green-50">Multi-language support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-green-50">PDF knowledge base</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-green-50">AI-powered insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
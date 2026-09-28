import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, Send, X, Bot, User, AlertCircle, RefreshCw } from 'lucide-react';
import { sendAiMessage } from '../services/api';

export default function AIChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I am your official COLORIDO 2K26 Assistant for R.V.R. & J.C. College of Engineering. I can provide real-time details on events, schedules, venues, the Food Stall Area, and official Google Form registrations. How can I assist you today?",
      inScope: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Where is the dance event?",
    "Where is the Food Stall Area?",
    "How do I register?",
    "What events are on Day 1?",
    "Tell me about COLORIDO"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query || !query.trim() || loading) return;

    const userMsg = {
      role: 'user',
      content: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await sendAiMessage(query.trim());
      const botMsg = {
        role: 'assistant',
        content: data.response || "I didn't receive a response from the COLORIDO server. Please try again.",
        inScope: data.inScope !== false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I encountered a connection issue reaching the COLORIDO backend. Please ensure the backend is running.",
          inScope: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-2 px-4 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-full shadow-2xl shadow-purple-600/50 hover:shadow-pink-600/60 hover:scale-105 active:scale-95 transition-all duration-300 text-white font-bold"
            aria-label="Open COLORIDO AI Assistant"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>
            <span className="text-sm tracking-wide hidden sm:inline">Ask COLORIDO AI</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm uppercase font-mono text-[10px] hidden sm:inline">
              RVRJC
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] max-h-[620px] h-[85vh] bg-[#0c0f1d] border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-950/80 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-purple-900/60 via-[#12162a] to-pink-950/60 border-b border-purple-800/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0d1020] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-pink-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-bold text-white tracking-wide">COLORIDO AI</h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium">Live DB</span>
                </div>
                <p className="text-[10px] text-purple-200/70">Official RVRJC Fest Intelligence</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-[#090c17] border-b border-white/5 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="shrink-0 px-2.5 py-1 text-[11px] font-medium bg-purple-950/50 hover:bg-purple-800/40 text-purple-200 border border-purple-600/30 rounded-full transition-colors whitespace-nowrap active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-[#0c0f1d] to-[#070913]">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end space-x-2 max-w-[88%]">
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-purple-900/60 border border-purple-500/30 flex items-center justify-center shrink-0 mb-1">
                        <Bot className="w-4 h-4 text-pink-400" />
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        isUser
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm shadow-md shadow-purple-600/20'
                          : msg.inScope === false
                          ? 'bg-amber-950/40 text-amber-200 border border-amber-600/40 rounded-bl-sm'
                          : 'bg-[#15192c] text-gray-200 border border-purple-900/40 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      {msg.inScope === false && (
                        <div className="flex items-center space-x-1 text-amber-400 text-[11px] font-bold mb-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Scope Limitation Notice</span>
                        </div>
                      )}
                      {msg.content}
                    </div>

                    {isUser && (
                      <div className="w-7 h-7 rounded-lg bg-pink-900/60 border border-pink-500/30 flex items-center justify-center shrink-0 mb-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 px-9">{msg.time}</span>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-purple-900/60 border border-purple-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-pink-400 animate-pulse" />
                </div>
                <div className="bg-[#15192c] border border-purple-900/40 p-3 rounded-2xl rounded-bl-sm flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs text-gray-400 ml-1.5 font-medium">Checking live RVRJC database...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-[#0a0d18] border-t border-purple-900/30">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about events, venues, schedule, food stalls..."
                className="flex-1 bg-[#12162a] text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-purple-800/40 focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-500"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 text-white rounded-xl transition-all shadow-md shadow-pink-600/30 shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-500 text-center mt-2">
              Only answers official RVRJC & COLORIDO 2K26 questions. Out-of-scope inquiries are restricted.
            </p>
          </div>

        </div>
      )}
    </>
  );
}

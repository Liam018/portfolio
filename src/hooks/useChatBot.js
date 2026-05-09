import { useState, useEffect, useCallback, useRef } from 'react';
import { INITIAL_MESSAGE, findBestResponse } from '../constants/chatbotData';

export const useChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : [INITIAL_MESSAGE];
  });
  const [input, setInput] = useState('');
  const timeoutRef = useRef(null);
  const pendingResponsesRef = useRef(0);

  // Persistence
  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Handle unread count
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem('chat_history');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    pendingResponsesRef.current = 0;
    setIsTyping(false);
  }, []);

  const handleSend = useCallback((e, customValue) => {
    if (e) e.preventDefault();
    const messageText = customValue || input;
    if (!messageText.trim()) return;

    const userMessage = messageText.trim();
    const userId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    setMessages(prev => [...prev, { id: userId, role: 'user', text: messageText }]);
    setInput('');
    
    // Support multiple concurrent responses
    pendingResponsesRef.current++;
    setIsTyping(true);

    const botResponse = findBestResponse(userMessage);

    // Dynamic typing delay based on response length
    const typingDuration = Math.min(800 + botResponse.text.length * 15, 2500);

    setTimeout(() => {
      pendingResponsesRef.current--;
      
      // Only hide typing indicator if no more responses are pending
      if (pendingResponsesRef.current === 0) {
        setIsTyping(false);
      }

      setMessages(prev => [...prev, { 
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        role: 'bot', 
        text: botResponse.text, 
        image: botResponse.image,
        replyTo: { id: userId, text: userMessage }
      }]);
      if (!isOpen) setUnreadCount(prev => prev + 1);
    }, typingDuration);
  }, [input, isOpen]);

  return {
    isOpen,
    setIsOpen,
    isExpanded,
    setIsExpanded,
    isTyping,
    messages,
    input,
    setInput,
    unreadCount,
    handleSend,
    clearChat
  };
};

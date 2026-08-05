import { useState, useEffect, useCallback, useRef } from 'react';
import { INITIAL_MESSAGE, findBestResponse } from '../constants/chatbotData';

const loadHistory = () => {
  try {
    const saved = localStorage.getItem('chat_history');
    if (!saved) return [INITIAL_MESSAGE];
    const parsed = JSON.parse(saved);
    // Validate: must be a non-empty array of message objects
    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.role) {
      return parsed;
    }
    return [INITIAL_MESSAGE];
  } catch {
    // Corrupted data — clear and start fresh
    localStorage.removeItem('chat_history');
    return [INITIAL_MESSAGE];
  }
};

export const useChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState(loadHistory);
  const [input, setInput] = useState('');

  // Track ALL pending timeout IDs so we can cancel all of them on clear/unmount
  const pendingTimeoutsRef = useRef(new Set());
  const pendingResponsesRef = useRef(0);

  // Persistence
  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  // Cleanup ALL pending timeouts on unmount
  useEffect(() => {
    return () => {
      pendingTimeoutsRef.current.forEach(id => clearTimeout(id));
      pendingTimeoutsRef.current.clear();
    };
  }, []);

  // Reset unread count when chat opens
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const clearChat = useCallback(() => {
    // Cancel every pending timeout
    pendingTimeoutsRef.current.forEach(id => clearTimeout(id));
    pendingTimeoutsRef.current.clear();
    pendingResponsesRef.current = 0;
    setIsTyping(false);
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem('chat_history');
  }, []);

  const handleSend = useCallback((e, customValue) => {
    if (e) e.preventDefault();
    const messageText = customValue || input;
    if (!messageText.trim()) return;

    const userMessage = messageText.trim();
    const userId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    setMessages(prev => [...prev, {
      id: userId,
      role: 'user',
      text: userMessage,
      timestamp: new Date().toISOString(),
    }]);
    setInput('');

    pendingResponsesRef.current++;
    setIsTyping(true);

    const botResponse = findBestResponse(userMessage);

    // Dynamic typing delay based on response length (snappier feel)
    const typingDuration = Math.min(400 + botResponse.text.length * 8, 1200);

    const timeoutId = setTimeout(() => {
      // Remove this timeout from the tracking set
      pendingTimeoutsRef.current.delete(timeoutId);
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
        timestamp: new Date().toISOString(),
        replyTo: { id: userId, text: userMessage }
      }]);

      setUnreadCount(prev => isOpen ? prev : prev + 1);
    }, typingDuration);

    // Track this timeout so it can be cancelled if clearChat is called mid-flight
    pendingTimeoutsRef.current.add(timeoutId);
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

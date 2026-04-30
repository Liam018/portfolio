import { useState, useEffect, useCallback } from 'react';
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

  // Persistence
  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  // Handle unread count
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem('chat_history');
  }, []);

  const handleSend = useCallback((e, customValue) => {
    if (e) e.preventDefault();
    const messageText = customValue || input;
    if (!messageText.trim()) return;

    const userMessage = messageText.trim();

    // Add user message to state
    // We check for "dito oh" specifically for the user image if needed, 
    // but the original logic had it in handleSend. 
    // Let's refine: the bot logic should decide what the bot responds with.
    // The original code also added an image to the USER message if they said "dito oh".

    let userImage = null;
    if (userMessage.toLowerCase().includes("dito oh")) {
      // In the original, it used 'pitchel' directly. 
      // We can't easily import pitchel here without duplicating, 
      // or we can pass it as a param if we really want to keep it in the hook.
      // However, it's better to keep assets in the data layer.
    }

    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput('');
    setIsTyping(true);

    const botResponse = findBestResponse(userMessage);

    // Dynamic typing delay based on response length
    const typingDuration = Math.min(800 + botResponse.text.length * 15, 2500);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse.text, image: botResponse.image }]);
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

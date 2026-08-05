import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatBot } from '../hooks/useChatBot';
import { ChatHeader } from './chatbot/ChatHeader';
import { MessageItem } from './chatbot/MessageItem';
import { TypingIndicator } from './chatbot/TypingIndicator';
import { EmptyState } from './chatbot/EmptyState';
import { ChatInput } from './chatbot/ChatInput';
import { ChatFAB } from './chatbot/ChatFAB';

// ─── ChatBot ─────────────────────────────────────────────────────────────────
const ChatBot = () => {
  const {
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
  } = useChatBot();

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const copiedTimerRef = useRef(null);

  const showCopiedToast = useCallback(() => {
    setCopiedToast(true);
    clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = setTimeout(() => setCopiedToast(false), 2000);
  }, []);

  // ─── Responsive dimensions
  const [chatDimensions, setChatDimensions] = useState(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
      width: w < 640 ? '100vw' : (isExpanded ? (w < 1024 ? 'calc(100vw - 48px)' : '600px') : '410px'),
      height: w < 640 ? '100dvh' : (isExpanded ? (h < 800 ? 'calc(100vh - 120px)' : '700px') : (h < 600 ? 'calc(100vh - 120px)' : '580px')),
    };
  });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setChatDimensions({
        width: w < 640 ? '100vw' : (isExpanded ? (w < 1024 ? 'calc(100vw - 48px)' : '600px') : '410px'),
        height: w < 640 ? '100dvh' : (isExpanded ? (h < 800 ? 'calc(100vh - 120px)' : '700px') : (h < 600 ? 'calc(100vh - 120px)' : '580px')),
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isExpanded]);

  // ─── Auto-focus input on open (desktop only)
  useEffect(() => {
    if (isOpen && inputRef.current && window.innerWidth >= 1024) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ─── Scroll lock (prevent background scrolling when chat is open)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // ─── Auto-scroll to bottom
  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    if (isOpen) {
      const t = setTimeout(scroll, 320);
      return () => clearTimeout(t);
    }
    scroll();
  }, [messages, isTyping, isExpanded, isOpen]);

  // ─── Auto-resize textarea
  const handleTextareaInput = (e) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const scrollToMessage = (id) => {
    const el = document.getElementById(`msg-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-primary/50', 'ring-offset-2', 'dark:ring-offset-black');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-primary/50', 'ring-offset-2', 'dark:ring-offset-black');
      }, 2000);
    }
  };

  return (
    <div className={`fixed z-60 flex flex-col items-end ${isOpen ? 'inset-0 sm:inset-auto sm:bottom-6 sm:right-6' : 'bottom-6 right-6'}`}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs sm:hidden z-0"
            />

            <div className="relative w-full h-full sm:w-auto sm:h-auto sm:mb-6 z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 26
                }}
                style={{
                  width: chatDimensions.width,
                  height: chatDimensions.height,
                  transformOrigin: 'bottom right',
                  willChange: 'transform, opacity'
                }}
                className="glass backdrop-blur-xl bg-card/95 dark:bg-[#0c0c0e]/95 rounded-none sm:rounded-[32px] overflow-hidden flex flex-col shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-0 sm:border border-border/50 dark:border-white/15 relative z-10 w-full h-full"
              >
                {/* Ambient Glow Orbs */}
                <div className="absolute -top-20 -left-20 w-44 h-44 bg-primary/10 rounded-full blur-3xl pointer-events-none z-0" />
                <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-secondary/10 rounded-full blur-3xl pointer-events-none z-0" />

                {/* Header */}
                <ChatHeader
                  isTyping={isTyping}
                  clearChat={clearChat}
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  setIsOpen={setIsOpen}
                />

                {/* Messages Area */}
                <div
                  ref={scrollRef}
                  role="log"
                  aria-live="polite"
                  aria-label="Chat messages"
                  className="flex-1 p-4 sm:p-5 overflow-y-auto overscroll-contain space-y-4 scroll-smooth bg-transparent relative z-10"
                >
                <AnimatePresence initial={false}>
                  {messages.length === 0 && <EmptyState key="empty" />}

                  {messages.map((m, idx) => (
                    <MessageItem
                      key={m.id || idx}
                      message={m}
                      setIsOpen={setIsOpen}
                      scrollToMessage={scrollToMessage}
                      showCopiedToast={showCopiedToast}
                    />
                  ))}

                  {isTyping && <TypingIndicator />}
                </AnimatePresence>
              </div>

              {/* Suggestions & Input */}
              <ChatInput
                input={input}
                setInput={setInput}
                isTyping={isTyping}
                copiedToast={copiedToast}
                inputRef={inputRef}
                handleSend={handleSend}
                handleTextareaInput={handleTextareaInput}
              />
            </motion.div>
          </div>
        </>
      )}
      </AnimatePresence>

      {/* FAB toggle button - hidden on mobile when open */}
      <div className={isOpen ? 'hidden sm:block' : 'block'}>
        <ChatFAB
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          unreadCount={unreadCount}
        />
      </div>
    </div>
  );
};

export default ChatBot;

import { motion } from 'framer-motion';
import { FormattedMessage } from './FormattedMessage';
import { CopyButton } from './CopyButton';
import { formatTime } from './chatbotUtils';

// ─── MessageItem ──────────────────────────────────────────────────────────────
export const MessageItem = ({ message, setIsOpen, scrollToMessage, showCopiedToast }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      id={`msg-${message.id}`}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 280,
          damping: 22
        }
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} scroll-mt-20`}
    >
      <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[80%]">
        <div className={`relative p-3.5 sm:p-4 rounded-2xl text-sm leading-relaxed space-y-2 shadow-sm transition-all duration-300 group ${
          isUser
            ? 'bg-linear-to-r from-primary to-secondary text-white rounded-tr-xs shadow-primary/25 font-medium'
            : 'bg-card/85 dark:bg-white/[0.07] glass backdrop-blur-md text-text rounded-tl-xs border border-border/50 dark:border-white/10 shadow-black/5'
        }`}>
          {/* Reply-to quote */}
          {message.replyTo && (
            <button
              onClick={() => scrollToMessage(message.replyTo.id)}
              className="mb-2 p-2 bg-black/10 dark:bg-white/10 rounded-lg border-l-2 border-primary text-left block w-full hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
            >
              <span className="text-[10px] font-bold text-primary block uppercase tracking-wider font-display">You</span>
              <span className="text-xs opacity-75 line-clamp-1 italic">"{message.replyTo.text}"</span>
            </button>
          )}

          {message.text && <FormattedMessage text={message.text} setIsOpen={setIsOpen} />}

          {message.image && (
            <motion.img
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              src={message.image}
              alt="Bot response attachment"
              className="w-full h-auto rounded-xl shadow-md border border-text/10 dark:border-white/10"
            />
          )}

          {/* Copy button — only on bot messages */}
          {!isUser && message.text && <CopyButton text={message.text} onCopy={showCopiedToast} />}
        </div>

        {/* Timestamp */}
        {message.timestamp && (
          <span className={`text-[10px] font-medium text-text-muted/60 px-1 font-display ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
          </span>
        )}
      </div>
    </motion.div>
  );
};

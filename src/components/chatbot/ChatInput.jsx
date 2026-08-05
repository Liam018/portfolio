import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { SuggestionBar } from './SuggestionBar';
import { SUGGESTIONS } from '../../constants/chatbotData';

// ─── ChatInput ────────────────────────────────────────────────────────────────
export const ChatInput = ({
  input,
  setInput,
  isTyping,
  copiedToast,
  inputRef,
  handleSend,
  handleTextareaInput
}) => (
  <div className="p-3.5 sm:p-4 bg-card/60 dark:bg-white/3 border-t border-border/40 dark:border-white/10 space-y-3 backdrop-blur-md">
    {/* Copied toast */}
    <AnimatePresence>
      {copiedToast && (
        <motion.div
          key="copied-banner"
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          className="flex items-center justify-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-[11px] font-semibold font-display shadow-xs"
        >
          <Check size={13} />
          Copied to clipboard!
        </motion.div>
      )}
    </AnimatePresence>

    {/* Suggestion chip bar */}
    <SuggestionBar suggestions={SUGGESTIONS} onSelect={(q) => handleSend(null, q)} disabled={isTyping} />

    {/* Input + Send button */}
    <form onSubmit={handleSend} className="flex items-end gap-2 group">
      <textarea
        ref={inputRef}
        rows="1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onInput={handleTextareaInput}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
          }
        }}
        aria-label="Message Liam Assistant"
        placeholder="Ask me something..."
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        className="flex-1 bg-card/90 dark:bg-white/6 border border-border/60 dark:border-white/15 rounded-2xl px-4 py-3 outline-none text-sm text-text focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-text-muted/60 resize-none min-h-12 max-h-32 overflow-y-auto leading-snug [&::-webkit-scrollbar]:hidden shadow-xs font-sans"
      />
      <motion.button
        type="submit"
        disabled={!input.trim() || isTyping}
        whileHover={!isTyping && input.trim() ? { scale: 1.06, y: -1 } : {}}
        whileTap={!isTyping && input.trim() ? { scale: 0.94 } : {}}
        aria-label="Send message"
        className="shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-linear-to-r from-primary to-secondary text-white shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary/50 self-end"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isTyping ? (
            <motion.div
              key="loading"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"
            />
          ) : (
            <motion.div
              key="send"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
            >
              <Send size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  </div>
);

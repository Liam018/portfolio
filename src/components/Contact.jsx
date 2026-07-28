import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle, ArrowUpRight, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

const smoothTransition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.6,
};

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);
  const opacity = useSpring(rawOpacity, smoothConfig);
  const scale = useSpring(rawScale, smoothConfig);

  const handleCopyEmail = () => {
    const email = 'liamkurt014@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Safe fallback
    }
  };

  const contactLinks = [
    { 
      label: "Direct Email", 
      value: "liamkurt014@gmail.com", 
      href: "mailto:liamkurt014@gmail.com",
      icon: Mail,
      isEmail: true
    },
    { 
      label: "LinkedIn Profile", 
      value: "Liam Kurt Edaño", 
      href: "https://www.linkedin.com/in/liam-kurt-kasten-edano-bb47623a9",
      icon: Linkedin
    },
    { 
      label: "GitHub Repository", 
      value: "@Liam018", 
      href: "https://github.com/Liam018",
      icon: Github
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    const SERVICE_ID = "service_t2o6o7k";
    const TEMPLATE_ID = "template_cfyrrp9";
    const PUBLIC_KEY = "Zu3cahiYg8AldOjgs";

    const formData = new FormData(form.current);
    const templateParams = {
      name: formData.get('name'),
      email: formData.get('email'),
      title: formData.get('title'),
      message: formData.get('message'),
      time: new Date().toLocaleString('en-US', { 
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      })
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setIsSending(false);
        setIsSent(true);
        form.current?.reset();
      }, (err) => {
        setIsSending(false);
        setError("Failed to send message. Please try again or email directly.");
        console.error('EmailJS Error:', err);
      });
  };

  return (
    <section id="contact" ref={containerRef} className="py-12 sm:py-20 lg:py-24 relative overflow-hidden bg-background text-text border-t border-border/40 select-none">
      <motion.div 
        style={{ opacity, scale, transformOrigin: 'center center', willChange: 'transform, opacity' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="space-y-2.5 mb-8 sm:mb-14 text-left max-w-2xl">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
              // Get In Touch
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
            Let's start a conversation.
          </h2>
          <p className="text-xs sm:text-base text-text-muted leading-relaxed font-normal">
            Whether you have a project idea, a question, or an opportunity, feel free to reach out. I'm always open to discussing new work and creative collaborations.
          </p>
        </div>

        {/* Main Grid: Details & Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Contact Information (Cols 1-5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={smoothTransition}
            viewport={{ once: true, margin: "-10%" }}
            className="md:col-span-5 space-y-5"
          >
            <div className="space-y-1">
              <h3 className="font-display text-lg sm:text-xl font-bold text-text">
                Direct Channels
              </h3>
              <p className="text-xs text-text-muted">
                Connect directly via email or social networks.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {contactLinks.map((item) => {
                const IconComp = item.icon;
                if (item.isEmail) {
                  return (
                    <div 
                      key={item.label}
                      className="p-3.5 sm:p-4 rounded-xl bg-card/60 border border-border/70 space-y-1.5 group transition-colors hover:border-primary/50"
                    >
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-primary font-semibold">
                          <IconComp size={14} /> {item.label}
                        </span>
                        {copiedEmail && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500 font-bold">
                            <Check size={12} /> Copied!
                          </span>
                        )}
                      </div>
                      <a
                        href={item.href}
                        onClick={handleCopyEmail}
                        className="group/link flex items-center justify-between text-xs xs:text-sm sm:text-base font-mono font-bold text-text hover:text-primary transition-colors break-all cursor-pointer min-h-11"
                      >
                        <span className="relative">
                          {item.value}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
                        </span>
                        <ArrowUpRight size={16} className="text-text-muted group-hover/link:text-primary transition-colors shrink-0 ml-2" />
                      </a>
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 sm:p-4 rounded-xl bg-card/60 border border-border/70 flex items-center justify-between group transition-colors hover:border-primary/50 min-h-11 active:opacity-80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <IconComp size={16} />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-text-muted uppercase tracking-wider">{item.label}</span>
                        <span className="text-xs sm:text-sm font-bold text-text group-hover:text-primary transition-colors">{item.value}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Contact Form (Cols 6-12) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            viewport={{ once: true, margin: "-10%" }}
            className="md:col-span-7 bg-card/40 border border-border/60 p-4 sm:p-8 rounded-2xl"
          >
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form 
                  ref={form}
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider">Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        className="w-full bg-background/80 border border-border/70 rounded-md px-3.5 py-3 text-sm text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted/50 min-h-11"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full bg-background/80 border border-border/70 rounded-md px-3.5 py-3 text-sm text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted/50 min-h-11"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider">Subject</label>
                    <input 
                      type="text" 
                      name="title"
                      required
                      className="w-full bg-background/80 border border-border/70 rounded-md px-3.5 py-3 text-sm text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted/50 min-h-11"
                      placeholder="Project Discussion"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider">Message</label>
                    <textarea 
                      name="message"
                      required
                      rows="4"
                      className="w-full bg-background/80 border border-border/70 rounded-md px-3.5 py-3 text-sm text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted/50 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-2 text-xs font-medium text-red-500 bg-red-500/10 p-3 rounded-md border border-red-500/20"
                    >
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-sm py-3.5 px-6 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-11 active:scale-[0.99] touch-manipulation"
                  >
                    {isSending ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-display font-extrabold text-text">Message Sent!</h3>
                    <p className="text-xs text-text-muted max-w-sm mx-auto">
                      Thank you for reaching out. I'll review your message and reply as soon as possible.
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="mt-4 text-xs font-mono font-bold text-primary hover:underline cursor-pointer py-2 px-4 min-h-11"
                  >
                    Send another message →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};

export default Contact;

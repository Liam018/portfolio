import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const contactInfo = [
    { 
      icon: <Mail className="w-5 h-5" />, 
      label: "Email", 
      value: "liamkurt014@gmail.com", 
      href: "mailto:liamkurt014@gmail.com",
      color: "text-primary"
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      label: "LinkedIn", 
      value: "liam-kurt-edano-bb47623a9", 
      href: "https://www.linkedin.com/in/liam-kurt-edano-bb47623a9",
      color: "text-secondary"
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      label: "GitHub", 
      value: "Liam018", 
      href: "https://github.com/Liam018",
      color: "text-accent"
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    // IMPORTANT: Replace these with your actual IDs from EmailJS dashboard
    const SERVICE_ID = "service_t2o6o7k";
    const TEMPLATE_ID = "template_cfyrrp9";
    const PUBLIC_KEY = "Zu3cahiYg8AldOjgs";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          setIsSending(false);
          setIsSent(true);
          setTimeout(() => setIsSent(false), 5000);
          e.target.reset();
      }, (error) => {
          setIsSending(false);
          setError("Failed to send message. Please try again later.");
          console.error('EmailJS Error:', error.text);
      });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-secondary/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Get In Touch</h2>
          <p className="text-text-muted max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          
          {/* Left Column: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
            {contactInfo.map((info, idx) => (
              <motion.a
                key={info.label}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="flex items-center gap-5 glass p-6 rounded-2xl hover:bg-white/[0.05] transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform shadow-lg shadow-black/20`}>
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-0.5">{info.label}</h4>
                  <p className="text-sm font-medium text-text break-all">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 md:p-8 rounded-[32px] relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form 
                  ref={form}
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-text-muted ml-1">Your Name</label>
                      <input 
                        type="text" 
                        name="user_name"
                        required
                        className="w-full bg-white/[0.03] dark:bg-white/[0.03] border border-border rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary/50 transition-colors text-text"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-text-muted ml-1">Email Address</label>
                      <input 
                        type="email" 
                        name="user_email"
                        required
                        className="w-full bg-white/[0.03] dark:bg-white/[0.03] border border-border rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary/50 transition-colors text-text"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-muted ml-1">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      required
                      className="w-full bg-white/[0.03] dark:bg-white/[0.03] border border-border rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary/50 transition-colors text-text"
                      placeholder="Project Discussion"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-muted ml-1">Message</label>
                    <textarea 
                      name="message"
                      required
                      rows="3"
                      className="w-full bg-white/[0.03] dark:bg-white/[0.03] border border-border rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary/50 transition-colors text-text resize-none"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl border border-red-400/20"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSending ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold">Message Sent!</h3>
                  <p className="text-text-muted">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  <button 
                    onClick={() => setIsSent(false)}
                    className="mt-8 text-primary font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { BezelCard } from '../ResumeUI';
import { staggerContainer, fadeUp } from '../resumeMotion';

const contactItems = [
  {
    href: 'mailto:liamkurt014@gmail.com',
    icon: Mail,
    label: 'liamkurt014@gmail.com',
    copyKey: 'email',
    copyVal: 'liamkurt014@gmail.com',
    ariaLabel: 'Copy email address',  
  },
  {
    href: 'tel:+639941083840',
    icon: Phone,
    label: '+63 994 108 3840',
    copyKey: 'phone',
    copyVal: '+639941083840',
    ariaLabel: 'Copy phone number',
  },
  {
    href: null,
    icon: MapPin,
    label: 'San Fernando, La Union',
    ariaLabel: 'Location: San Fernando, La Union',
  },
  {
    href: 'https://github.com/Liam018',
    icon: Github,
    label: 'GitHub',
    external: true,
    ariaLabel: 'Visit GitHub profile',
  },
  {
    href: 'https://www.linkedin.com/in/liam-kurt-kasten-edano-bb47623a9',
    icon: Linkedin,
    label: 'LinkedIn',
    external: true,
    ariaLabel: 'Visit LinkedIn profile', 
  },
];

const ResumeHero = () => {
  const [copiedContact, setCopiedContact] = useState(null);

  // Extended to 2500ms + green feedback on the chip
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(type);
    setTimeout(() => setCopiedContact(null), 2500);
  };

  return (
    <BezelCard>
      <div className="relative overflow-hidden p-8 sm:p-10 md:p-12">
        {/* Subtle ambient sheen */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/6 via-transparent to-secondary/4 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/6 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative space-y-3.5">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/18 text-primary text-[10px] font-bold uppercase tracking-[0.16em]">
              BSIT Graduate · 2026
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary/8 border border-secondary/15 text-secondary text-[10px] font-bold uppercase tracking-[0.16em]">
              Full-Stack Developer
            </span>
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-[-0.03em] leading-[1.1] text-foreground">
            Liam Kurt Kasten{' '}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              C. Edaño
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="text-sm sm:text-[0.9375rem] text-muted-foreground max-w-xl leading-[1.7] font-light"
            style={{ textWrap: 'pretty' }}
          >
            Full-stack developer focused on React, React Native, Laravel, and PostgreSQL — building
            clean, scalable systems that solve real problems for real people.
          </p>

          {/* Contact chips */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-1.5 pt-1"
            role="list"
            aria-label="Contact information"
          >
            {contactItems.map(({ href, icon: Icon, label, copyKey, copyVal, external, ariaLabel }) => {
              const Tag = href ? 'a' : 'button';
              const isCopied = copiedContact === copyKey;
              return (
                <motion.div key={label} variants={fadeUp} role="listitem">
                  <Tag
                    href={href || undefined}
                    onClick={copyKey ? () => handleCopy(copyVal, copyKey) : undefined}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={ariaLabel}   
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                      text-[11px] font-medium
                      bg-black/4 dark:bg-white/5
                      border transition-all duration-250 cursor-pointer
                      ${isCopied
                        /* #9: green border + text flash when copied */
                        ? 'border-accent/40 text-accent bg-accent/6 dark:bg-accent/8'
                        : 'text-muted-foreground border-black/[0.07] dark:border-white/8 hover:border-primary/30 hover:text-primary'
                      }
                    `}
                  >
                    <Icon size={12} strokeWidth={2} aria-hidden="true" />
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={isCopied ? 'copied' : 'label'}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                      >
                        {isCopied ? '✓ Copied' : label}
                      </motion.span>
                    </AnimatePresence>
                  </Tag>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </BezelCard>
  );
};

export default ResumeHero;

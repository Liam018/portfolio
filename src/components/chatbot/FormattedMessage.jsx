import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// ─── FormattedMessage ─────────────────────────────────────────────────────────
// Renders bold (**text**) and clickable section links (#id with hyphen/underscore support)
export const FormattedMessage = ({ text, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Split on **bold** or a #section-id (letters, numbers, hyphens, underscores)
  const parts = text.split(/(\*\*.*?\*\*|(?:^|(?<=\s))#[a-zA-Z0-9_-]+(?=[.,!?;:\s]|$))/g);

  const handleHashClick = (id) => {
    // If on a different page (e.g. /resume), navigate back to home page with section hash
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      if (window.innerWidth < 768) setIsOpen(false);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth < 768) setIsOpen(false);
    }
  };

  return (
    <div className="space-y-1">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-primary">{part.slice(2, -2)}</strong>;
        }
        // Trim leading whitespace before checking for #
        const trimmed = part.trim();
        if (trimmed.startsWith('#')) {
          const id = trimmed.slice(1).replace(/[.,!?;:]+$/, '');
          return (
            <button
              key={i}
              onClick={() => handleHashClick(id)}
              aria-label={`Jump to ${id} section`}
              className="text-primary hover:underline font-bold inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
            >
              {trimmed}
            </button>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
};

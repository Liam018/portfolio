import { useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

// ─── SVG Icon: Sun ──────────────────────────────────────────────────────────
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[18px] h-[18px] stroke-amber-400"
  >
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2"  x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="2"  y1="12" x2="5"  y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22" />
  </svg>
);

// ─── SVG Icon: Moon ─────────────────────────────────────────────────────────
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[18px] h-[18px] stroke-sky-300"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// ─── Animated Theme Toggler ──────────────────────────────────────────────────
/**
 * @param {object}  props
 * @param {"circle"|"fade"} [props.variant="circle"]  Transition style
 * @param {number}  [props.duration=600]               Transition ms
 * @param {string}  [props.className]                  Extra Tailwind classes
 */
export function AnimatedThemeToggler({
  variant = 'circle',
  duration = 600,
  className = '',
  ...rest
}) {
  const { isDark, toggleTheme } = useTheme();
  const buttonRef = useRef(null);

  const handleToggle = async () => {
    if (
      variant === 'circle' &&
      typeof document.startViewTransition === 'function' &&
      buttonRef.current
    ) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.dataset.magicuiThemeVt = 'active';

      const transition = document.startViewTransition(() => {
        toggleTheme();
      });

      await transition.ready;

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );

      transition.finished.then(() => {
        document.documentElement.removeAttribute('data-magicui-theme-vt');
      });
    } else {
      toggleTheme();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        relative flex items-center justify-center
        w-9 h-9 rounded-xl cursor-pointer
        active:scale-90 transition-transform duration-150
        ${className}
      `}
      {...rest}
    >
      {/* Spinning icon — key forces re-mount animation on every toggle */}
      <span
        key={isDark ? 'moon' : 'sun'}
        className="relative z-10 flex items-center justify-center [animation:theme-icon-in_0.35s_ease-out_both]"
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}


import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

/**
 * Drop-in theme toggle button — place anywhere.
 * State is provided by ThemeContext via useTheme().
 */
const ThemeToggle = ({ className = '' }) => (
  <AnimatedThemeToggler
    variant="circle"
    duration={850}
    className={className}
    aria-label="Toggle theme"
  />
);

export default ThemeToggle;


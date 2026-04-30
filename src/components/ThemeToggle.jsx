import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

const ThemeToggle = () => {
  return (
    <AnimatedThemeToggler 
      variant="circle"
      duration={600}
      className="p-2.5 rounded-xl glass hover:scale-105 active:scale-95 transition-all text-text-muted hover:text-primary hover:bg-primary/10 relative flex items-center justify-center w-10 h-10 overflow-hidden shadow-sm hover:shadow-md"
      aria-label="Toggle Theme"
    />
  );
};

export default ThemeToggle;

import { ThemeContext, useThemeState } from '@/hooks/useTheme';

/**
 * Wraps the app and provides theme context to all children.
 * Place this at the root of your component tree.
 */
export function ThemeProvider({ children }) {
  const themeState = useThemeState();
  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
}

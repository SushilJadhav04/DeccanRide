// src/components/ThemeToggle.jsx
import { useTheme } from '../context/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle theme"
      className="p-2 border border-[#222] dark:border-white/20 hover:border-black dark:hover:border-white transition-all rounded-md text-black dark:text-white flex items-center justify-center bg-transparent active:scale-95"
    >
      {/* Half-moon / Contrast Icon matching your image */}
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1 0-16v16z" />
      </svg>
    </button>
  );
}

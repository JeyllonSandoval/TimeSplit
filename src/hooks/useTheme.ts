import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // lee estado ya puesto por script inline
    setIsDarkTheme(document.documentElement.classList.contains('dark'));

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.classList.toggle('dark', e.matches);
        setIsDarkTheme(e.matches);
      }
    };
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return { isDarkTheme, toggleTheme };
};
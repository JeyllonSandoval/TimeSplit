import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

type Theme = 'light' | 'dark';

function getSystemTheme(): Theme {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme(): Theme {
	const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') as Theme | null : null;
	if (stored === 'light' || stored === 'dark') return stored;
	return getSystemTheme();
}

function applyTheme(theme: Theme) {
	const root = document.documentElement;
	if (theme === 'dark') {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}
	window.localStorage.setItem('theme', theme);
}

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		const initial = getInitialTheme();
		setTheme(initial);
		applyTheme(initial);
	}, []);

	function toggle() {
		const next: Theme = theme === 'light' ? 'dark' : 'light';
		setTheme(next);
		applyTheme(next);
	}

	return (
		<button
			onClick={toggle}
			className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
			aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
			type="button"
		>
			{theme === 'light' ? <FiMoon className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
		</button>
	);
}



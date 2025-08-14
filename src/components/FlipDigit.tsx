import { useEffect, useMemo, useState } from 'react';

type FlipDigitProps = {
	value: string; // single character '0'-'9'
	previousValue?: string;
	className?: string;
};

export default function FlipDigit({ value, previousValue, className }: FlipDigitProps) {
	const [isFlipping, setIsFlipping] = useState(false);
	const [prev, setPrev] = useState(previousValue ?? value);

	useEffect(() => {
		if (value !== prev) {
			setIsFlipping(true);
			const timeout = setTimeout(() => {
				setIsFlipping(false);
				setPrev(value);
			}, 600);
			return () => clearTimeout(timeout);
		}
	}, [value, prev]);

	const containerClass = useMemo(
		() => `flip-container ${isFlipping ? 'is-flipping' : ''} ${className ?? ''}`.trim(),
		[isFlipping, className]
	);

	return (
		<div className={containerClass} aria-hidden="true">
			{/* Vista estática de un solo número para evitar duplicados */}
			<div className="static-card text-slate-900 dark:text-slate-100">
				<span className="font-mono tabular-nums font-extrabold">{value}</span>
			</div>
			{isFlipping && (
				<>
					<div className="flip-front text-slate-900 dark:text-slate-100">
						<span className="font-mono tabular-nums font-extrabold">{prev}</span>
					</div>
					<div className="flip-back text-slate-900 dark:text-slate-100">
						<span className="font-mono tabular-nums font-extrabold">{value}</span>
					</div>
				</>
			)}
		</div>
	);
}



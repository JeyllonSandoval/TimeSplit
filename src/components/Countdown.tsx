import { useEffect, useMemo, useRef, useState } from 'react';
import { getCountdownTargetDate } from "~/config/countdown";
import FlipDigit from "./FlipDigit";

type TimeLeft = {
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function calculateTimeLeft(targetDate: Date): TimeLeft {
    const now = new Date();
    if (targetDate.getTime() <= now.getTime()) {
        return { months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // 1) Meses completos usando aritmética de calendario
    let months = (targetDate.getFullYear() - now.getFullYear()) * 12 + (targetDate.getMonth() - now.getMonth());
    let anchor = new Date(now);
    anchor.setDate(1); // evitar overflow de día 31 -> siguiente mes
    anchor.setMonth(now.getMonth() + months);

    // Ajuste fino para no pasarnos del target
    if (anchor.getTime() > targetDate.getTime()) {
        months -= 1;
        anchor = new Date(now);
        anchor.setDate(1);
        anchor.setMonth(now.getMonth() + months);
    }

    // Avanza anchor al mismo día del mes que now si es posible; si no, usa último día del mes
    const desiredDay = Math.min(now.getDate(), daysInMonth(anchor.getFullYear(), anchor.getMonth()));
    anchor.setDate(desiredDay);

    // 2) Resto en ms tras quitar meses completos
    let remainingMs = Math.max(0, targetDate.getTime() - anchor.getTime());

    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const dayMs = 24 * 60 * 60 * 1000;
    const hourMs = 60 * 60 * 1000;
    const minuteMs = 60 * 1000;

    const weeks = Math.floor(remainingMs / weekMs);
    remainingMs -= weeks * weekMs;

    const days = Math.floor(remainingMs / dayMs);
    remainingMs -= days * dayMs;

    const hours = Math.floor(remainingMs / hourMs);
    remainingMs -= hours * hourMs;

    const minutes = Math.floor(remainingMs / minuteMs);
    remainingMs -= minutes * minuteMs;

    const seconds = Math.floor(remainingMs / 1000);

    return { months, weeks, days, hours, minutes, seconds };
}

function daysInMonth(year: number, monthZeroBased: number): number {
    return new Date(year, monthZeroBased + 1, 0).getDate();
}

export default function Countdown() {
	const targetDate = useMemo(() => getCountdownTargetDate(), []);
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
	const isElapsed = timeLeft.months === 0 && timeLeft.weeks === 0 && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
	const prevHmsRef = useRef<{h: string; m: string; s: string}>({ h: '00', m: '00', s: '00' });

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft(calculateTimeLeft(targetDate));
		}, 1000);
		return () => clearInterval(intervalId);
	}, [targetDate]);

	const h = timeLeft.hours.toString().padStart(2, '0');
	const m = timeLeft.minutes.toString().padStart(2, '0');
	const s = timeLeft.seconds.toString().padStart(2, '0');
	const prev = prevHmsRef.current;
	prevHmsRef.current = { h, m, s };

	return (
		<div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-6">
			<TimeBoxStatic label="Meses" value={timeLeft.months} blink={isElapsed} />
			<TimeBoxStatic label="Semanas" value={timeLeft.weeks} blink={isElapsed} />
			<TimeBoxStatic label="Días" value={timeLeft.days} blink={isElapsed} />

			<div className="text-center">
				<div className={`relative rounded-lg border shadow-sm panel ${isElapsed ? 'border-red-400' : 'border-slate-200'} dark:border-slate-700 p-3`}> 
					<div className="flex gap-2 justify-center">
						<FlipDigit value={h[0]} previousValue={prev.h[0]} className="w-14 h-20 sm:w-16 sm:h-24" />
						<FlipDigit value={h[1]} previousValue={prev.h[1]} className="w-14 h-20 sm:w-16 sm:h-24" />
					</div>
					<div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/20 dark:bg-white/15"></div>
					<div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10 dark:bg-white/10"></div>
				</div>
				<div className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Horas</div>
			</div>

			<div className="text-center">
				<div className={`relative rounded-lg border shadow-sm panel ${isElapsed ? 'border-red-400' : 'border-slate-200'} dark:border-slate-700 p-3`}> 
					<div className="flex gap-2 justify-center">
						<FlipDigit value={m[0]} previousValue={prev.m[0]} className="w-14 h-20 sm:w-16 sm:h-24" />
						<FlipDigit value={m[1]} previousValue={prev.m[1]} className="w-14 h-20 sm:w-16 sm:h-24" />
					</div>
					<div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/20 dark:bg-white/15"></div>
					<div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10 dark:bg-white/10"></div>
				</div>
				<div className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Minutos</div>
			</div>

			<div className="text-center">
				<div className={`relative rounded-lg border shadow-sm panel ${isElapsed ? 'border-red-400' : 'border-slate-200'} dark:border-slate-700 p-3`}> 
					<div className="flex gap-2 justify-center">
						<FlipDigit value={s[0]} previousValue={prev.s[0]} className="w-14 h-20 sm:w-16 sm:h-24" />
						<FlipDigit value={s[1]} previousValue={prev.s[1]} className="w-14 h-20 sm:w-16 sm:h-24" />
					</div>
					<div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/20 dark:bg-white/15"></div>
					<div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10 dark:bg-white/10"></div>
				</div>
				<div className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Segundos</div>
			</div>
		</div>
	);
}

function TimeBoxStatic({ label, value, blink }: { label: string; value: number; blink?: boolean }) {
	const padded = value.toString().padStart(2, '0');
	const digitClass = `tabular-nums font-mono text-5xl sm:text-6xl font-extrabold leading-none tracking-tight ${blink ? 'text-red-600 animate-blink' : ''}`;
	return (
		<div className="text-center">
			<div className={`relative overflow-hidden rounded-lg border shadow-sm ${blink ? 'border-red-400' : 'border-slate-200'} panel dark:border-slate-700`}>
				<div className="h-28 sm:h-32 grid place-items-center">
					<span className={digitClass}>{padded}</span>
				</div>
				<div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/20 dark:bg-white/15"></div>
				<div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10 dark:bg-white/10"></div>
			</div>
			<div className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
		</div>
	);
}



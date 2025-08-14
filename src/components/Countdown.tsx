import { useEffect, useMemo, useRef, useState } from 'react';
import { getCountdownTargetDate } from "~/config/countdown";

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
    const prevRef = useRef<{mo: string; wk: string; d: string; h: string; m: string; s: string}>({ mo: '00', wk: '00', d: '00', h: '00', m: '00', s: '00' });

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft(calculateTimeLeft(targetDate));
		}, 1000);
		return () => clearInterval(intervalId);
	}, [targetDate]);

    const mo = timeLeft.months.toString().padStart(2, '0');
    const wk = timeLeft.weeks.toString().padStart(2, '0');
    const d = timeLeft.days.toString().padStart(2, '0');
    const h = timeLeft.hours.toString().padStart(2, '0');
    const m = timeLeft.minutes.toString().padStart(2, '0');
    const s = timeLeft.seconds.toString().padStart(2, '0');
    const prev = prevRef.current;
    prevRef.current = { mo, wk, d, h, m, s };

	return (
        <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-6">
            <UnitBox label="Meses" value={mo} previousValue={prev.mo} highlight={isElapsed} />
            <UnitBox label="Semanas" value={wk} previousValue={prev.wk} highlight={isElapsed} />
            <UnitBox label="Días" value={d} previousValue={prev.d} highlight={isElapsed} />
            <UnitBox label="Horas" value={h} previousValue={prev.h} highlight={isElapsed} />
            <UnitBox label="Minutos" value={m} previousValue={prev.m} highlight={isElapsed} />
            <UnitBox label="Segundos" value={s} previousValue={prev.s} highlight={isElapsed} />
        </div>
	);
}

function UnitBox({ label, value, previousValue, highlight }: { label: string; value: string; previousValue?: string; highlight?: boolean }) {
    return (
        <div className="text-center">
            {/* Un solo borde: lo aporta este contenedor */}
            <div className={`relative overflow-hidden rounded-lg border panel ${highlight ? 'border-red-400' : 'border-slate-200'} dark:border-slate-700 p-3`}> 
                <div className="flex justify-center">
                    <FlipBlock value={value} previousValue={previousValue} className="w-28 h-24 sm:w-32 sm:h-28" />
                </div>
                {/* Línea y punto decorativos como elementos de fondo */}
                <div className="pointer-events-none absolute inset-x-3 top-1/2 h-px bg-black/10 dark:bg-white/10"></div>
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/15 dark:bg-white/10"></div>
            </div>
            <div className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
        </div>
    );
}

function FlipBlock({ value, previousValue, className }: { value: string; previousValue?: string; className?: string }) {
    const [isFlipping, setIsFlipping] = useState(false);
    const [prev, setPrev] = useState(previousValue ?? value);
    const [phase, setPhase] = useState<'idle' | 'front' | 'back'>('idle');

    useEffect(() => {
        if (value !== prev) {
            const FRONT_MS = 300;
            const BACK_MS = 300;
            setIsFlipping(true);
            setPhase('front');
            const t1 = setTimeout(() => {
                setPhase('back');
            }, FRONT_MS);
            const t2 = setTimeout(() => {
                setIsFlipping(false);
                setPrev(value);
                setPhase('idle');
            }, FRONT_MS + BACK_MS);
            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
            };
        }
    }, [value, prev]);

    const containerClass = `flip-container ${isFlipping ? 'is-flipping' : ''} ${className ?? ''}`.trim();

    return (
        <div className={containerClass} aria-hidden="true">
            {!isFlipping && (
                <div className="static-card text-slate-900 dark:text-slate-100">
                    <span className="font-mono tabular-nums font-extrabold">{value}</span>
                </div>
            )}
            {isFlipping && phase === 'front' && (
                <div className="flip-front text-slate-900 dark:text-slate-100">
                    <span className="font-mono tabular-nums font-extrabold">{prev}</span>
                </div>
            )}
            {isFlipping && phase === 'back' && (
                <div className="flip-back text-slate-900 dark:text-slate-100">
                    <span className="font-mono tabular-nums font-extrabold">{value}</span>
                </div>
            )}
        </div>
    );
}



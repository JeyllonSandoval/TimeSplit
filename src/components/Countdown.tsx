import { useEffect, useMemo, useState } from 'react';
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

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft(calculateTimeLeft(targetDate));
		}, 1000);
		return () => clearInterval(intervalId);
	}, [targetDate]);

    return (
        <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
            <TimeBox label="Meses" value={timeLeft.months} />
            <TimeBox label="Semanas" value={timeLeft.weeks} />
            <TimeBox label="Días" value={timeLeft.days} />
            <TimeBox label="Horas" value={timeLeft.hours} />
            <TimeBox label="Minutos" value={timeLeft.minutes} />
            <TimeBox label="Segundos" value={timeLeft.seconds} />
        </div>
    );
}

function TimeBox({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="text-4xl font-extrabold leading-none tracking-tight sm:text-5xl">{value.toString().padStart(2, '0')}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
        </div>
    );
}



import { useEffect, useMemo, useState } from 'react';
import { getCountdownTargetDate } from "~/config/countdown";

type TimeLeft = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

function calculateTimeLeft(targetDate: Date): TimeLeft {
	const now = new Date();
	const diffMs = Math.max(0, targetDate.getTime() - now.getTime());

	const secondsTotal = Math.floor(diffMs / 1000);
	const days = Math.floor(secondsTotal / (60 * 60 * 24));
	const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60));
	const minutes = Math.floor((secondsTotal % (60 * 60)) / 60);
	const seconds = secondsTotal % 60;

	return { days, hours, minutes, seconds };
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
		<div className="flex items-center justify-center gap-4 p-8">
			<TimeBox label="Días" value={timeLeft.days} />
			<TimeBox label="Horas" value={timeLeft.hours} />
			<TimeBox label="Minutos" value={timeLeft.minutes} />
			<TimeBox label="Segundos" value={timeLeft.seconds} />
		</div>
	);
}

function TimeBox({ label, value }: { label: string; value: number }) {
	return (
		<div className="min-w-[90px] rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
			<div className="text-4xl font-bold leading-none">{value.toString().padStart(2, '0')}</div>
			<div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</div>
		</div>
	);
}



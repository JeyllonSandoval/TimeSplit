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
		<div style={{
			display: 'flex',
			gap: '1rem',
			justifyContent: 'center',
			alignItems: 'center',
			fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif',
			padding: '2rem'
		}}>
			<TimeBox label="Días" value={timeLeft.days} />
			<TimeBox label="Horas" value={timeLeft.hours} />
			<TimeBox label="Minutos" value={timeLeft.minutes} />
			<TimeBox label="Segundos" value={timeLeft.seconds} />
		</div>
	);
}

function TimeBox({ label, value }: { label: string; value: number }) {
	return (
		<div style={{
			minWidth: '90px',
			textAlign: 'center',
			padding: '1rem',
			border: '1px solid #e5e7eb',
			borderRadius: '0.75rem',
			background: '#fff',
			boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
		}}>
			<div style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
				{value.toString().padStart(2, '0')}
			</div>
			<div style={{ marginTop: '0.25rem', color: '#6b7280', fontSize: '0.9rem' }}>{label}</div>
		</div>
	);
}



// Fecha objetivo en UNIX Time (segundos). Cambia este valor libremente.
// Ejemplo: 2 de diciembre de 2025 00:00:00 UTC ≈ 1764633600
export const COUNTDOWN_TARGET_UNIX = 1755137336; // segundos

export function getCountdownTargetDate(): Date {
	return new Date(COUNTDOWN_TARGET_UNIX * 1000);
}



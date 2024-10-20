const WEEKDAYS: string[] = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const MONTHS: string[] = [
	"Januar",
	"Februar",
	"März",
	"April",
	"Mai",
	"Juni",
	"Juli",
	"August",
	"September",
	"Oktober",
	"November",
	"Dezember",
];

export function formatDate(date: Date): string {
	// Helper function to add a leading zero if needed
	const addZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

	// Format the time
	const hours = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());
	const time = minutes === "00" ? `${hours} Uhr` : `${hours}:${minutes} Uhr`;

	// Get day, month, and weekday names
	const dayName = WEEKDAYS[date.getDay()];
	const monthName = MONTHS[date.getMonth()];
	const day = date.getDate();

	// Return formatted date string
	return `${dayName}, ${day}. ${monthName} – ${time}`;
}

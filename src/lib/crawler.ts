import he from "he";
import { stripHtml } from "string-strip-html";
import { formatDate } from "./date";
import type { AgvEvent } from "./event";

interface TribeEvent {
	id: number;
	title: string;
	categories?: { name: string }[];
	venue?: { venue: string };
	excerpt?: string;
	cost?: string;
	start_date: string;
	status: string;
	image?: { url: string };
	url: string;
	website?: string;
}

export const fetchEvents = async (): Promise<AgvEvent[]> => {
	const eventApi =
		process.env.EVENT_API ||
		"https://www.agv-muenchen.de/wp-json/tribe/events/v1/events";

	const response = await fetch(eventApi);
	const data = await response.json();

	return data.events
		.filter((event: TribeEvent) => event.status === "publish") // Only published events
		.map((event: TribeEvent) => {
			const rawDate = new Date(event.start_date);

			// Detect musengruppe (first category if available)
			const musengruppe = event.categories?.[0]?.name || "";

			// Detect cost
			const cost =
				event.cost?.toLowerCase() === "kostenlos"
					? "Eintritt Frei"
					: event.cost || "";

			return {
				tribeId: event.id,
				title: decode(event.title),
				musengruppe,
				venue: decode(event.venue?.venue || ""),
				excerpt: decode(stripHtml(event.excerpt || "").result),
				cost,
				date: formatDate(rawDate),
				rawDate,
				image: event.image?.url || "",
				url: event.url,
				mgUrl: event.website,
			};
		});
};

export function decode(str: string | null | undefined): string | undefined {
	if (str) {
		return he.decode(str);
	}
}

import he from "he";
import { stripHtml } from "string-strip-html";
import { formatDate } from "./date";
import type { AgvEvent, EventDetail } from "./event";

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

const SPECIAL_MUSENGRUPPEN = new Set(["Aktivitas", "Philisterium"]);

export const fetchEvents = async (): Promise<AgvEvent[]> => {
	const eventApi =
		process.env.EVENT_API ||
		"https://www.agv-muenchen.de/wp-json/tribe/events/v1/events";

	try {
		const response = await fetch(eventApi);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();

		const processedEvents = processEvents(data.events);
		return aggregateEvents(processedEvents);
	} catch (error) {
		console.error("Error fetching or processing events:", error);
		return [];
	}
};

const processEvents = (events: TribeEvent[]): AgvEvent[] => {
	return events
		.filter((event) => event.status === "publish")
		.map((event): AgvEvent => {
			const rawDate = new Date(event.start_date);
			const musengruppe = event.categories?.[0]?.name || "";
			let cost =
				event.cost?.toLowerCase() === "kostenlos"
					? "Eintritt Frei"
					: event.cost || "";

			if (event.title.toLowerCase().includes("kneipe")) {
				cost = "Nur für geladene Gäste";
			}

			const eventDetail: EventDetail = {
				venue: decode(event.venue?.venue),
				cost,
				date: formatDate(rawDate),
				rawDate,
			};

			return {
				tribeId: event.id,
				title: decode(event.title) || "",
				musengruppe,
				excerpt: decode(stripHtml(event.excerpt || "").result),
				image: event.image?.url,
				url: event.url,
				mgUrl: event.website,
				eventDetails: [eventDetail],
			};
		});
};

const aggregateEvents = (events: AgvEvent[]): AgvEvent[] => {
	const eventGroups: { [key: string]: AgvEvent[] } = {};

	for (const event of events) {
		const key = SPECIAL_MUSENGRUPPEN.has(event.musengruppe || "")
			? `${event.title}-${event.tribeId}`
			: event.title;

		if (!eventGroups[key]) {
			eventGroups[key] = [];
		}
		eventGroups[key].push(event);
	}

	const aggregatedEvents: AgvEvent[] = [];

	for (const [, group] of Object.entries(eventGroups)) {
		if (group.length === 1) {
			aggregatedEvents.push(group[0]);
			continue;
		}

		const firstEvent = group[0];
		aggregatedEvents.push({
			...firstEvent,
			eventDetails: group.flatMap((e) => e.eventDetails),
		});
	}

	return aggregatedEvents;
};

export const decode = (str: string | null | undefined): string | undefined => {
	return str ? he.decode(str) : undefined;
};

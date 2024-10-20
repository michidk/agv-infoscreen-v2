export interface AgvEvent {
	tribeId: number;
	title: string;
	musengruppe?: string;
	excerpt?: string;
	image?: string;
	url: string;
	mgUrl?: string;
	eventDetails: EventDetail[];
}

export interface EventDetail {
	venue?: string;
	cost?: string;
	date?: string;
	rawDate: Date;
}

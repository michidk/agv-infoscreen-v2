export interface AgvEvent {
	tribeId: number;
	title: string;
	musengruppe?: string;
	venue?: string;
	excerpt?: string;
	cost?: string;
	date?: string;
	rawDate: Date;
	image?: string;
	url: string;
	mgUrl?: string;
}

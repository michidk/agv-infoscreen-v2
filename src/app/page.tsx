import Slideshow from "@/components/slideshow/slideshow";
import { fetchEvents } from "@/lib/crawler";
import Image from "next/image";

const DEFAULT_SLIDE_DURATION = 15000;

const EventsPage = async () => {
	const events = await fetchEvents();

	// Parse the environment variable or use the default
	const slideDuration =
		Number.parseInt(process.env.NEXT_PUBLIC_SLIDE_DURATION as string) ||
		DEFAULT_SLIDE_DURATION;

	if (events.length === 0) {
		return (
			<div className="relative overflow-hidden h-screen bg-black font-sans">
				<Image
					src="default.jpg"
					alt="No events"
					layout="fill"
					objectFit="cover"
				/>
			</div>
		);
	}

	return <Slideshow events={events} slideDuration={slideDuration} />;
};

export default EventsPage;

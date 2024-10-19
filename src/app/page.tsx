import Slideshow from "@/components/slideshow";
import { fetchEvents } from "@/lib/crawler";

const EventsPage = async () => {
	const events = await fetchEvents();

	return <Slideshow events={events} />;
};

export default EventsPage;

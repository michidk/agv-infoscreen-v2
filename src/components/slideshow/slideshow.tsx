"use client";

import type { AgvEvent } from "@/lib/event";
import { useEffect, useState } from "react";
import AgvLogo from "./AgvLogo";
import BackgroundImage from "./BackgroundImage";
import EventInfo from "./EventInfo";
import SlideIndicators from "./SlideIndicators";

export default function Slideshow({
	events,
	slideDuration,
}: {
	events: AgvEvent[];
	slideDuration: number;
}) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isDarkBackground, setIsDarkBackground] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % events.length);
		}, slideDuration);

		return () => clearInterval(interval);
	}, [events.length, slideDuration]);

	useEffect(() => {
		// Comment: This keyboard navigation is for testing purposes only and should be removed in production
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") {
				setCurrentSlide((prev) => (prev + 1) % events.length);
			} else if (event.key === "ArrowLeft") {
				setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [events.length]);

	const currentEvent = events[currentSlide];

	return (
		<div className="relative overflow-hidden h-screen bg-black font-sans slideshow">
			<BackgroundImage
				event={currentEvent}
				onColorAnalysis={setIsDarkBackground}
			/>
			<AgvLogo isDarkBackground={isDarkBackground} />
			<EventInfo event={currentEvent} />
			<SlideIndicators
				events={events}
				currentSlide={currentSlide}
				isDarkBackground={isDarkBackground}
			/>
		</div>
	);
}

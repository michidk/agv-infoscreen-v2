"use client";

import type { AgvEvent } from "@/lib/event";
import { useEffect, useState } from "react";
import AgvLogo from "./AgvLogo";
import BackgroundImage from "./BackgroundImage";
import EventInfo from "./EventInfo";
import SlideIndicators from "./SlideIndicators";

export default function Slideshow({
	events = [],
	slideDuration = 8000,
}: { events: AgvEvent[]; slideDuration?: number }) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isDarkBackground, setIsDarkBackground] = useState(true);

	useEffect(() => {
		if (events.length === 0) return;

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

	if (events.length === 0) {
		return (
			<div className="h-screen flex items-center justify-center bg-black text-white font-sans">
				No events to display
			</div>
		);
	}

	const currentEvent = events[currentSlide];

	return (
		<div className="relative overflow-hidden h-screen bg-black font-sans">
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

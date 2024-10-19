"use client";

import type { AgvEvent } from "@/lib/event";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

interface SlideshowProps {
	events: AgvEvent[];
	slideDuration?: number;
}

export default function Slideshow({
	events = [],
	slideDuration = 8000,
}: SlideshowProps) {
	const [currentSlide, setCurrentSlide] = useState(0);

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
			<AnimatePresence initial={false}>
				<motion.div
					key={currentEvent.tribeId}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
					className="absolute inset-0"
				>
					{currentEvent.image && (
						<Image
							src={currentEvent.image}
							alt={currentEvent.title}
							fill
							style={{ objectFit: "cover" }}
							quality={100}
							priority
						/>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
				</motion.div>
			</AnimatePresence>

			{/* AGV Logo */}
			<div className="absolute top-4 right-4 z-10">
				<Image
					src="agv_logo.svg"
					alt="AGV Logo"
					width={400}
					height={400}
					style={{ filter: "brightness(0) invert(1)" }}
				/>
			</div>

			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.8 }}
				className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent"
			>
				<div className="flex justify-between items-end">
					<div className="flex-grow">
						{currentEvent.musengruppe && (
							<p className="text-lg mb-2 text-gray-400">
								{currentEvent.musengruppe}
							</p>
						)}
						<h2 className="text-5xl font-bold mb-4 text-white">
							{currentEvent.title}
						</h2>
						{currentEvent.date && (
							<p className="text-2xl mb-2 text-gray-200">{currentEvent.date}</p>
						)}
						{currentEvent.venue && (
							<p className="text-xl mb-2 text-gray-300">{currentEvent.venue}</p>
						)}
						{currentEvent.excerpt && (
							<p className="text-lg mb-2 text-gray-400">
								{currentEvent.excerpt}
							</p>
						)}
						{currentEvent.cost && (
							<p className="text-2xl font-semibold text-white">
								{currentEvent.cost}
							</p>
						)}
					</div>
					{currentEvent.mgUrl && (
						<div className="ml-4 bg-white p-2 rounded">
							<QRCode value={currentEvent.mgUrl} size={100} />
						</div>
					)}
				</div>
			</motion.div>

			<div className="absolute top-4 left-0 right-0 flex justify-center space-x-2">
				{events.map((event) => (
					<motion.span
						key={event.tribeId}
						className={`w-3 h-3 rounded-full ${currentSlide === events.indexOf(event) ? "bg-white" : "bg-gray-500"}`}
						initial={false}
						animate={{
							scale: currentSlide === events.indexOf(event) ? 1.2 : 1,
							opacity: currentSlide === events.indexOf(event) ? 1 : 0.7,
						}}
						transition={{ duration: 0.3 }}
					/>
				))}
			</div>
		</div>
	);
}

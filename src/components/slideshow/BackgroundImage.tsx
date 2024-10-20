"use client";

import { analyzeImage } from "@/app/actions/analyzeImage";
import type { AgvEvent } from "@/lib/event";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BackgroundImage({
	event,
	onColorAnalysis,
}: { event: AgvEvent; onColorAnalysis: (isDark: boolean) => void }) {
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		if (event.image && imageLoaded) {
			analyzeImage(event.image)
				.then((isDark) => {
					onColorAnalysis(isDark);
				})
				.catch((error) => {
					console.error("Error analyzing image:", error);
					onColorAnalysis(true); // Default to dark if there's an error
				});
		}
	}, [event.image, imageLoaded, onColorAnalysis]);

	return (
		<AnimatePresence initial={false}>
			<motion.div
				key={event.tribeId}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 1 }}
				className="absolute inset-0"
			>
				{event.image && (
					<Image
						src={event.image}
						alt={event.title}
						fill
						style={{ objectFit: "cover" }}
						quality={100}
						priority
						onLoad={() => setImageLoaded(true)}
					/>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
			</motion.div>
		</AnimatePresence>
	);
}

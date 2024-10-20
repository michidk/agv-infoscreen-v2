import type { AgvEvent } from "@/lib/event";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SlideIndicators({
	events,
	currentSlide,
	isDarkBackground,
}: { events: AgvEvent[]; currentSlide: number; isDarkBackground: boolean }) {
	return (
		<div className="absolute top-4 left-0 right-0 flex justify-center space-x-2">
			{events.map((event, index) => (
				<motion.span
					key={event.tribeId}
					className={cn(
						"w-3 h-3 rounded-full",
						isDarkBackground
							? currentSlide === index
								? "bg-white"
								: "bg-gray-500"
							: currentSlide === index
								? "bg-black"
								: "bg-gray-600",
						currentSlide === index ? "opacity-100" : "opacity-70",
					)}
					initial={false}
					animate={{
						scale: currentSlide === index ? 1.2 : 1,
					}}
					transition={{ duration: 0.3 }}
				/>
			))}
		</div>
	);
}

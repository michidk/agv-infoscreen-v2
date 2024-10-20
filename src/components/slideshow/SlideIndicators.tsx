import type { AgvEvent } from "@/lib/event";
import { motion } from "framer-motion";

export const SlideIndicators = ({
	events,
	currentSlide,
}: {
	events: AgvEvent[];
	currentSlide: number;
}) => (
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
);

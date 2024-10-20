import type { AgvEvent } from "@/lib/event";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export const BackgroundImage = ({
	event,
}: {
	event: AgvEvent;
}) => (
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
				/>
			)}
			<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
		</motion.div>
	</AnimatePresence>
);

import type { AgvEvent } from "@/lib/event";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

export default function EventInfo({ event }: { event: AgvEvent }) {
	return (
		<motion.div
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 0.5, duration: 0.8 }}
			className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 via-black/50 to-transparent h-1/2"
		>
			<div className="flex justify-between items-end h-full">
				<div className="flex-grow space-y-4">
					{event.musengruppe && (
						<p className="text-3xl text-gray-300">{event.musengruppe}</p>
					)}
					<h2 className="text-7xl font-bold text-white leading-tight">
						{event.title}
					</h2>
					{event.date && <p className="text-4xl text-gray-200">{event.date}</p>}
					{(event.venue || event.cost) && (
						<p className="text-2xl text-gray-300">
							{event.venue && event.venue}
							{event.venue && event.cost && " — "}
							{event.cost && event.cost}
						</p>
					)}
					{event.excerpt && (
						<p className="text-1xl text-gray-300">{event.excerpt}</p>
					)}
				</div>
				{event.mgUrl && (
					<div className="ml-8 bg-white p-4 rounded">
						<QRCode value={event.mgUrl} size={160} />
					</div>
				)}
			</div>
		</motion.div>
	);
}

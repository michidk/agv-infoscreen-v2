import type { AgvEvent } from "@/lib/event";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

export default function EventInfo({ event }: { event: AgvEvent }) {
	return (
		<motion.div
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 0.5, duration: 0.8 }}
			className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent"
		>
			<div className="flex justify-between items-end">
				<div className="flex-grow">
					{event.musengruppe && (
						<p className="text-lg mb-2 text-gray-400">{event.musengruppe}</p>
					)}
					<h2 className="text-5xl font-bold mb-4 text-white">{event.title}</h2>
					{event.date && (
						<p className="text-2xl mb-2 text-gray-200">{event.date}</p>
					)}
					{event.venue && (
						<p className="text-xl mb-2 text-gray-300">{event.venue}</p>
					)}
					{event.excerpt && (
						<p className="text-lg mb-2 text-gray-400">{event.excerpt}</p>
					)}
					{event.cost && (
						<p className="text-2xl font-semibold text-white">{event.cost}</p>
					)}
				</div>
				{event.mgUrl && (
					<div className="ml-4 bg-white p-2 rounded">
						<QRCode value={event.mgUrl} size={100} />
					</div>
				)}
			</div>
		</motion.div>
	);
}

import { fetchEvents } from "@/lib/crawler";
import { getImageMetadata } from "@/lib/image";
import Image from "next/image";
import QRCode from "react-qr-code";

async function DebugPage() {
	const events = await fetchEvents();

	return (
		<div className="p-4 bg-gray-100 min-h-screen">
			<h1 className="text-2xl font-bold mb-4">Debug: Event List</h1>
			{events.map((event) => (
				<div
					key={event.tribeId}
					className="mb-6 bg-white p-4 rounded-lg shadow-md"
				>
					<h2 className="text-xl font-semibold mb-2">{event.title}</h2>
					<div className="flex flex-wrap">
						<div className="w-full md:w-1/3 pr-4 mb-4">
							{event.image && (
								<ImageWithMetadata src={event.image} alt={event.title} />
							)}
						</div>
						<div className="w-full md:w-2/3">
							{event.musengruppe && (
								<p className="mb-1">
									<strong>Musengruppe:</strong> {event.musengruppe}
								</p>
							)}
							{event.eventDetails.map((detail) => (
								<div
									key={`${detail.date}-${detail.venue}-${detail.cost}`}
									className="mb-2"
								>
									<p className="mb-1">
										<strong>Date:</strong> {detail.date}
									</p>
									{detail.venue && (
										<p className="mb-1">
											<strong>Venue:</strong> {detail.venue}
										</p>
									)}
									{detail.cost && (
										<p className="mb-1">
											<strong>Cost:</strong> {detail.cost}
										</p>
									)}
								</div>
							))}
							{event.excerpt && (
								<p className="mb-1">
									<strong>Excerpt:</strong> {event.excerpt}
								</p>
							)}
							<p className="mb-1">
								<strong>Link:</strong>{" "}
								<a
									href={event.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									{event.url}
								</a>
							</p>
							{event.mgUrl && (
								<div className="mt-2">
									<p className="mb-1">
										<strong>MG URL:</strong> {event.mgUrl}
									</p>
									<QRCode value={event.mgUrl} size={80} />
								</div>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

async function ImageWithMetadata({ src, alt }: { src: string; alt: string }) {
	const metadata = await getImageMetadata(src);

	return (
		<div>
			<Image
				src={src}
				alt={alt}
				width={200}
				height={150}
				className="object-cover rounded"
			/>
			{metadata && (
				<div className="mt-1 text-xs">
					<p>
						Resolution: {metadata.width}x{metadata.height}
					</p>
					<p>File size: {(metadata.size / 1024).toFixed(2)} KB</p>
				</div>
			)}
		</div>
	);
}

export default DebugPage;

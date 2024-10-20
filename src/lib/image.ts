import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

export async function getImageMetadata(src: string) {
	try {
		const response = await fetch(src);
		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const metadata = await sharp(buffer).metadata();
		return {
			width: metadata.width,
			height: metadata.height,
			size: buffer.length,
		};
	} catch (error) {
		console.error("Error fetching image metadata:", error);
		return null;
	}
}

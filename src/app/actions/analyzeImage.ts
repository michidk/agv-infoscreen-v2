"use server";

import sharp from "sharp";

export async function analyzeImage(imageUrl: string): Promise<boolean> {
	try {
		const response = await fetch(imageUrl);
		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const metadata = await sharp(buffer).metadata();
		const height = metadata.height || 0;

		const { data } = await sharp(buffer)
			.resize({ height: Math.round(height * 0.2) })
			.raw()
			.toBuffer({ resolveWithObject: true });

		let r = 0;
		let g = 0;
		let b = 0;
		const pixelCount = data.length / 3;

		for (let i = 0; i < data.length; i += 3) {
			r += data[i];
			g += data[i + 1];
			b += data[i + 2];
		}

		r = Math.floor(r / pixelCount);
		g = Math.floor(g / pixelCount);
		b = Math.floor(b / pixelCount);

		// Calculate perceived brightness
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;

		return brightness < 128; // Return true if dark, false if light
	} catch (error) {
		console.error("Error analyzing image:", error);
		return true; // Default to dark if there's an error
	}
}

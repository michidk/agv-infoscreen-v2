"use server";

import { createCanvas, loadImage } from "canvas";

export async function analyzeImage(imageUrl: string): Promise<boolean> {
	try {
		const image = await loadImage(imageUrl);
		const canvas = createCanvas(image.width, image.height * 0.2);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(
			image,
			0,
			0,
			image.width,
			image.height * 0.2,
			0,
			0,
			canvas.width,
			canvas.height,
		);

		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;
		let r = 0;
		let g = 0;
		let b = 0;

		for (let i = 0; i < data.length; i += 4) {
			r += data[i];
			g += data[i + 1];
			b += data[i + 2];
		}

		r = Math.floor(r / (data.length / 4));
		g = Math.floor(g / (data.length / 4));
		b = Math.floor(b / (data.length / 4));

		// Calculate perceived brightness
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;

		return brightness < 128; // Return true if dark, false if light
	} catch (error) {
		console.error("Error analyzing image:", error);
		return true; // Default to dark if there's an error
	}
}

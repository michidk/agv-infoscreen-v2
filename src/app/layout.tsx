import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
	title: "AGV Infoscreen v2",
};

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body
				className={cn("min-h-screen h-screen antialiased", roboto.className)}
			>
				{children}
			</body>
		</html>
	);
}

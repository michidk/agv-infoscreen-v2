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
		<html lang="en" className={roboto.className}>
			<head />
			<body>
				<main className="min-h-screen h-screen antialiased">{children}</main>
			</body>
		</html>
	);
}

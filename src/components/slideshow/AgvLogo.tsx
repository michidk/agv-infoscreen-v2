import Image from "next/image";

export default function AgvLogo({
	isDarkBackground,
}: { isDarkBackground: boolean }) {
	return (
		<div className="absolute top-4 right-4 z-10">
			<Image
				src="/agv_logo.svg"
				alt="AGV Logo"
				width={400}
				height={400}
				style={{
					filter: isDarkBackground
						? "brightness(0) invert(1)" // White on dark background
						: "brightness(0)", // Black on light background
				}}
			/>
		</div>
	);
}

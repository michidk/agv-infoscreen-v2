import Image from "next/image";

export const AgvLogo = () => (
	<div className="absolute top-4 right-4 z-10">
		<Image
			src="agv_logo.svg"
			alt="AGV Logo"
			width={400}
			height={400}
			style={{ filter: "brightness(0) invert(1)" }}
		/>
	</div>
);

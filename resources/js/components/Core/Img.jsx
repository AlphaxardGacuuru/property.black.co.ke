import React from "react"

const Img = ({
	src = "/storage/img/party-people.png",
	width,
	height,
	className,
	style,
	alt = "image",
}) => {
	const handleError = (e) => {
		// Prevent infinite loop if fallback image also fails
		if (e.target.src.includes("male-avatar.png")) {
			return;
		}
		// Set fallback to male-avatar.png for broken images
		e.target.src = "/storage/avatars/male-avatar.png"
	}

	return (
		<img
			src={src ?? "/storage/img/android-chrome-512x512.png"}
			width={width}
			height={height}
			className={className}
			style={style}
			alt={alt}
			loading="lazy"
			onError={handleError}
		/>
	)
}

export default Img

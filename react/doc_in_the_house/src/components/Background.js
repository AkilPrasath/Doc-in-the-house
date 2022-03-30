import ImageFadeIn from "react-image-fade-in";
import background from "../assets/images/museum.jpg";

export function Background() {
	return (
		<ImageFadeIn
			opacityTransition={2}
			style={{ position: "absolute" }}
			className="home-container background-zindex"
			src={background}></ImageFadeIn>
	);
}

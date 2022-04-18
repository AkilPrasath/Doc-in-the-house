import "./station_content.css";
import heartRate from "../../assets/images/heart-rate.jpg";
import chest from "../../assets/images/chest.jpg";
import breathing_difficulty from "../../assets/images/breathing-difficulty.jpg";
import brokenBones from "../../assets/images/bones-broken.jpg";
import { useOutletContext, useSearchParams } from "react-router-dom";
import ImgsViewer from "react-images-viewer";
import { useContext, useState } from "react";
import { Animate, AnimateGroup, AnimateKeyframes } from "react-simple-animate";
import { PatientContext } from "../../App";
import useImage from "../../utils/useImage";
import { Typing } from "../../components/typing";
import { Fade } from "react-reveal";

const imageMap = {
	"heart-rate.jpg": heartRate,
	"chest.jpg": chest,
	"breathing-difficulty.jpg": breathing_difficulty,
};

const fromMeAnimationProps = {
	start: {
		opacity: 0,
		transform: " translateX(50px) scale(0.7) translateY(20px)",
	},
	end: {
		opacity: 1,
		transform: " translateX(0px) scale(1)  translateY(0px)",
	},
};
const fromThemAnimationProps = {
	start: {
		opacity: 0,
		transform: " translateX(-50px) scale(0.7) translateY(20px)",
	},
	end: {
		opacity: 1,
		transform: " translateX(0px) scale(1)  translateY(0px)",
	},
};
const transformStartX = "transf";

export function StationContent() {
	const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
	const currentStationIndex = useOutletContext();
	const [params] = useSearchParams();
	const patientData = useContext(PatientContext);
	const stationName = patientData["symptoms"][currentStationIndex.index];
	const stationData = patientData["diagnosis"][stationName];
	// const { loading, error, image } = useImage(stationData["image"]);
	// delay={2} sequenceIndex={0} {...fromMeAnimationProps}
	return (
		<div className="imessage">
			<AnimateGroup play>
				<Animate delay={1} sequenceIndex={0} {...fromMeAnimationProps}>
					<div
						style={{
							display: "flex",
							flexFlow: "row",
						}}>
						<div
							onClick={() => {
								setIsImageViewerOpen(true);
							}}
							style={{
								flexGrow: 1,
								flexShrink: 0,
								content: ".",
								contentVisibility: "hidden",
							}}></div>

						<p className="from-me">
							<img
								onClick={() => {
									setIsImageViewerOpen(true);
								}}
								className="x-ray"
								alt={"bones"}
								src={imageMap[stationData["image"]]}
							/>
							<ImgsViewer
								backdropCloseable={true}
								imgs={[{ src: imageMap[stationData["image"]] }]}
								isOpen={isImageViewerOpen}
								onClose={() => {
									setIsImageViewerOpen(false);
								}}
							/>
						</p>
					</div>
				</Animate>
				<Animate
					delay={1}
					sequenceIndex={1}
					{...fromThemAnimationProps}>
					<p className="from-them">
						{params.get("language") == "en-ES"
							? stationData["content"]["en-ES"]
							: stationData["content"]["en"]}
					</p>
				</Animate>
			</AnimateGroup>
		</div>
	);
}

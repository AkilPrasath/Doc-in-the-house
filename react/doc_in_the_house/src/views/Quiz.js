import { BackgroundComponent } from "../components/BackgroundComponent";
import "./Quiz.css";
import hospital from "../assets/images/quiz-background.jpg";
import { useContext, useEffect, useState } from "react";
import { PatientContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QuizCard } from "../components/QuizCard";
import { Fade } from "react-reveal";
import adam from "../assets/images/characters/Adam.png";
import brice from "../assets/images/characters/Brice.png";
import cam from "../assets/images/characters/Cam.png";
import casey from "../assets/images/characters/Casey.png";
import collette from "../assets/images/characters/Collette.png";
import justin from "../assets/images/characters/Justin.png";
import { patientMap } from "./stations/station-main.js";
export function Quiz() {
	const patientData = useContext(PatientContext);
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const quizData = patientData["mcq"];
	const infoData = patientData["info"];
	const [showInfo, setShowInfo] = useState(false);
	useEffect(() => {
		if (!patientData["success"]) {
			navigate(
				{
					pathname: "/character-select",
					search: "?" + params.toString(),
				},
				{
					replace: true,
				}
			);
		}
	}, []);

	if (!patientData["success"]) {
		return <div>Redirecting...</div>;
	}
	return (
		<BackgroundComponent
			backgroundImage={hospital}
			content={
				<div className="quiz-container">
					{!showInfo ? (
						<QuizCard
							quizData={quizData}
							onCorrectOption={() => {
								setShowInfo(true);
							}}
						/>
					) : (
						<InfoCard infoData={infoData} />
					)}
				</div>
			}
		/>
	);
}

function InfoCard({ infoData }) {
	const patientData = useContext(PatientContext);
	const [params] = useSearchParams();
	return (
		<Fade bottom>
			<div className="info-card">
				<div className="info-title">
					{params.get("language") == "en-ES"
						? infoData["title"]["en-ES"]
						: infoData["title"]["en"]}
				</div>
				<div className="info-disease-container">
					<img
						className="quiz-character-container"
						src={patientMap[patientData["name"]]}
						alt={patientData["name"]}
					/>
					<p className="info-content">
						{params.get("language") == "en-ES"
							? infoData["content"]["en-ES"]
							: infoData["content"]["en"]}
					</p>
				</div>
			</div>
		</Fade>
	);
}

import { Animate, AnimateGroup } from "react-simple-animate";
import { BackgroundComponent } from "../components/BackgroundComponent";
import "./Home.css";
import "./CharacterSelect.css";
import kevin from "../assets/images/characters/Kevin.png";
import cam from "../assets/images/characters/Cam.png";
import miguel from "../assets/images/characters/Miguel.png";
import casey from "../assets/images/characters/Casey.png";
import anna from "../assets/images/characters/Anna.png";
import justin from "../assets/images/characters/Justin.png";

import React, { useContext, useState } from "react";
import { Fade } from "react-reveal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "../components/loading";
import { useEffect } from "react";
const SetPatientDataContext = React.createContext();
export function CharacterSelect({ setPatientData }) {
	const [showMessage, setShowMessage] = useState(true);
	const [showLoading, setShowLoading] = useState(false);
	const [params] = useSearchParams();
	function messageFinish() {
		setShowMessage(false);
	}
	useEffect(() => {
		const selectedLanguage =
			params.get("language") == "en-ES" ? "en-ES" : "en";
		//TODO: Later
		// const audioFile = require(`../assets/audio/generic/${selectedLanguage}/character_select.wav`);
		// const audio = new Audio(audioFile);
		// setTimeout(() => {
		// 	audio.play().catch((error) => {
		// 		console.log(error);
		// 	});
		// }, 1500);
		// return () => {
		// 	audio.pause();
		// };
	}, []);
	return (
		<SetPatientDataContext.Provider value={setPatientData}>
			<BackgroundComponent
				content={
					<div
						className=" home-container home-flex-box"
						style={{ justifyContent: "center" }}>
						<Fade bottom>
							{showMessage ? (
								<div className="character-card  message-card">
									<AnimateGroup play>
										<Animate
											duration={1}
											sequenceIndex={0}
											{...questionsAnimationProps}
											delay={1}>
											<p className="message-text">
												{params.get("language") ==
												"en-ES"
													? "??Alguna vez has querido ser m??dico?"
													: "Have you ever wanted to be a Doctor???? ?"}
											</p>
										</Animate>
										<Animate
											duration={1}
											sequenceIndex={1}
											{...questionsAnimationProps}
											delay={1}>
											<p className="message-text">
												{params.get("language") ==
												"en-ES"
													? "Entonces hoy puede ser tu primer d??a para practicar"
													: "Then today can be your first day to practice????!"}
											</p>
										</Animate>
										<Animate
											duration={1}
											sequenceIndex={2}
											{...questionsAnimationProps}
											delay={1}>
											<p className="message-text">
												{params.get("language") ==
												"en-ES"
													? "Tenemos algunos amigos aqu?? hoy que no se sienten bien ????, as?? que averiguaremos qu?? les pasa."
													: `We have some friends here today
												that are not feeling well????, so
												we'll figure out what???s wrong
												with them.`}
											</p>
										</Animate>
										<Animate
											duration={1}
											sequenceIndex={3}
											{...questionsAnimationProps}
											delay={1}>
											<div
												onClick={() => {
													messageFinish();
												}}
												className="go-button">
												{params.get("language") ==
												"en-ES"
													? "Vamos"
													: "Let's Go!"}
											</div>
										</Animate>
									</AnimateGroup>
								</div>
							) : (
								<CharacterListBox
									setShowLoading={setShowLoading}
								/>
							)}
						</Fade>
						{showLoading && (
							<div className="loading-container">
								<Loading />
							</div>
						)}
					</div>
				}
			/>
		</SetPatientDataContext.Provider>
	);
}
const opacityAnimationProps = {
	start: { opacity: 0 },
	end: { opacity: 1 },
};
const questionsAnimationProps = {
	start: {
		opacity: 0,
		transform: "translateX(-100px)",
	},
	end: {
		opacity: 1,
		transform: "translateX(0px)",
	},
};
function CharacterListBox({ setShowLoading }) {
	const characters = ["Kevin", "Cam", "Miguel", "Casey", "Anna", "Justin"];
	const characterImages = [kevin, cam, miguel, casey, anna, justin];
	const [params] = useSearchParams();
	return (
		<div className="character-card">
			<Fade top>
				<p className="select-character-title">
					{params.get("language") == "en-ES"
						? "Haz clic en el paciente para determinar qu?? est?? mal. "
						: "Click on the patient to determine what is wrong."}
				</p>
			</Fade>
			<div className="character-card-flex-box">
				<AnimateGroup play>
					{characters.map((value, index) => {
						return (
							<Character
								key={index}
								setShowLoading={setShowLoading}
								alt={value}
								image={characterImages[index]}
								name={value}
								sequenceIndex={index}
								delay={index === 0 ? 1.5 : 0}
							/>
						);
					})}
				</AnimateGroup>
			</div>
		</div>
	);
}

export function Character({
	setShowLoading,
	sequenceIndex,
	delay = 0,
	image,
	alt,
	name,
}) {
	const navigate = useNavigate();

	const [params] = useSearchParams();
	const setPatientData = useContext(SetPatientDataContext);
	return (
		<div
			onClick={() => {
				const patientName = name;
				setShowLoading(true);
				fetch(
					`https://doc-in-the-house-node.herokuapp.com/patient?name=${patientName}`
				)
					.then((response) => response.json())
					.then((response) => {
						console.log(response);
						setPatientData(response);
						setShowLoading(false);
						navigate({
							pathname: `/stations`,
							search: "?" + params.toString(),
						});
					})
					.catch((error) => {
						console.log(error);
						setShowLoading(false);
					});
			}}
			className="flex-item">
			<Animate
				{...opacityAnimationProps}
				sequenceIndex={sequenceIndex}
				delay={delay}>
				{/* <div className="character-container"> */}
				<img className="c-character-container" src={image} alt={alt} />
				{/* </div> */}
				<p className="character-name">{name}</p>
			</Animate>
		</div>
	);
}

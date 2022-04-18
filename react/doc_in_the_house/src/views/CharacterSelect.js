import { Animate, AnimateGroup } from "react-simple-animate";
import { BackgroundComponent } from "../components/BackgroundComponent";
import "./Home.css";
import "./CharacterSelect.css";
import adam from "../assets/images/characters/Adam.png";
import brice from "../assets/images/characters/Brice.png";
import cam from "../assets/images/characters/Cam.png";
import casey from "../assets/images/characters/Casey.png";
import collette from "../assets/images/characters/Collette.png";
import justin from "../assets/images/characters/Justin.png";

import React, { useContext, useState } from "react";
import { Fade } from "react-reveal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "../components/loading";
const SetPatientDataContext = React.createContext();
export function CharacterSelect({ setPatientData }) {
	const [showMessage, setShowMessage] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	function messageFinish() {
		setShowMessage(false);
	}
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
												Have you ever wanted to be a
												Doctor🩺 ?
											</p>
										</Animate>
										<Animate
											duration={1}
											sequenceIndex={1}
											{...questionsAnimationProps}
											delay={1}>
											<p className="message-text">
												Then today can be your first day
												to practice😁!
											</p>
										</Animate>
										<Animate
											duration={1}
											sequenceIndex={2}
											{...questionsAnimationProps}
											delay={1}>
											<p className="message-text">
												We have some friends here today
												that are not feeling well😣, so
												we'll figure out what’s wrong
												with them.
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
												Let's Go!
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
	const characters = ["Adam", "Brice", "Cam", "Casey", "Collette", "Justin"];
	const characterImages = [adam, brice, cam, casey, collette, justin];
	return (
		<div className="character-card">
			<Fade top>
				<p className="select-character-title">
					Click on the patient to determine what is wrong.
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
				fetch(`http://127.0.0.1:3001/patient?name=${patientName}`)
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
				<div className="character-container">
					<img className="character" src={image} alt={alt} />
				</div>
				<p className="character-name">{name}</p>
			</Animate>
		</div>
	);
}

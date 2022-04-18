import { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Animate, AnimateGroup } from "react-simple-animate";
import Shake from "react-reveal/Shake";
import RubberBand from "react-reveal/RubberBand";
import "./QuizCard.css";
const quizAnimationProps = {
	start: {
		opacity: 0,
		transform: "translateX(-100px)",
	},
	end: {
		opacity: 1,
		transform: "translateX(0px)",
	},
};
export function QuizCard({ quizData, onCorrectOption }) {
	const navigate = useNavigate();
	var options = [];
	if (quizData !== undefined) {
		options = quizData["options"];
	}
	const [params] = useSearchParams();
	const optionClasses = options.map((value, index, options) =>
		value.correct ? "correct" : "wrong"
	);
	const optionTriggers = options.map((value, index, options) => {
		return false;
	});
	const spiesList = options.map((value, index) => 0);
	const [spies, setSpies] = useState(spiesList);
	const [answerTriggers, setAnswerTriggers] = useState(optionTriggers);

	function optionClick(index) {
		if (!answerTriggers[index]) {
			var newAnswerTriggers = [...answerTriggers];
			newAnswerTriggers[index] = true;
			setAnswerTriggers(newAnswerTriggers);
			var newSpies = [...spies];
			newSpies[index] = newSpies[index] + 1;
			setSpies(newSpies);
		}
	}
	useEffect(() => {
		// answerTriggers.forEach((value, index) => {
		// 	if (value) {
		// 		setTimeout(() => {
		// 			var newAnswerTriggers = [
		// 				...answerTriggers.map(() => false),
		// 			];
		// 			setAnswerTriggers(newAnswerTriggers);
		// 		}, 1000);
		// 	}
		// });

		options.forEach((option, index) => {
			if (option.correct && answerTriggers[index]) {
				setTimeout(() => {
					onCorrectOption();
				}, 2000);
			}
		});
	}, [answerTriggers]);
	return (
		<Fade bottom>
			<div className="quiz-card">
				<AnimateGroup play>
					<Animate
						delay={2}
						sequenceIndex={0}
						{...quizAnimationProps}>
						<div className="question">
							{params.get("language") == "en-ES"
								? quizData["question"]["en-ES"]
								: quizData["question"]["en"]}
						</div>
					</Animate>
					<div className="options-box">
						{options.map((value, index, options) => {
							return (
								<Animate
									key={index}
									sequenceId={index + 1}
									{...quizAnimationProps}>
									{!value.correct ? (
										<Shake spy={spies[index]}>
											<div
												className={`option ${
													answerTriggers[index]
														? optionClasses[index]
														: ""
												}`}
												onClick={() => {
													optionClick(index);
												}}>
												{params.get("language") ==
												"en-ES"
													? value["en-ES"]
													: value["en"]}
											</div>
										</Shake>
									) : (
										<RubberBand spy={spies[index]}>
											<div
												className={`option ${
													answerTriggers[index]
														? optionClasses[index]
														: ""
												}`}
												onClick={() => {
													optionClick(index);
												}}>
												{params.get("language") ==
												"en-ES"
													? value["en-ES"]
													: value["en"]}
											</div>
										</RubberBand>
									)}
								</Animate>
							);
						})}
					</div>
				</AnimateGroup>
			</div>
		</Fade>
	);
}

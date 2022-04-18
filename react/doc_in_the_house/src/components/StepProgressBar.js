import { ProgressBar, Step } from "react-step-progress-bar";
import "./StepProgressBar.css";
export function StepProgressBar({ progressRatio, titleList, progress }) {
	return (
		<ProgressBar
			hasStepZero={true}
			percent={
				progress * progressRatio < 100 ? progress * progressRatio : 100
			}
			height={15}
			filledBackground="linear-gradient(to right,  #2D99AA, #104B6D)">
			{titleList.map((val, index) => {
				return <StationStep key={index} name={val} />;
			})}
		</ProgressBar>
	);
}
function StationStep({ name, ...props }) {
	return (
		<Step
			{...props}
			transition="scale"
			children={({ accomplished, index }) => {
				return (
					<StepContent
						accomplished={accomplished}
						stepNumber={index + 1}
						title={name}
					/>
				);
			}}></Step>
	);
}
function StepContent({ accomplished, stepNumber, title }) {
	return (
		<div className="step-container">
			<div
				className="step"
				style={{
					backgroundColor: accomplished ? "#104B6D" : "white",
				}}>
				<p
					className="step-text"
					style={{
						color: accomplished ? "white" : "#104B6D",
					}}>
					{stepNumber}
				</p>
			</div>
			<p className="step-title">{title}</p>
		</div>
	);
}

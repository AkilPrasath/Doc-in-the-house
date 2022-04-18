import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomeContent } from "./views/Home";
import { CharacterSelect } from "./views/CharacterSelect";
import { StationMain } from "./views/stations/station-main";
import { StationContent } from "./views/stations/station_content";
import React, { useState } from "react";
import { Quiz } from "./views/Quiz";

export const PatientContext = React.createContext();

function App() {
	const [patientData, setPatientData] = useState({
		success: false,
	});
	return (
		<PatientContext.Provider value={patientData}>
			<Router>
				<Routes>
					<Route path="/" element={<HomeContent />} />
					<Route
						path="character-select"
						element={
							<CharacterSelect setPatientData={setPatientData} />
						}
					/>
					<Route path="quiz" element={<Quiz />} />
					<Route path="stations" element={<StationMain />}>
						<Route
							exact
							path="bones"
							element={<StationContent key={1} />}
						/>
						<Route
							exact
							path="chest"
							element={<StationContent key={2} />}
						/>
						<Route
							exact
							path="lung"
							element={<StationContent key={3} />}
						/>
						<Route
							exact
							path="heart"
							element={<StationContent key={4} />}
						/>
						<Route
							exact
							path="eyes"
							element={<StationContent key={4} />}
						/>
						<Route
							exact
							path="food"
							element={<StationContent key={4} />}
						/>
						<Route
							exact
							path="fatigue"
							element={<StationContent key={4} />}
						/>
						<Route
							exact
							path="temp"
							element={<StationContent key={4} />}
						/>
						<Route
							exact
							path="skin"
							element={<StationContent key={4} />}
						/>
						<Route
							exact
							path="vomit"
							element={<StationContent key={4} />}
						/>
						<Route
							exact
							path="urine"
							element={<StationContent key={4} />}
						/>
						<Route
							exact
							path="throat"
							element={<StationContent key={4} />}
						/>
						<Route
							exact
							path="snot"
							element={<StationContent key={4} />}
						/>
					</Route>
				</Routes>
			</Router>
		</PatientContext.Provider>
	);
}

export default App;

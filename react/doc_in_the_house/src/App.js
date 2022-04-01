import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomeContent } from "./views/Home";
import { CharacterSelect } from "./views/CharacterSelect";
function App() {
	console.log("adfadfadf");
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomeContent />}></Route>
				<Route
					path="/character-select"
					element={<CharacterSelect />}></Route>
			</Routes>
		</Router>
	);
}

export default App;

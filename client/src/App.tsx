import LandingPage from "./Pages/Landing";
import ExercisesPage from "./Pages/Exercises";
import ExerciseInfoPage from "./Pages/ExerciseInfo";

import {
  Routes as Switch,
  Route
} from "react-router-dom";

const App = ():JSX.Element  => {
  return (
    <div className="App">
      <Switch>
        <Route path = "/exercises" element={<ExercisesPage />} />
        <Route path = "/exercise/:id" element={<ExerciseInfoPage />} />
        <Route path = "/" element={<LandingPage />} />
      </Switch>
    </div>
  );
}

export default App;

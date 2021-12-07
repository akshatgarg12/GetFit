import LandingPage from "./Pages/Landing";
import ExercisesPage from "./Pages/Exercises";
import ExerciseInfoPage from "./Pages/ExerciseInfo";

import {
  Routes as Switch,
  Route
} from "react-router-dom";
import WorkoutInfoPage from "./Pages/WorkoutInfo";
import CreateWorkoutPage from "./Pages/CreateWorkout";

const App = ():JSX.Element  => {
  return (
    <div className="App">
      <Switch>
        <Route path = "/exercises" element={<ExercisesPage />} />
        <Route path = "/exercise/:id" element={<ExerciseInfoPage />} />
        <Route path = "/workout/:id" element={<WorkoutInfoPage />} />
        <Route path = "/workout/create" element={<CreateWorkoutPage />} />
        <Route path = "/" element={<LandingPage />} />
      </Switch>
    </div>
  );
}

export default App;

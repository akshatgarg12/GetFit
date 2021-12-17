import LandingPage from "./Pages/Landing";
import ExercisesPage from "./Pages/Exercises";
import ExerciseInfoPage from "./Pages/ExerciseInfo";
import {
  Routes as Switch,
  Route
} from "react-router-dom";
import WorkoutInfoPage from "./Pages/WorkoutInfo";
import CreateWorkoutPage from "./Pages/CreateWorkout";
import WorkoutsPage from "./Pages/Workouts";
import Navbar from "./templates/Navbar";
import Dashboard from "./Pages/Dashboard";
import ProgressPage from "./Pages/Progress";
import ProgressInfoPage from "./Pages/ProgressInfo";
import LoginPage from "./Pages/Login";
import CreateProgress from "./Pages/CreateProgress";

const App = ():JSX.Element  => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path = "/dashboard" element={<Dashboard />} />
        <Route path = "/progress" element={<ProgressPage />} />
        <Route path = "/progress/:id" element={<ProgressInfoPage />} />
        <Route path = "/progress/create" element={<CreateProgress />} />
        <Route path = "/exercises" element={<ExercisesPage />} />
        <Route path = "/exercises/:bodyPart" element={<ExercisesPage />} />
        <Route path = "/exercise/:id" element={<ExerciseInfoPage />} />
        <Route path = "/workouts" element={<WorkoutsPage />} />
        <Route path = "/workout/:id" element={<WorkoutInfoPage />} />
        <Route path = "/workout/create" element={<CreateWorkoutPage />} />
        <Route path = "/" element={<LandingPage />} />
        <Route path = "/login" element={<LoginPage />} />
      </Switch>
    </div>
  );
}

export default App;

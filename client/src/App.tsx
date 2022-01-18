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
import ProtectedRoute from "./components/ProtectedRoute";

const App = ():JSX.Element  => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        {/* Profile page : user activity and basic info */}
        {/* Dashboard is to be removed for now, convert it to landing page */}
        {/* Searching and sorting functionality for exercises , progress and workouts */}
        <Route path = "/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

        <Route path = "/progress" element={<ProtectedRoute element={<ProgressPage />} />} />
        <Route path = "/progress/:_id" element={<ProtectedRoute element={<ProgressInfoPage />} />} />
        <Route path = "/progress/create" element={<ProtectedRoute element={<CreateProgress />} />} />

        <Route path = "/exercises" element={<ExercisesPage />} />
        <Route path = "/exercises/:bodyPart" element={<ExercisesPage />} />
        <Route path = "/exercise/:id" element={<ExerciseInfoPage />} />

        <Route path = "/workouts" element={<ProtectedRoute element={<WorkoutsPage />} />} />
        <Route path = "/workout/:_id" element={<WorkoutInfoPage />} />
        <Route path = "/workout/create" element={<ProtectedRoute element={<CreateWorkoutPage />} />} />

        <Route path = "/" element={<LandingPage />} />
        <Route path = "/login" element={<LoginPage />} />
      </Switch>
    </div>
  );
}

export default App;

import WorkoutCard from "../components/WorkoutCard";

interface LandingPageProps {
    
}
 
const LandingPage: React.FC<LandingPageProps> = () => {
    return (
        <div>
            <h1>Fitness Tracker</h1>
            <p>Feature list : </p>
            <ol>
                <li>User profile model</li>
                <li>Add exercise</li>
                <li>create workout plan</li>
                <li>add progress of load in each exercise</li>
                <li>Create weekly plan using these workouts</li>
                <li>Progress tracker {"->"} takes photos and measurements, weight height BMI</li>
                <li>notify to fill in progress every week</li>
            </ol>
            <WorkoutCard id = {1} />
        </div>
    );
}
 
export default LandingPage;
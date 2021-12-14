import {Router} from 'express'
import { getWorkoutById, getWorkouts ,createWorkout,deleteWorkoutById, updateWorkoutById } from '../controllers/workouts'
const router = Router()

// Workout Routes
router.post('/workouts', createWorkout)
router.get('/workouts', getWorkouts)
router.get('/workouts/:_id', getWorkoutById)
router.delete('/workouts/:_id', deleteWorkoutById)
router.patch('/workouts/:_id', updateWorkoutById)

export default router
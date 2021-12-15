import {Router} from 'express'
import { getWorkoutById, getWorkouts ,createWorkout,deleteWorkoutById, updateWorkoutById } from '../controllers/workouts'
import { Auth, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/user'
import checkAuth from '../middleware/auth'
const router = Router()

// Workout Routes
router.post('/workouts', createWorkout)
router.get('/workouts', getWorkouts)
router.get('/workouts/:_id', getWorkoutById)
router.delete('/workouts/:_id', deleteWorkoutById)
router.patch('/workouts/:_id', updateWorkoutById)

// @ts-ignore
router.post('/users', checkAuth, Auth)
router.get('/users', getUsers)
router.get('/users/:_id', getUserById)
router.patch('/users/:_id', checkAuth, updateUserById)
router.delete('/users/:_id', deleteUserById) // add an admin middleware for this
 
export default router
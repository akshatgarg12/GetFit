import {Router} from 'express'
import { getWorkoutById, getWorkouts ,createWorkout,deleteWorkoutById, updateWorkoutById } from '../controllers/workouts'
import { Auth, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/user'
import checkAuth from '../middleware/auth'
import { imgUpload } from '../controllers/images'
import { createProgress, deleteProgressById, getProgressById, getProgresses, updateProgressById } from '../controllers/progress'
import { mark, getUserActivity, removeActivity } from '../controllers/activity'
const router = Router()

// Image
router.post('/image', imgUpload)

// Workout Routes
router.post('/workouts',checkAuth,createWorkout)
router.get('/workouts', checkAuth, getWorkouts)
router.get('/workouts/:_id', getWorkoutById)
router.delete('/workouts/:_id', checkAuth, deleteWorkoutById)
router.patch('/workouts/:_id',checkAuth,updateWorkoutById)

// Progress Routes
router.post('/progress',checkAuth,createProgress)
router.get('/progress', checkAuth, getProgresses)
router.get('/progress/:_id',checkAuth,getProgressById)
router.delete('/progress/:_id', checkAuth, deleteProgressById)
router.patch('/progress/:_id',checkAuth, updateProgressById)

// User Routes
router.post('/users', checkAuth, Auth)
router.get('/users', getUsers)
router.get('/users/:_id', getUserById)
router.patch('/users/:_id', checkAuth, updateUserById)
router.delete('/users/:_id', deleteUserById) // add an admin middleware for this

// Activity Routes
router.get("/activity", checkAuth, getUserActivity)
router.post("/activity", checkAuth, mark)
router.delete("/activity", checkAuth, removeActivity)

export default router
import Workout from '../../../models/workouts'
import {Request, Response} from 'express'

const getWorkouts = async (req:Request, res:Response) => {
    try{
        const workouts = await Workout.find()
        res.status(200).json({status:200, log:"Workouts fetched successfully", workouts })
    }catch(e:any){
        res.status(500).json({ status: '500', log: e.message })
    }
}

const getWorkoutById = async (req:Request, res:Response) => {
    try{
        const {_id} = req.params
        if(!_id){
            res.status(400).json({ status: '400', log: "workout id required" })
            return
        }
        const workout = await Workout.findOne({_id })
        res.status(200).json({status:200, log:"Workout fetched successfully", workout })
    }catch(e:any){
        res.status(500).json({ status: '500', log: e.message })
    }
}

const createWorkout = async (req:Request, res:Response) => {
    try{
        const {name, body_parts_targeted, notes, exercises} = req.body
        // get created_by from auth middleware 
        const workout = new Workout({
            name, 
            body_parts_targeted,
            notes,
            exercises,
        })
        const doc = await workout.save()
        res.status(200).json({status:200, log:"Workout successfully created", workout: doc })
    }catch(e:any){
        if(e.name === "ValidationError"){
            res.status(400).json({ status: '400', log: e.message })
        }else{
            res.status(500).json({ status: '500', log: e.message })
        }
    }
}

const deleteWorkoutById = async (req:Request, res:Response) => {
    try{
        const {_id} = req.params
        if(!_id){
            res.status(400).json({ status: '400', log: "workout id required" })
            return
        }
        const workout = await Workout.deleteOne({_id })
        res.status(200).json({status:200, log:"Workout deleted successfully" })
    }catch(e:any){
        res.status(500).json({ status: '500', log: e.message })
    }
}

const updateWorkoutById = async (req:Request, res:Response) => {
    try{
    const {_id} = req.params
    const args = req.body
    if(!_id){
        res.status(400).json({ status: '400', log: "workout id required" })
        return
    }
    await Workout.updateOne({_id}, args)
    const workout = await Workout.findOne({_id})
    res.status(200).json({status:200, log:"Workout updated successfully", workout})
    }catch(e:any){
        res.status(500).json({ status: '500', log: e.message })
    }

}

export {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    deleteWorkoutById,
    updateWorkoutById
}
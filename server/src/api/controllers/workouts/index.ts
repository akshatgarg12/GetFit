import Workout from '../../../models/workouts'
import User from '../../../models/user'
import {Request, Response} from 'express'

const getWorkouts = async (req:Request, res:Response) => {
    try{
        // @ts-ignore
        const user = req.user
        const created_by = await User.findOne({email : user.email})
        if(!created_by){
            res.status(403).json({ status: '403', log: "Unauthorized, create an account first" })
            return
        }
        const workouts = await Workout.find({created_by : created_by._id}, "name notes body_parts_targeted").populate("created_by", "name picture")
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
        const workout = await Workout.findOne({_id }).populate("created_by", "name picture email")
        res.status(200).json({status:200, log:"Workout fetched successfully", workout })
    }catch(e:any){
        res.status(500).json({ status: '500', log: e.message })
    }
}

const createWorkout = async (req:Request, res:Response) => {
    try{
        const {name, body_parts_targeted, notes, exercises} = req.body
        // @ts-ignore
        const {email} = req.user
        const created_by = await User.findOne({email})
        if(!created_by){
            res.status(403).json({ status: '403', log: "Unauthorized, create an account first" })
            return
        } 
        // get created_by from auth middleware 
        const workout = new Workout({
            name, 
            body_parts_targeted,
            notes,
            exercises,
            created_by : created_by._id
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
        const workout = await Workout.findOne({_id}).populate("created_by", "email")
        if(!workout){
            res.status(400).json({ status: '400', log: "Workout not found" })
            return
        }
        // @ts-ignore
        if(workout.created_by.email !== req.user.email) {
            res.status(403).json({ status: '403', log: "Unauthorized to delete this" })
            return
        }
        await Workout.deleteOne({_id })
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
    const workout = await Workout.findOne({_id}).populate("created_by", "email")
    if(!workout){
        res.status(400).json({ status: '400', log: "Workout not found" })
        return
    }
    // @ts-ignore
    if(workout.created_by.email !== req.user.email) {
        res.status(403).json({ status: '403', log: "Unauthorized to update this" })
        return
    }
    await Workout.updateOne({_id}, args)
    const updatedWorkout = await Workout.findOne({_id})
    res.status(200).json({status:200, log:"Workout updated successfully", workout:updatedWorkout})
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
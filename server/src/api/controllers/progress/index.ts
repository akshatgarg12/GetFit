import Progress from '../../../models/progress'
import User from '../../../models/user'
import {Request, Response} from 'express'

const getProgresses = async (req:Request, res:Response) => {
    try{
        // @ts-ignore
        const user = req.user
        const created_by = await User.findOne({email : user.email})
        if(!created_by){
            res.status(403).json({ status: '403', log: "Unauthorized, create an account first" })
            return
        }
        const progresses = await Progress.find({created_by : created_by._id}, "front_img back_img side_img createdAt updatedAt")
        res.status(200).json({status:200, log:"Progress fetched successfully", progresses })
    }catch(e:any){
        res.status(500).json({ status: '500', log: e.message })
    }
}

const getProgressById = async (req:Request, res:Response) => {
    try{
        const {_id} = req.params
        if(!_id){
            res.status(400).json({ status: '400', log: "progress id required" })
            return
        }
        const progress = await Progress.findOne({_id })
        res.status(200).json({status:200, log:"Progress fetched successfully", progress })
    }catch(e:any){
        res.status(500).json({ status: '500', log: e.message })
    }
}

const createProgress = async (req:Request, res:Response) => {
    try{
        const {front_img, side_img, back_img, measurements} = req.body
        // @ts-ignore
        const {email} = req.user
        const created_by = await User.findOne({email})
        if(!created_by){
            res.status(403).json({ status: '403', log: "Unauthorized, create an account first" })
            return
        } 
        // get created_by from auth middleware 
        const progress = new Progress({
            front_img, side_img, back_img, measurements,
            created_by : created_by._id
        })
        const doc = await progress.save()
        res.status(200).json({status:200, log:"Progress successfully created", progress: doc })
    }catch(e:any){
        if(e.name === "ValidationError"){
            res.status(400).json({ status: '400', log: e.message })
        }else{
            res.status(500).json({ status: '500', log: e.message })
        }
    }
}

const deleteProgressById = async (req:Request, res:Response) => {
    try{
        const {_id} = req.params
        if(!_id){
            res.status(400).json({ status: '400', log: "progress id required" })
            return
        }
        const progress = await Progress.findOne({_id}).populate("created_by", "email")
        if(!progress){
            res.status(400).json({ status: '400', log: "progress not found" })
            return
        }
        // @ts-ignore
        if(progress.created_by.email !== req.user.email) {
            res.status(403).json({ status: '403', log: "Unauthorized to delete this" })
            return
        }
        await Progress.deleteOne({_id })
        res.status(200).json({status:200, log:"Progress deleted successfully" })
    }catch(e:any){
        res.status(500).json({ status: '500', log: e.message })
    }
}

const updateProgressById = async (req:Request, res:Response) => {
    try{
    const {_id} = req.params
    const args = req.body
    if(!_id){
        res.status(400).json({ status: '400', log: "progress id required" })
        return
    }
    const progress = await Progress.findOne({_id}).populate("created_by", "email")
    if(!progress){
        res.status(400).json({ status: '400', log: "Progress not found" })
        return
    }
    // @ts-ignore
    if(progress.created_by.email !== req.user.email) {
        res.status(403).json({ status: '403', log: "Unauthorized to update this" })
        return
    }
  
    await Progress.updateOne({_id}, args)
    const updatedProgress = await Progress.findOne({_id})
    res.status(200).json({status:200, log:"Progress updated successfully", progress: updatedProgress})
    }catch(e:any){
        res.status(500).json({ status: '500', log: e.message })
    }

}

export {
   createProgress,
   getProgresses,
   getProgressById,
   deleteProgressById,
   updateProgressById
}
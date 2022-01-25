import User from '../../../models/user'
import Activity from '../../../models/activity'
import {Request, Response} from 'express'

const mark = async (req : Request, res : Response) => {
    try{
        // @ts-ignore
        const {email} = req.user;
        const user = await User.findOne({email})
        const created_by = user._id
        const {date, mark} = req.body; 
        const activity = new Activity({date , mark, created_by})
        await activity.save()
        res.status(200).json({status:200, log:"successfully marked activity in calender", activity })
    }catch(e : any){
        res.status(500).json({ status: '500', log: e.message })
    }
}

const removeActivity = async (req : Request, res : Response) => {
    try{
        // @ts-ignore
        const {email} = req.user;
        const user = await User.findOne({email})
        const created_by = user._id
        const {date} = req.body
        await Activity.deleteOne({created_by, date})
        res.status(200).json({status:200, log:"successfully deleted user activity"})
    }catch(e : any){
        res.status(500).json({ status: '500', log: e.message })
    }
}

const getUserActivity = async (req : Request, res : Response) => {
    try{
        // @ts-ignore
        const {email} = req.user;
        const user = await User.findOne({email})
        const created_by = user._id
        const activities = await Activity.find({created_by})
        res.status(200).json({status:200, log:"successfully fetched user activity", activities})
    }catch(e : any){
        res.status(500).json({ status: '500', log: e.message })
    }
}


export {
    mark,
    getUserActivity,
    removeActivity
}
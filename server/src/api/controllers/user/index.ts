import User from '../../../models/user'
import {Request, Response} from 'express'

const Auth = async (req : Request, res : Response) => {
    try{
        // @ts-ignore
        const user = req.user
        // if user exists send success, else create a new in db
        const {email} = user
        const userExists = await User.findOne({email})
        if(userExists){
            res.status(200).json({status:200, log : "User successfully logged in", user : userExists}) 
        }else{
            const newUser = new User(user)
            await newUser.save()
            res.status(200).json({status:200, log : "User successfully registered", user : newUser})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({status:500, log : "Server error"})
    }   
}

const getUsers = async (req : Request, res : Response) => {
    try{
        const users = await User.find()
        res.status(200).json({status:200, log : "Users fetched", users}) 
    }catch(e){
        console.log(e)
        res.status(500).json({status:500, log : "Server error"})
    }
}

const getUserById = async (req : Request, res : Response) => {
    try{
        const {_id} = req.params
        const user = await User.findOne({_id})
        res.status(200).json({status:200, log : "Users fetched", user}) 
    }catch(e){
        console.log(e)
        res.status(500).json({status:500, log : "Server error"})
    }
}
export {
    Auth,
    getUsers,
    getUserById
}
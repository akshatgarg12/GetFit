import express from 'express'
import {Request, Response} from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import { config } from "dotenv"
import DatabaseConnection from './config/mongodb'
config()
const app = express()
const PORT = process.env.PORT || 8080
import API from './api/routes'
import cloudinaryConfig from './config/cloudinary'

app.use(express.json({ limit: "40mb" }));
app.use(fileUpload());
app.use(express.urlencoded({extended:true}))

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use('/', API)
app.set("trust proxy", 1);

app.get('/', (req:Request, res:Response) => {
    // console.log(req.headers.authorization)
    res.send("Fitness Tracker API")
})


const serverStart = async () => {
  try{
    await DatabaseConnection()
    cloudinaryConfig()
    app.listen(PORT, () => {
      console.log(`server started at port:${PORT}`)
    })
  }catch(e){
    console.log(e)
  }
}

serverStart()
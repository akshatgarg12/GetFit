import cloudinary from 'cloudinary'
import {Request, Response} from 'express'

const imgUpload = async (req:Request, res:Response) => {
  try {
    console.log(Object.keys(req.body))
    const imgUpload = await cloudinary.v2.uploader.upload(req.body.file, {
      upload_preset: "fitness-tracker",
    });
    res.status(200).json({status : "200" , log:"img uploaded to cloudinary" , img_url : imgUpload.secure_url});
  } catch (e:any) {
    console.log(e.message);
    res.status(400).json({status : "400" , log: "error in uploading the image to cloudinary"});
  }
};

export {
    imgUpload
}

import cloudinary from 'cloudinary'
import {Request, Response} from 'express'

const imgUpload = async (req:Request, res:Response) => {
  try {
    console.log(Object.keys(req.body))
    const imgUpload = await cloudinary.v2.uploader.upload(req.body.file, {
      upload_preset: "fitness-tracker",
    });
    res.status(200).json({status : "200" , log:"img uploaded to cloudinary" , img_url : imgUpload.secure_url, public_id : imgUpload.public_id});
  } catch (e:any) {
    console.log(e.message);
    res.status(400).json({status : "400" , log: "error in uploading the image to cloudinary"});
  }
};

const deleteImg = async (url : string) => {
  if(!url) return
  const arr = url.split('/').slice(-2)
  const id = arr[1].split('.')[0]
  const public_url = arr[0] + "/" + id
  await cloudinary.v2.uploader.destroy(public_url , function(error,result) {
    console.log(result, error) 
  });
 }
 
export {
    imgUpload, 
    deleteImg
}

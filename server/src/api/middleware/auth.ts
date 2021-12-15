import firebase from "../../config/firebase";
import {Request, Response} from 'express'

const checkAuth = async (req:Request, res:Response, next:any) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(403).json({status:"403", log:"Unauthorized, please sign in"});
    return
  }
  // @ts-ignore
  firebase.auth().verifyIdToken(authToken).then((user: any) => {
      const {name, picture, email, firebase : {sign_in_provider : provider}, uid} = user
      const userData = {name, picture, email, provider, uid}
      // check if user exists in db
      // @ts-ignore
      req.user = userData;
      console.log(userData)
      next();
    }).catch(() => {
      res.status(403).json({status:"403", log:"Unauthorized, please sign in"});
    });
};

export default checkAuth;
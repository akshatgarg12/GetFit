import admin from "firebase-admin";
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDS || "")

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default firebase
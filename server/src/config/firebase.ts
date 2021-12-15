import admin from "firebase-admin";

var serviceAccount = require("./serviceAccountKey.json");

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default firebase
import mongoose from "mongoose";


const DatabaseConnection = async () => {
    const uri = process.env.NODE_ENV === "production" ? process.env.MONGO_PROD_URI : process.env.MONGO_DEV_URI
    try {
        // @ts-ignore
        await mongoose.connect(uri,{
            autoIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully")
      } catch (error) {
        throw error
    }
}

export default DatabaseConnection
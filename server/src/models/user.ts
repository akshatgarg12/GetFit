import mongoose from 'mongoose'

export enum Gender{
    MALE = "male",
    FEMALE = "female",
    OTHER = "others",
    NONE = "none"
}
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    picture : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
        // place a validator here
    },
    provider : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    height : {
        type : Number
    },
    weight : {
        type : Number
    },
    gender : {
        type : String,
        enum : Gender,
        default : Gender.NONE
    },
    // array of string saving the id of exercises
    exercises : {
        type : [String],
        default : [],
        required : true
    },
    workouts : {
        type : [ObjectId],
        default : [],
        ref : "Workout"
    },
    progresses : {
        type : [ObjectId],
        default : [],
        ref : "Progress"
    },
})

const User = mongoose.model("User", UserSchema)

export default User
import mongoose from 'mongoose'

const ExerciseSchema = new mongoose.Schema({
    eid : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    target : {
        type : String,
        required : true
    },
    bodyPart : {
        type : String,
        required : true
    },
    equipment : {
        type : String,
        required : true
    },
    gifUrl : {
        type : String,
        required : true
    },
})

const Exercise = mongoose.model("Exercise",ExerciseSchema)

export default Exercise

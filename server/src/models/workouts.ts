import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
const WorkoutExerciseSchema = new mongoose.Schema({
    eid : {
        type : String,
        required : true
    },
    name : { 
        type : String,
        required : true
    },
    progressive_overload : {
        type : String,
        default : ""
    },
    tips : {
        type : String,
        default : ""
    },
    reps : {
        type : Number,
        required : true,
        default : 12
    },
    sets : {
        type : Number,
        required : true,
        default : 1
    },
    target : {
        type : String,
        required : true
    },
})

const WorkoutSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    body_parts_targeted : {
        type : [String],
        default : [],
        required : true
    },
    notes : {
        type: String,
        default : ""
    },
    exercises : {
        type : [WorkoutExerciseSchema],
        required : true,
        default : []
    },
    created_by : {
        type : ObjectId,
        ref : "User",
        required : true
    }
})

const Workout = mongoose.model("Workout", WorkoutSchema)

export default Workout
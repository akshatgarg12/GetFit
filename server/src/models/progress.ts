import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const MeasurementSchema = new mongoose.Schema({
    bust : {
        type : Number
    },
    calves : {
        type : Number
    },
    chest : {
        type : Number
    },
    forearm : {
        type : Number
    },
    hips : {
        type : Number
    },
    thighs : {
        type : Number
    },
    arms : {
        type : Number
    },
    waist : {
        type : Number
    },
    units : {
        // probably make this an enum
        type : String,
        default : "inch",
        required : true
    }
})

const ProgressSchema = new mongoose.Schema({
    front_img : {
        type: String
    },
    side_img : {
        type: String
    },
    back_img : {
        type: String
    },
    measurements : {
        type : MeasurementSchema
    },
    weight : {
        type: Number,
    },
    height : {
        type : Number
    },
    createdBy : {
        type : ObjectId,
        required : true,
        ref : "User"
    }
}, {
    timestamps:true
})

const Progress = mongoose.model("Progress", ProgressSchema)

export default Progress

import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId


const ActivitySchema = new mongoose.Schema({
    date : {
        type : Date,
        default : new Date(),
        required : [true, "activity log date is required"]
    },
    created_by : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    mark : {
        type : String,
        enum : ["Absent", "Present"]
    }
})

const Activity = mongoose.model("Activity", ActivitySchema);

export default Activity;
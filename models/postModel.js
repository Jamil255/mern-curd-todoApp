import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    value: {
        type: String,
        require: true
    },
    userID: {
        type: String,
        required: true
    }
})
const postModel = mongoose.model("Todo", todoSchema)
export default postModel

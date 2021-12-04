const { Schema, model, Mongoose } = require("mongoose");

const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user_id: { 
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true }
},
{
    versionKey: false,
    timestamps: true
});

module.exports = model("post", postSchema);
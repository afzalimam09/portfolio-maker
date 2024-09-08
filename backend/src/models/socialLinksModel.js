import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

// Creating cab schema
const socialLinksSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    github: String,
    linkedin: String,
    leetcode: String,
    dribble: String,
});

// Creating model from schema
export default db.model("SocialLink", socialLinksSchema);

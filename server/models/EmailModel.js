import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    // Reference the User model in the 'from' field
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    starred: {
        type: Boolean,
        default: false,
    },
    bin: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Email = mongoose.model("Email", emailSchema);

export default Email;

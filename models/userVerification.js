import mongoose from "mongoose";

const userVerificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    uniqueString: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    }
},{timestamps: true});

export default mongoose.model('UserVerfication',userVerificationSchema);
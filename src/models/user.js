import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true, min: 3 },
    email: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        min: 3,
    },
    password: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        min: 6,
    },
    bought_tickets: {
        type: [String],
        default: [],
    },
    money_balance: {
        type: Number,
        required: true,
    }
});


export default mongoose.model("User", userSchema);
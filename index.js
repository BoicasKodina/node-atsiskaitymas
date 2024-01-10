import express from "express";
import ticketRouter from "./src/routes/ticket.js"
import userRouter from "./src/routes/user.js"
import mongoose from "mongoose";
import "dotenv/config";
const app = express()

app.use(express.json());

await mongoose.connect(
    process.env.MONGO_CONNECTION
)
.then(() => console.log("We are ONNNNNN!"))
.catch((err) => { console.log(err);});

app.use(ticketRouter);
app.use(userRouter);
app.listen(process.env.PORT)


// Ticket sutvarkytas cia jau.

// Liko USER
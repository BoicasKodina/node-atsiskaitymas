import mongoose from "mongoose";


const ticketSchema = mongoose.Schema({
    title: {type: String, required: true, min:2},
    ticket_price: {type: Number, required: true, min:2},
    from_location: {type: String, required: true, min:2},
    to_location: {type: String, required: true, min:2},
    to_location_photo_url: {type: String, required: true, min:2},

})

export default mongoose.model("Ticket", ticketSchema);


// Cia sutvarkyta
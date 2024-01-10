import TicketModel from '../models/ticket.js'
import UserModel from "../models/user.js";



//Pakeisti visus controllerius, pervadinti i tickets.

const GET_ALL_TICKETS = async (req, res) => {
   try {
   const tickets = await TicketModel.find();
   return res.status(200).json({ tickets: tickets})
   } catch(err) {
      console.log(err);
      return res.status(500).json({ message: "Oooops something went wrong with getting all tickets!"})
   }
}


const INSERT_TICKET =  async (req, res) => {
try {
const ticket = new TicketModel(
    {
       title: req.body.title,
       ticket_price: req.body.ticket_price,
       from_location: req.body.from_location,       
       to_location: req.body.to_location,
       to_location_photo_url: req.body.to_location_photo_url
    });
    const response = await ticket.save();
    return res.status(201).json({message: "Ticket added!", response: response})
   } catch(err) {
      console.log(err);
      return res.status(500).json({ response: "Oooops something went wrong!"})
   };
};





// const GET_RESOURCE_BY_ID = async (req, res) => {
//  const resource = await ResourceModel.findById( req.params.id );
//  return res.status(200).json({ resource: resource })
// }



// const UPDATE_RESOURCE_BY_ID = async (req, res) => {

//    try {
//    const resource = await ResourceModel.findOneAndUpdate (
//       { _id: req.params.id},
//       {...req.body},
//       {new: true},
//    );
 

//    return res.status(200).json({ resource: resource })
//    } catch(err) {
//       console.log(err);
//       return res.status(500).json({ response: "Oooops something went wrong!"})
//    }
// }

const BUY_TICKET = async (req, res) => {
   try {
      const user_id = req.body.user_id
      const ticket_id = req.body.ticket_id


       const user = await UserModel.findById(user_id);

       if (!user ) {
           return res.status(404).json({ message: "User not found." });
       };

       const ticket = await TicketModel.findById(ticket_id);

       if (!ticket ) {
           return res.status(404).json({ message: "Ticket not found." });
       };
      const ticketPrice = Number(ticket.ticket_price);

      if (user.money_balance < ticketPrice) {
         return res.status(400).json({ message: "Oops, you are out of money honey!" });
     }

     user.money_balance -= ticketPrice;
     user.bought_tickets.push(ticket_id);
     await user.save();
       await user.save();

       return res.status(200).json({ message: "You added a ticket!", user });
   } catch (err) {
       console.error(err);
       return res.status(500).json({ message: "Oooops, something is wrong!" });
   }
};





export { INSERT_TICKET, GET_ALL_TICKETS, BUY_TICKET }
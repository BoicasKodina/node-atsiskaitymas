import express from "express";
import { INSERT_TICKET, GET_ALL_TICKETS, BUY_TICKET } from '../controllers/ticket.js'
import auth from "../middleware/auth.js"
const router = express.Router();



router.get("/tickets", auth, GET_ALL_TICKETS );
router.post("/tickets", auth, INSERT_TICKET );
router.post("/buyticket", auth, BUY_TICKET)
//router.update("/tickets/:id", );



export default router;
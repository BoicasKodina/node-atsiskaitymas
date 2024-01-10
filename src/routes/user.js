import express from "express";
import {SIGN_UP, LOGIN, TOKEN_REFRESH, GET_ALL_USERS, GET_USER_BY_ID} from "../controllers/user.js"
const router = express.Router();
import auth from "../middleware/auth.js";

router.post("/user/signup", SIGN_UP);
router.post("/user/login", LOGIN);
router.post("/user/refreshtoken", auth, TOKEN_REFRESH)
router.get("/user/getallusers", auth, GET_ALL_USERS)
router.get("/user/:id", auth, GET_USER_BY_ID)
export default router;
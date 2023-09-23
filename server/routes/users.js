import express from "express";
import {verifyToken} from "../middleware/auth.js";
import{
    getUser,
    getUserFriends,
    addRemoveFriends,
} from "../controllers/users.js";

const router = express.Router();

//Read routes
router.post("/:id",verifyToken,getUser);
router.post("/:id/friends",verifyToken,getUserFriends);

//Update routes
router.patch("/:id/:friendId",verifyToken,addRemoveFriends);

export default router;
import { Router } from "express";
import { protect, restrictToAdmin } from "../auth/authController.js";
import {
    createUser,
    deleteMe,
    deleteUser,
    getAllUsers,
    getMe,
    getUser,
    getUserByURL,
    updateMe,
    updateUser,
} from "./userController.js";

const router = Router();

router.get("/getuser/:username", getUserByURL);

// Protect all the route after this point (only logged in user can access)
router.use(protect);

router.get("/me", getMe, getUser);

router.patch("/updateme", updateMe);

router.delete("/deleteme", deleteMe);

// Restrict to only admin after this point
router.use(restrictToAdmin);

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;

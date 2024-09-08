import { Router } from "express";

import authRoute from "./auth/authRoute.js";
import userRoute from "./user/userRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);

export default router;

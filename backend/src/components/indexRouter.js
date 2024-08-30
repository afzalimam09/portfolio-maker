import { Router } from "express";

import authRoute from "./auth/authRoute.js";
import postRoute from "./post/postRoute.js";
import userRoute from "./user/userRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/post", postRoute);
router.use("/users", userRoute);

export default router;

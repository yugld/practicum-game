import { Router } from "express";
import { userRatingRoutes } from "./userRating.route";

const router = Router();

userRatingRoutes(router);

export default router;

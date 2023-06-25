import { get, update, getTopFive } from "../controllers/userRatingController";
import { Router } from "express";

export const userRatingRoutes = (router: Router) => {
    const userRatingRouter = Router();
  
    userRatingRouter
        .post('/:userId(\\d+)', update)
        .get('/:userId(\\d+)', get)
        .get('/top', getTopFive);
  
    router.use('/api/userRating', userRatingRouter);
};

import { createUserRating, updateUserRating, getUserRating, getTopFiveUsers } from "../db/index";
import { Request, Response } from "express";


export async function update(request: Request, response: Response) {
    const userId = +request.params.userId;

    const userRating = await getUserRating(userId);
    
    if (!userRating) {
        const newRating = await createUserRating(userId);
        return response.json(newRating);
    } else {
        const updateRating = await updateUserRating(userId);
        return response.json(updateRating);
    }
}

export async function get(request: Request, response: Response) {
    const userId = +request.params.userId;

    const userRating = await getUserRating(userId);
    return response.json(userRating);
}

export async function getTopFive(_: Request, response: Response) {
    const userRatings = await getTopFiveUsers();
    return response.json(userRatings);
}

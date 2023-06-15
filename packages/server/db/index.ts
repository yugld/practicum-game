import { UserRating } from "./init";

export async function getUserRating(userId: number) {
    return UserRating.findOne({ where: { userId } });
}

export async function getTopFiveUsers() {
    return UserRating.findAll({ 
        limit: 5,
        order: [["winCount", "DESC"]]
    })
}

export async function createUserRating(userId: number) {
    return UserRating.create({ userId, winCount: 1 });
}

export async function updateUserRating(userId: number) {
    return UserRating.increment("winCount", { where: { userId } });
}

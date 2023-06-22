export interface LeaderboardSlice {
    topFiveUsersList: LeaderboardUser[] | null;
}

export interface LeaderboardUser {
    userId: number;
    winCount: number;
}

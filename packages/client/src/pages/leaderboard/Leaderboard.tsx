import { useEffect, useState } from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { unwrapResult } from '@reduxjs/toolkit'
import { useAppDispatch } from "../../store/store";
import { getTopFiveUsers } from "../../store/leaderboardSlice";
import { IUser } from "../../store/userSlice.types";
import { LeaderboardUser } from "../../store/leaderboardSlice.types";
import { getUserById } from "../../store/userSlice";
import { withAuthorizationCheck } from "../../utils/authorizedPage";
import { RESOURCE_URL } from "../../utils/axios";

import './leaderboard.less'

const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const [leaderboardUsers, setLeaderboardUsers] = useState<IUser[]>([]);

  useEffect(() => {
    dispatch(getTopFiveUsers())
      .then(unwrapResult)
      .then(async (users: LeaderboardUser[]) => await getLeaderboardUsersList(users));
  }, []);

  const getLeaderboardUsersList = async (topUsers: LeaderboardUser[]) => {
    const tmpUserList: IUser[] = [];

    for (const topUser of topUsers) {
      await dispatch(getUserById(topUser.userId)).then(unwrapResult).then((user) => {
        const leaderboardUser = {...user, winCount: topUser.winCount};
        tmpUserList.push(leaderboardUser);
      });
    }

    setLeaderboardUsers(tmpUserList);
  };

  return (
    <main className="page leaderboard">
      <div className="leaderboard__title">Лидерборд</div>
      <List sx={{ width: '100%' }}>
        {leaderboardUsers.map((user) => (
          <ListItem sx={{ display: 'flex', }}>
            <ListItemAvatar>
              <Avatar
                  src={user.avatar ? `${RESOURCE_URL}${user.avatar}` : ''}
                  sx={{ width: 56, height: 56, mr: 3 }}
                  alt="avatar"
              />
            </ListItemAvatar>
            <ListItemText primary={user.display_name || user.login} />
            <ListItemText style={{ display: 'flex', justifyContent: 'flex-end' }}
              primary={user.winCount}
            />
          </ListItem>
        ))}
      </List>
    </main>
  )
}

export default withAuthorizationCheck(Leaderboard);

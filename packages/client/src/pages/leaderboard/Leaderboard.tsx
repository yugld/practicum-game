import { Avatar, Icon, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React, { cloneElement } from "react";

import './leaderboard.less'

function generate(element: React.ReactElement) {
  return [0, 1, 2, 3, 5].map((value) =>
    cloneElement(element, {
      key: value,
    }),
  );
}

export default function Leaderboard() {
  return (
    <main className="page leaderboard">
      <div className="leaderboard__title">Лидерборд</div>
      <List sx={{ width: '100%' }}>
        {generate(
            <ListItem sx={{ display: 'flex', }}>
              <ListItemAvatar>
                <Avatar sx={{ width: 50, height: 50, mr: 3 }}>
                  <Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Имя"
                secondary='Фамилия'
              />
              <ListItemText style={{display:'flex', justifyContent:'flex-end'}}
                primary="100"
              />
            </ListItem>
        )}
      </List>
    </main>
  )
}


import { ReactComponentElement } from "react";
import { AppDispatch } from "../store/store";
import { NotFound } from "../pages/notFound/NotFound";
import { Home } from "../pages/home/Home";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import Profile from "../pages/profile/Profile";
import Leaderboard from "../pages/leaderboard/Leaderboard";
import Forum from "../pages/forum/Forum";
import Thread from "../pages/thread/Thread";
import GameRules from "../pages/gameRules/GameRules";
import GameStart from "../pages/gameStart/GameStart";
import GameNavigation from "../modules/gameNavigation/GameNavigation";

export type Route = {
    readonly path: string;
    readonly component: unknown;
    readonly exact?: boolean;
    readonly loader?: (dispatch: AppDispatch) => any
};

export const routes: Route[] = [
    {
        path: '*',
        exact: false,
        component: NotFound,
    },
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/login',
        exact: true,
        component: Login,
    },
    {
        path: '/registration',
        exact: true,
        component: Registration,
    },
    {
        path: '/profile',
        exact: true,
        component: Profile,
    },
    {
        path: '/leaderboard',
        exact: true,
        component: Leaderboard,
    },
    {
        path: '/forum',
        exact: true,
        component: Forum,
    },
    {
        path: '/thread',
        exact: true,
        component: Thread,
    },
    {
        path: '/rules',
        exact: true,
        component: GameRules,
    },
    {
        path: '/rooms',
        exact: true,
        component: GameStart,
    },
    {
        path: '/rooms/:roomId/*',
        component: GameNavigation,
    }
]

// // <Route path='*' element={ <NotFound /> } />
// // <Route path='/' element={ <Home /> } />
// // <Route path='/login' element={ <Login /> } />
// // <Route path='/registration' element={ <Registration /> } />
// // <Route path='/profile' element={ <Profile /> } />
// // <Route path='/leaderboard' element={ <Leaderboard /> } />
// // <Route path='/forum' element={ <Forum /> } />
// // <Route path='/thread' element={ <Thread /> } />
// // <Route path='/rules' element={ <GameRules /> } />
// // <Route path='/rooms' element={ <GameStart /> } />
// // <Route path='/rooms/:roomId/*' element={ <GameNavigation /> } />
// // </Routes>

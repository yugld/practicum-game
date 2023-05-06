import { authApi } from "../api/authApi";

type LoginPayload = {
    login: string;
    password: string;
};

// type RegisterPayload = {
//     first_name: string,
//     second_name: string,
//     login: string,
//     email: string,
//     password: string,
//     phone: string
// }

export const login = async (data: LoginPayload) => {
    return authApi
            .login(data)
            .catch(({ response }) => {
                const reason = response?.data?.reason;

                if (reason) {
                    console.log(reason);
                }
            });
};

// export const logout = async (dispatch: Dispatch<AppState>) => {
//     try {
//         dispatch({ isLoading: true });

//         await authAPI.logout();

//         dispatch({ isLoading: false, user: null });

//         window.router.go('/');
//     }
//     catch (e) {
//         console.log(e);
//     }
// };

// export const register: DispatchStateHandler<RegisterPayload> = async (dispatch, state, data) => {
//     try {
//         dispatch({ isLoading: true });

//         console.log(data);
//         const response = await authAPI.register(data);

//         if (apiHasError(response)) {
//             dispatch({ isLoading: false });
//             return;
//         }

//         const responseUser = await authAPI.me();

//         dispatch({ isLoading: false });

//         if (apiHasError(response)) {
//             dispatch(logout);
//             return;
//         }

//         dispatch({ user: transformUser(responseUser as UserDTO) });

//         window.router.go('/messenger');
//     }
//     catch (e) {
//         console.log(e);
//     }
// }
import { isAuth } from "./isAuthenticated";
import { Navigate } from 'react-router-dom';

export function withAuthorizationCheck(Component: React.FunctionComponent) {
    return function AuthorizedComponent({ ...props }) {
        if (!isAuth()) {
            return <Navigate replace to = "/login" />;
        } else {
            return <Component { ...props } />;
        }
    };
}

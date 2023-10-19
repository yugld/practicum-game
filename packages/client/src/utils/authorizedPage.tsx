import { useAuthentification } from "./useAuthentification";
import { Navigate } from 'react-router-dom';

export function withAuthorizationCheck(Component: React.FunctionComponent) {
    return function AuthorizedComponent({ ...props }) {
        if (!useAuthentification()) {
            return <Navigate replace to = "/login" />;
        } else {
            return <Component { ...props } />;
        }
    };
}

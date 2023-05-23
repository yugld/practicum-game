import { useSelector } from 'react-redux';
import { Store } from "../store/store.types";

export function useAuthentification(): boolean {
    const user = useSelector((state: Store) => state.user.user);
    return !!(user && user.id);
}

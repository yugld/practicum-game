export function isAuth(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
}
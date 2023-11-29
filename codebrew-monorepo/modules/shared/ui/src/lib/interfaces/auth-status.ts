type AuthStatus = 'pending' | 'success' | 'error';
export type LoginStatus = AuthStatus | 'authenticating';
export type RegisterStatus = AuthStatus | 'creating';

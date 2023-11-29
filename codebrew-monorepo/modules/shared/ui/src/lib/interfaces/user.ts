export interface User {
    id: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: any;
    created_at: Date;
    updated_at: Date;
    avatar: any;
};
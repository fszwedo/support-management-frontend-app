export interface User {
    name: string;
    email: string;
    password: string;
    type: UserType;
    created: Date;
    isActive: boolean
}

export enum UserType {
    User,
    Admin
}
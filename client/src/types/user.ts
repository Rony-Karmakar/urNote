export interface User {
    _id: string;
    username: string;
    email: string;
    fullname?: string;
    isVerified: boolean;

    // Optional fields sent by backend only when needed
    createdAt?: string;
    updatedAt?: string;
}

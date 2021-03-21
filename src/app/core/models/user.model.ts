export interface User {
    id?: string,
    name: string,
    email: string,
    phone?: number,
    password: string,
    passwordConfirmation?: string,
    rememberMe?: boolean,
    authdata?: string,
    isAdmin?: boolean
}
export interface User {
    _id?: string,
    name: string,
    email: string,
    password?: string,
    phone?: string,
    passwordConfirmation?: string,
    deliveryAddress?: string,
    birthDate?: string,
    documentNumber?: string,
    orders?: any,
    isAdmin?: boolean
    rememberMe?: boolean,
    authdata?: string,
}
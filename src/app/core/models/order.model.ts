export interface Order{
    _id: string
    creation_date?: any
    delivery_address: string
    paid_out: boolean
    clientId: string
    status: string //Confirmed - delivered - canceled - pending
    shopping_cart: any[]
}

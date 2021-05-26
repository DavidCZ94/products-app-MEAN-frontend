export interface Order{
    _id: string
    creation_date?: any
    delivery_address: string
    paid_out: boolean
    clientId: string
    clientName?: any
    status: string //Confirmed - delivered - canceled - pending
    shopping_cart: any[],
    updatedProducstInform?: any[]
}

export interface Product {
    _id?: string
    creating_date?: any
    sku?: string
    name: string
    brand: string
    class: string
    distributor: string
    stock: number
    position: string
    sale_price: number 
    cost_price: number
    tags?: string[]
}
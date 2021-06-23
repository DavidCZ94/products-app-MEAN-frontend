export interface Product {
    _id?: string
    creation_date?: any
    sku?: string
    name: string
    brand: string
    class: string
    qty?: number
    distributor: string
    stock: number
    position: string
    sale_price: number 
    cost_price: number
    tags?: string[],
    productPictures?: string[]
    isActive: boolean
}
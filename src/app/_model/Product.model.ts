import { FileHandle } from "./file-handle.model"

export interface Product{
    title: String,
    description: String,
    price: String,
    discountPrice: String,
    images: String,
    active: boolean,
    productImages: FileHandle[]
    category: {
        cId: string
    }
}
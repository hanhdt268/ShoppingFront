import { FileHandle } from "./file-handle.model"

export interface Product{
  pId: number
    title: String,
    description: String,
    price: String,
    discountPrice: String,
    images: String,
    active: boolean,
    productImages: FileHandle[]
  manufacturer: {
        mId: any,
    }
}

import { FileHandle } from "./file-handle.model"

export interface Product{
  pId: number
    title: String,
    description: String,
    price: number,
    discountPrice: number,
    images: String,
    active: boolean,
    productImages: FileHandle[]
  manufacturer: {
        mId: any,
    }
}

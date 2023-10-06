export default class ProductDTO {
    constructor(product) {
        this.name = product?.name ?? 'product'
        this.price = product?.price ?? 0
        this.photo = product?.photo ?? 'https://s3-eu-west-1.amazonaws.com/yi-files/content/2018/08/5b6e028ab0441.jpg'
        this.id = product?.id ?? null
        this.quantity = product?.quantity ?? 1
    }
}

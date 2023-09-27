import productModel from "./models/product.model.js";

export default class Product {
    getProducts = async (query) => {
        return await productModel.paginate(query.filter, {
            page: query.page,
            limit: query.limit,
            lean: true,
            sort: query.sortOption,
        })
    }
    getProductById = async (id) => {
        return await productModel.findById({id})
    }
    createProduct = async (product) => {
        return await new productModel(product).save()
    }
}
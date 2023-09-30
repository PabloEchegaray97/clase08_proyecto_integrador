import ProductModel from "./models/product.model.js";

export default class Product {
    getProducts = async (query) => {
        const result = await ProductModel.paginate(query.filter, {
            page: query.page,
            limit: query.limit,
            lean: true,
            sort: query.sortOption
        });
        result.prevLink = result.hasPrevPage ? `/products/?page=${result.prevPage}&limit=${query.limit}${query.priceQuery}` : '';
        result.nextLink = result.hasNextPage ? `/products/?page=${result.nextPage}&limit=${query.limit}${query.priceQuery}` : '';
        console.log(result);
        return result;
    }
    getProductById = async (id) => {
        return await ProductModel.findById({ _id: id })
    }
    createProduct = async (product) => {
        return await new ProductModel(product).save()
    }
}
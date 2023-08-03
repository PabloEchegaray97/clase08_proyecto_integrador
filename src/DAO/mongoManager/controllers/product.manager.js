import productModel from "../models/product.model.js";

const listProducts = async (req) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const result = await productModel.paginate({}, {
        page,
        limit,
        lean: true
    })
    result.prevLink = result.hasPrevPage ? `/products/?page=${result.prevPage}&limit=${limit}` : ''
    result.nextLink = result.hasNextPage ? `/products/?page=${result.nextPage}&limit=${limit}` : ''
    console.log(result);
    return result;
}

const getProduct = async (req) => {
    const id = req.params.id;
    const product = await productModel.findById({ _id: id });
    console.log(product);
    return product;
}
const createProduct = async (req) => {
    const productNew = req.body
    console.log({ productNew })

    const productGenerated = new productModel(productNew)
    await productGenerated.save()
    console.log({ productGenerated });
    return productGenerated;
}

const cloudProductManager = {
    listProducts,
    createProduct,
    getProduct
}

export default cloudProductManager; 
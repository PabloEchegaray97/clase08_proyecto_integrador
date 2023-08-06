import productModel from "../models/product.model.js";

const listProducts = async (req) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const { sort, priceMin, priceMax } = req.query;
    
    const filter = {};
    let priceQuery= '';
    let sortOption='price';
    if (priceMin !== undefined && priceMax !== undefined) {
        filter.price = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) };
        priceQuery = `&priceMin=${priceMin}&priceMax=${priceMax}`
    } else if (priceMin !== undefined) {
        filter.price = { $gte: parseInt(priceMin) };
        priceQuery = `&priceMin=${priceMin}`

    } else if (priceMax !== undefined) {
        filter.price = { $lte: parseInt(priceMax) };
        priceQuery = `&priceMax=${priceMax}`
    }
    if (parseInt(sort) === -1) {
        sortOption='-price';
    }
    const result = await productModel.paginate(filter, {
        page,
        limit,
        lean: true,
        sort: sortOption
    });
    result.prevLink = result.hasPrevPage ? `/products/?page=${result.prevPage}&limit=${limit}${priceQuery}` : '';
    result.nextLink = result.hasNextPage ? `/products/?page=${result.nextPage}&limit=${limit}${priceQuery}` : '';
    
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
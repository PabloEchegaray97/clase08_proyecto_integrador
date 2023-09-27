import { productService } from "../services/index.js";

export const getProducts = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const { sort, priceMin, priceMax } = req.query;
    const filter = {};
    let priceQuery = '';
    let sortOption = 'price';
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
        sortOption = '-price';
    }
    const result = await productService.getProducts({ page, limit, sortOption })
    result.prevLink = result.hasPrevPage ? `/products/?page=${result.prevPage}&limit=${limit}${priceQuery}` : '';
    result.nextLink = result.hasNextPage ? `/products/?page=${result.nextPage}&limit=${limit}${priceQuery}` : '';
    console.log(result);
    res.send({ status: 'success', payload: result })
}

export const getProductById = async (req,res) => {
    const id = req.params.id;
    const result = await productService.getProductById(id)
    res.send({status:'success', payload: result})
}

export const createProduct = async (req, res) => {
    const product = req.body
    const result = await productService.createProduct(product)
    res.send({status: 'success', payload: result})
}
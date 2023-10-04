import { productService } from "../services/index.js";

export const getProducts = async (req, res) => {
    const result = await productService.getProducts(req)
    res.send({status:'success', payload: result})
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
//test
export const deleteProduct = async (req, res) => {
    const {id} = req.params
    const result = await productService.deleteProduct(id)
    res.send({
        status: 'success', payload: result
    })
}

export const updateProduct = async (req, res) => {
    const {id} = req.params
    const newProduct = req.body
    const result = await productService.updateProduct(id, newProduct)
    res.send({
        status: 'success', payload: result
    })
}

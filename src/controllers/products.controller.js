import { productService } from "../services/index.js";
import { userService } from "../services/index.js";

export const getProducts = async (req, res) => {
    const result = await productService.getProducts(req)
    res.send({ status: 'success', payload: result })
}

export const getProductById = async (req, res) => {
    const id = req.params.id;
    const result = await productService.getProductById(id)
    res.send({ status: 'success', payload: result })
}

export const createProduct = async (req, res) => {
    const product = req.body
    const result = await productService.createProduct(product)
    res.send({ status: 'success', payload: result })
}
//test
export const deleteProduct = async (req, res) => {
    const { id } = req.params
    const result = await productService.deleteProduct(id)
    res.send({
        status: 'success', payload: result
    })
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const newProduct = req.body
    const result = await productService.updateProduct(id, newProduct)
    res.send({
        status: 'success', payload: result
    })
}

export const productOwner = async (req, res) => {
    const { userId, productId } = req.params
    const { method, newProduct } = req.body
    const user = await userService.getUserById(userId)
    const product = await productService.getProductById(productId)
    if (user.role != 'premium') {
        console.log('El usuario NO ES PREMIUM');
        return res.send({ status: 'failed', payload: 'El usuario NO posee el rol "premium"'})
    }
    console.log(user);
    console.log(product);
    console.log(method);
    console.log("------->",product.owner);
    console.log(user.id);
    const result = await productService.productOwner(product, method, newProduct, user._id)
    console.log(result);
    if(!result) {
        return res.send({ status: 'failed', payload: 'Error managing product' })
    }
    return res.send({status:'success', payload: result})

}
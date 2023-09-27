import ProductDTO from '../DAO/DTO/product.dto.js'

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }
    getProducts = async (query) => {
        return await this.dao.getProducts(query)
    }
    getProductByID = async (id) => {
        return await this.dao.getProductById(id)
    }
    createProduct = async(product) => {
        const newProduct = new ProductDTO(product)
        return await this.dao.createProduct(newProduct)
    }
}
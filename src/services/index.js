import {Product} from '../DAO/factory.js'
import ProductRepository from './products.repository.js'

export const productService = new ProductRepository(new Product())
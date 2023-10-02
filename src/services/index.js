import {Product, User} from '../DAO/factory.js'
import ProductRepository from './products.repository.js'
import UserRepository from './users.repository.js'

export const productService = new ProductRepository(new Product())
export const userService = new UserRepository(new User())
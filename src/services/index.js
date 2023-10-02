import {Product, User, Cart} from '../DAO/factory.js'
import ProductRepository from './products.repository.js'
import UserRepository from './users.repository.js'
import CartRepository from './carts.repository.js'

export const productService = new ProductRepository(new Product())
export const userService = new UserRepository(new User())
export const cartService = new CartRepository(new Cart())
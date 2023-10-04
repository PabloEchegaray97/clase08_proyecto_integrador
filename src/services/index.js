import {Product, User, Cart, Chat, Ticket} from '../DAO/factory.js'
import ProductRepository from './products.repository.js'
import UserRepository from './users.repository.js'
import CartRepository from './carts.repository.js'
import ChatRepository from './chats.repository.js'
import TicketRepository from './tickets.repository.js'

export const productService = new ProductRepository(new Product())
export const userService = new UserRepository(new User())
export const cartService = new CartRepository(new Cart())
export const chatService = new ChatRepository(new Chat())
export const ticketService = new TicketRepository(new Ticket())

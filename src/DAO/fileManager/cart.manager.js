import FileManager from "./file.manager.js";

export default class CartManager extends FileManager {
    constructor() {
        super('./carts.json')
    }
    create = async () => {
        const data = await this.get()
        if (data) {
            const newCart = {
                products: [],
                id: await this.getNextID()
            }
            data.push(newCart)
        } else {
            data = []
        }
        return await this.set(data)
    }
    getNextID = async () => {
        try {
            const list = await this.get();
            console.log(list);
            const nextID = (list.length > 0) ? list[list.length - 1].id + 1 : 1;
            return nextID;
        } catch (error) {
            console.log('Error getting next ID:', error);
            return null;
        }
    };
    addProduct = async (idc, idp) => {
        const cart = await this.getById(idc);
        console.log(cart);
        console.log(cart.products);

        const productIndex = cart.products.findIndex((product) => product.id === idp);

        if (productIndex !== -1) {
            // Si el producto ya existe en el carrito, actualizar la cantidad
            cart.products[productIndex].quantity++;
        } else {
            // Si el producto no existe en el carrito, agregarlo
            cart.products.push({
                id: idp,
                quantity: 1,
            });
        }

        return await this.update(cart);
    };

    list = async () => {
        return await this.get()
    }
}
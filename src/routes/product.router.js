import { Router } from "express";
import productModel from '../models/product.model.js'

const router = Router()

// Listar productos
router.get('/', async (req, res) => {

    // .lean().exec() para que handlebars reconozca el modelo
    const products = await productModel.find().lean().exec()
    
    res.render('list', { products })
})

// Pagina para crear productos (render HTML)\
router.get('/create', async (req, res) => {
    res.render('create', {})
})

// Crear producto POST 
router.post('/create', async (req, res) => {
    const productNew = req.body
    console.log({ productNew })

    const productGenerated = new productModel(productNew)
    await productGenerated.save()



    console.log({ productGenerated });

    res.redirect('/product/' + productGenerated._id)
})

// Borrar producto
router.get('/delete/:id', async (req, res) => {
    const id = req.params.id

    await productModel.deleteOne({ _id: id })
    res.redirect('/product')
})

// Obtener un product (name)
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const product = await productModel.findById({_id: id})
    console.log(product);
    res.render('one', product)
})



export default router


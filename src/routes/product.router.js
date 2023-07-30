import { Router } from "express";
import productModel from '../models/product.model.js'

const router = Router()


router.get('/', async (req, res) => {
    const products = await productModel.find().lean().exec()
    res.render('list', { products })
})

router.get('/create', async (req, res) => {
    res.render('create', {})
})

router.post('/create', async (req, res) => {
    const productNew = req.body
    console.log({ productNew })

    const productGenerated = new productModel(productNew)
    await productGenerated.save()



    console.log({ productGenerated });

    res.redirect('/product/' + productGenerated._id)
})

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id

    await productModel.deleteOne({ _id: id })
    res.redirect('/product')
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const product = await productModel.findById({_id: id})
    console.log(product);
    res.render('one', product)
})



export default router


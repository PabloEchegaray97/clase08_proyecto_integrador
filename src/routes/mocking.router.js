import { Router } from "express";
import { generateProduct } from "../utils.js";
const router = Router()

router.get('/', async (req, res) => {
    const products = []
    for (let i = 0; i <100; i++) {
        products.push(generateProduct())
    }
    res.send({status:'success', payload: products})
})

router.get('/loggertest', (req, res) => {
    req.logger.fatal(`Faltal error`)
    req.logger.error(`Server error`)
    req.logger.warning(`Must change this property`)
    req.logger.info(`Request sent`)
    req.logger.debug(`:D`)
    res.send('Logger Testing')
})
export default router;
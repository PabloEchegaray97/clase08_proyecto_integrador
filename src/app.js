import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import productRouter from './routes/product.router.js'

import __dirname from './utils.js'

const app = express()

// Carpeta publica
app.use('/public', express.static(__dirname + '/public'))

// Para traer info de post como JSON
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Configurar los motores de plantilla
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/product', productRouter)
app.get('/', (req, res) => res.send('It works great!!'))

mongoose.set('strictQuery', false)
const URL = "mongodb+srv://pae:crud1234@cluster0.qu1kfps.mongodb.net/"

mongoose.connect(URL, {
    dbName: 'ecommerce-clase8'
})
    .then(() => {
        console.log('DB connected!!')
        
        // Corremos el server
        const server = app.listen(8080, () => console.log('Listening...'))
        server.on('error', e => console.error(e))
    })
    .catch(e => {
        console.log("Can't connect to DB")
    })



import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import productRouter from './routes/product.router.js'
import {Server} from 'socket.io'
import __dirname from './utils.js'
import chat from './routes/chat.router.js'
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


mongoose.set('strictQuery', false)
const URL = "mongodb+srv://pae:crud1234@cluster0.qu1kfps.mongodb.net/"

const httpServer = app.listen(8080, () => console.log('Listening on 8080'));
const io = new Server(httpServer)

app.use('/', chat)

const messages = []

io.on('connection', socket => {
    console.log('New connection');
    socket.on('new', user => console.log(`${user} se acaba de conectar`))
    socket.on('message', data => {
        console.log(data);
        messages.push(data);
        io.emit('logs', messages)
    })
})

mongoose.connect(URL, {
    dbName: 'ecommerce-clase8'
})
    .then(() => {
        console.log('DB connected!!')
        // Corremos el server
        httpServer.on('error', e => console.error(e))
    })
    .catch(e => {
        console.log("Can't connect to DB")
    })


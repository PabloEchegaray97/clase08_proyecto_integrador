import express from 'express';
import handlebars from 'express-handlebars';

import productRouter from './routes/product.router.js';
import chatRouter from './routes/chat.router.js';
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/session.router.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import { Server } from 'socket.io';
import __dirname from './utils.js';

import cartModel from './DAO/mongo/models/cart.model.js';
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import config from './config/config.js'
import cookieParser from 'cookie-parser'
import jwtRouter from './routes/jwt.router.js'
//test
import productsRouter from './routes/products.router.js'
import usersRouter from './routes/users.router.js'
import cartsRouter from './routes/carts.router.js'
import chatsRouter from './routes/chats.router.js'
import tickesRouter from './routes/tickets.router.js'
import mockingRouter from './routes/mocking.router.js'
import errorHandler from './middlewares/error.js'
//
import { addLogger } from './middlewares/logger.js';
//
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'



const app = express();
app.use(addLogger)

const httpServer = app.listen(config.port, () => console.log('Listening on 8080'));
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + '/public'));


app.use(session({
  store: MongoStore.create({
      mongoUrl: config.dbUrl,
      dbName: 'ecommerce-clase8',
      mongoOptions: {
          useNewUrlParser:true,
          useUnifiedTopology:true
        },
      }),
      secret: 'secret',
      resave: true,
      saveUninitialized:true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
      }
    }))
    
    // Passport
    initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.io = io;
//
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentation of my_ecommerce ',
      description: 'lorem ipsum dolor ...'
    }
  },
    apis: [`${__dirname}/src/../docs/**/*.yaml`]
  }

const specs = swaggerJSDoc(swaggerOptions)

console.log(specs);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
//

app.use('/product', productRouter);

//tests refactor
app.use('/userstest', usersRouter)
app.use('/cartstest', cartsRouter)
app.use('/products', productsRouter)
app.use('/chatstest', chatsRouter)
app.use('/ticket', tickesRouter)

app.use('/mocking', mockingRouter)

app.use('/chat', chatRouter)
app.use('/cart', cartRouter)
app.use('/jwt', jwtRouter)

app.get('/health', (req,res) => {
  res.send('<h1>OK</h1>')
})
app.use('/api/session', sessionRouter)
app.use('/', viewsRouter)

app.use(errorHandler)

const carts = await cartModel.find()
console.log(JSON.stringify(carts, null, '\t'))

export default app;

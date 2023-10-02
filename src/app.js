import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
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

//
const app = express();
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

app.use('/product', productRouter);


app.use('/userstest', usersRouter)
app.use('/cartstest', cartsRouter)
app.use('/test', productsRouter)


app.use('/chat', chatRouter)
app.use('/cart', cartRouter)
app.use('/jwt', jwtRouter)

app.get('/health', (req,res) => {
  res.send('<h1>OK</h1>')
})
app.use('/api/session', sessionRouter)
app.use('/', viewsRouter)
const carts = await cartModel.find()
console.log(JSON.stringify(carts, null, '\t'))

export default app;

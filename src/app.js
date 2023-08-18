import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import productRouter from './routes/product.router.js';
import chatRouter from './routes/chat.router.js';
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
//
import sessionRouter from './routes/session.router.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'


import { Server } from 'socket.io';
import __dirname from './utils.js';
import productModel from './DAO/mongoManager/models/product.model.js';
import cartModel from './DAO/mongoManager/models/cart.model.js';

const app = express();
const httpServer = app.listen(8080, () => console.log('Listening on 8080'));
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + '/public'));

const URL = "mongodb+srv://pae:crud1234@cluster0.qu1kfps.mongodb.net/";
app.use(session({
  store: MongoStore.create({
      mongoUrl: URL,
      dbName: 'ecommerce-clase8',
      mongoOptions: {
          useNewUrlParser:true,
          useUnifiedTopology:true
      },
      ttl: 100
  }),
  secret: 'secret',
  resave: true,
  saveUninitialized:true
}))




mongoose.set('strictQuery', false);

mongoose.connect(URL, {
  dbName: 'ecommerce-clase8'
})
  .then(() => {
    console.log('DB connected!!');
    httpServer.on('error', e => console.error(e));
  })
  .catch(e => {
    console.log("Can't connect to DB");
  });

app.io = io;

app.use('/product', productRouter);
app.use('/chat', chatRouter);
app.use('/cart', cartRouter)
app.get('/health', (req,res) => {
  res.send('<h1>OK</h1>')
})
app.use('/api/session', sessionRouter)
app.use('/', viewsRouter)
const carts = await cartModel.find();
console.log(JSON.stringify(carts, null, '\t'))

export default app;

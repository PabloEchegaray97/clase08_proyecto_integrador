import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import productRouter from './routes/product.router.js';
import chatRouter from './routes/chat.router.js';
import cartRouter from './routes/cart.router.js'

import { Server } from 'socket.io';
import __dirname from './utils.js';

const app = express();
const httpServer = app.listen(8080, () => console.log('Listening on 8080'));
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + '/public'));

mongoose.set('strictQuery', false);
const URL = "mongodb+srv://pae:crud1234@cluster0.qu1kfps.mongodb.net/";

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
app.use('/carts', cartRouter)
export default app;

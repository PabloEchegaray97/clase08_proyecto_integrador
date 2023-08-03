import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import productRouter from './routes/product.router.js';
import chatRouter from './routes/chat.router.js';
import cartRouter from './routes/cart.router.js'

import { Server } from 'socket.io';
import __dirname from './utils.js';
import productModel from './DAO/mongoManager/models/product.model.js';

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


const result = await productModel.insertMany([
  {
    "id": 1,
    "name": "Smartphone X9",
    "price": 399.99,
    "photo": "https://via.placeholder.com/300/FF0000/FFFFFF/?text=Smartphone+X9"
  },
  {
    "id": 2,
    "name": "Laptop Ultrabook 360",
    "price": 799.00,
    "photo": "https://via.placeholder.com/300/00FF00/FFFFFF/?text=Laptop+Ultrabook+360"
  },
  {
    "id": 3,
    "name": "Tablet ProBook Z",
    "price": 249.50,
    "photo": "https://via.placeholder.com/300/0000FF/FFFFFF/?text=Tablet+ProBook+Z"
  },
  {
    "id": 4,
    "name": "Smartwatch TimeMaster",
    "price": 149.00,
    "photo": "https://via.placeholder.com/300/FFFF00/000000/?text=Smartwatch+TimeMaster"
  },
  {
    "id": 5,
    "name": "TV UltraHD 50\"",
    "price": 899.99,
    "photo": "https://via.placeholder.com/300/FF00FF/000000/?text=TV+UltraHD+50%22"
  },
  {
    "id": 6,
    "name": "Camera ProShot 200",
    "price": 299.95,
    "photo": "https://via.placeholder.com/300/00FFFF/000000/?text=Camera+ProShot+200"
  },
  {
    "id": 7,
    "name": "Headphones SoundWave",
    "price": 89.99,
    "photo": "https://via.placeholder.com/300/800000/FFFFFF/?text=Headphones+SoundWave"
  },
  {
    "id": 8,
    "name": "Smartphone Z12",
    "price": 449.00,
    "photo": "https://via.placeholder.com/300/808000/FFFFFF/?text=Smartphone+Z12"
  },
  {
    "id": 9,
    "name": "Laptop EliteBook 14",
    "price": 899.50,
    "photo": "https://via.placeholder.com/300/008080/FFFFFF/?text=Laptop+EliteBook+14"
  },
  {
    "id": 10,
    "name": "Tablet ProBook S",
    "price": 199.00,
    "photo": "https://via.placeholder.com/300/800080/FFFFFF/?text=Tablet+ProBook+S"
  },
  {
    "id": 11,
    "name": "Smartwatch TimeMaster 2",
    "price": 199.99,
    "photo": "https://via.placeholder.com/300/808080/FFFFFF/?text=Smartwatch+TimeMaster+2"
  },
  {
    "id": 12,
    "name": "TV UltraHD 65\"",
    "price": 1299.00,
    "photo": "https://via.placeholder.com/300/008000/FFFFFF/?text=TV+UltraHD+65%22"
  },
  {
    "id": 13,
    "name": "Camera ProShot 300",
    "price": 399.95,
    "photo": "https://via.placeholder.com/300/00C0C0/000000/?text=Camera+ProShot+300"
  },
  {
    "id": 14,
    "name": "Headphones BassBoost",
    "price": 119.00,
    "photo": "https://via.placeholder.com/300/C0C000/FFFFFF/?text=Headphones+BassBoost"
  },
  {
    "id": 15,
    "name": "Smartphone Z15",
    "price": 499.00,
    "photo": "https://via.placeholder.com/300/000080/FFFFFF/?text=Smartphone+Z15"
  },
  {
    "id": 16,
    "name": "Laptop EliteBook 15",
    "price": 999.50,
    "photo": "https://via.placeholder.com/300/8000FF/FFFFFF/?text=Laptop+EliteBook+15"
  },
  {
    "id": 17,
    "name": "Tablet ProBook X",
    "price": 249.00,
    "photo": "https://via.placeholder.com/300/C00000/FFFFFF/?text=Tablet+ProBook+X"
  },
  {
    "id": 18,
    "name": "Smartwatch TimeMaster 3",
    "price": 249.99,
    "photo": "https://via.placeholder.com/300/C0C0C0/000000/?text=Smartwatch+TimeMaster+3"
  },
  {
    "id": 19,
    "name": "TV UltraHD 75\"",
    "price": 1699.00,
    "photo": "https://via.placeholder.com/300/400000/FFFFFF/?text=TV+UltraHD+75%22"
  },
  {
    "id": 20,
    "name": "Camera ProShot 400",
    "price": 499.95,
    "photo": "https://via.placeholder.com/300/40C0C0/FFFFFF/?text=Camera+ProShot+400"

  },
  {
    "id": 21,
    "name": "Smartphone X9",
    "price": 399.99,
    "photo": "https://via.placeholder.com/300/FF0000/FFFFFF/?text=Smartphone+X9"
  },
  {
    "id": 22,
    "name": "Laptop Ultrabook 360",
    "price": 799.00,
    "photo": "https://via.placeholder.com/300/00FF00/FFFFFF/?text=Laptop+Ultrabook+360"
  },
  {
    "id": 23,
    "name": "Tablet ProBook Z",
    "price": 249.50,
    "photo": "https://via.placeholder.com/300/0000FF/FFFFFF/?text=Tablet+ProBook+Z"
  },
  {
    "id": 24,
    "name": "Smartwatch TimeMaster",
    "price": 149.00,
    "photo": "https://via.placeholder.com/300/FFFF00/000000/?text=Smartwatch+TimeMaster"
  },
  {
    "id": 25,
    "name": "TV UltraHD 50\"",
    "price": 899.99,
    "photo": "https://via.placeholder.com/300/FF00FF/000000/?text=TV+UltraHD+50%22"
  },
  {
    "id": 26,
    "name": "Camera ProShot 200",
    "price": 299.95,
    "photo": "https://via.placeholder.com/300/00FFFF/000000/?text=Camera+ProShot+200"
  },
  {
    "id": 27,
    "name": "Headphones SoundWave",
    "price": 89.99,
    "photo": "https://via.placeholder.com/300/800000/FFFFFF/?text=Headphones+SoundWave"
  },
  {
    "id": 28,
    "name": "Smartphone Z12",
    "price": 449.00,
    "photo": "https://via.placeholder.com/300/808000/FFFFFF/?text=Smartphone+Z12"
  },
  {
    "id": 29,
    "name": "Laptop EliteBook 14",
    "price": 899.50,
    "photo": "https://via.placeholder.com/300/008080/FFFFFF/?text=Laptop+EliteBook+14"
  },
  {
    "id": 30,
    "name": "Tablet ProBook S",
    "price": 199.00,
    "photo": "https://via.placeholder.com/300/800080/FFFFFF/?text=Tablet+ProBook+S"
  },
  {
    "id": 31,
    "name": "Smartwatch TimeMaster 2",
    "price": 199.99,
    "photo": "https://via.placeholder.com/300/808080/FFFFFF/?text=Smartwatch+TimeMaster+2"
  },
  {
    "id": 32,
    "name": "TV UltraHD 65\"",
    "price": 1299.00,
    "photo": "https://via.placeholder.com/300/008000/FFFFFF/?text=TV+UltraHD+65%22"
  },
  {
    "id": 33,
    "name": "Camera ProShot 300",
    "price": 399.95,
    "photo": "https://via.placeholder.com/300/00C0C0/000000/?text=Camera+ProShot+300"
  },
  {
    "id": 34,
    "name": "Headphones BassBoost",
    "price": 119.00,
    "photo": "https://via.placeholder.com/300/C0C000/FFFFFF/?text=Headphones+BassBoost"
  },
  {
    "id": 35,
    "name": "Smartphone Z15",
    "price": 499.00,
    "photo": "https://via.placeholder.com/300/000080/FFFFFF/?text=Smartphone+Z15"
  },
  {
    "id": 36,
    "name": "Laptop EliteBook 15",
    "price": 999.50,
    "photo": "https://via.placeholder.com/300/8000FF/FFFFFF/?text=Laptop+EliteBook+15"
  },
  {
    "id": 37,
    "name": "Tablet ProBook X",
    "price": 249.00,
    "photo": "https://via.placeholder.com/300/C00000/FFFFFF/?text=Tablet+ProBook+X"
  },
  {
    "id": 38,
    "name": "Smartwatch TimeMaster 3",
    "price": 249.99,
    "photo": "https://via.placeholder.com/300/C0C0C0/000000/?text=Smartwatch+TimeMaster+3"
  },
  {
    "id": 39,
    "name": "TV UltraHD 75\"",
    "price": 1699.00,
    "photo": "https://via.placeholder.com/300/400000/FFFFFF/?text=TV+UltraHD+75%22"
  },
  {
    "id": 40,
    "name": "Camera ProShot 400",
    "price": 499.95,
    "photo": "https://via.placeholder.com/300/40C0C0/FFFFFF/?text=Camera+ProShot+400"
  }
]
)



export default app;

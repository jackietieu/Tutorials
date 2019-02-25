const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user');

mongoose.connect(
  'mongodb://jtieu:' +
    process.env.MONGO_ATLAS_PW +
    '@node-rest-api-tutorial-shard-00-00-8tul3.mongodb.net:27017,node-rest-api-tutorial-shard-00-01-8tul3.mongodb.net:27017,node-rest-api-tutorial-shard-00-02-8tul3.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-api-tutorial-shard-0&authSource=admin&retryWrites=true',
  {
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;

// morgan is middleware for logging
app.use(morgan('dev'));

// middleware for parsing body of reqs
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods', 
      'PUT, POST, PATCH, DELETE, GET'
    );
    return res.status(200).json({});
  }

  // calling next allows other routes to take over req.method !== 'OPTIONS'
  next();
})

// anything with /products in the URL will be handled by productRoutes
// forwarded to productRoutes, therefore in productRoutes
// it only needs to be concerned with '/' because /products
// is detected and is being routed to productRoutes
// this is middleware for handling routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes)

// if no routes can handle the req, it goes to this
// error creator
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  // forwards the error instead of original request
  next(error);
})

// this will handle the previous error created,
// or handle all other errors created in the app
// for example, db errors will directly throw an error
// which wouldn't go to the error creator above
// but the thrown error will go directly to this
// middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
})

module.exports = app;
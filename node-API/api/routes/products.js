const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products')

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // accept a file
    cb(null, true);
  } else {
    // reject a file
    cb(null, false);
  }
}
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

//anything with /products in the URL will be 
//handled here via app.use in app.js
//it's forwarded to productRoutes
//therefore in this file it only needs
//to be concerned with '/' because /products
//is detected and is being routed here
//router.get('/products') would try to get '/products/products'

router.get('/', ProductsController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

router.get('/:productId', ProductsController.products_get_product)

router.patch('/:productId', checkAuth, ProductsController.products_update_product)

router.delete('/:productId', checkAuth, ProductsController.products_delete)

module.exports = router;
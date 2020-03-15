const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const productController = require('../controllers/products')
const options = {
    "caseSensitive": false,
    "strict": false
};
const router = express.Router(options);

router.get('/add-product', productController.getProduct);

router.post('/add-product', productController.postAddProduct);

router.get('/products/:productId', productController.getProductDetail);

router.get('/edit-product/:productId', productController.getEditProduct);

router.post('/edit-product', productController.postEditProduct);

router.post('/deleteProduct', productController.deleteProduct);

module.exports = router;
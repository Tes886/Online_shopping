const express = require('express');
const path = require('path');
const productController = require('../controllers/shop')

const router = express.Router();

router.get('/', productController.getAllProducts);

router.post('/add-to-cart',productController.addToCart);

router.get('/cart', productController.getCart);

router.post('/delete-cart', productController.deleteInCart);

// router.get('/error-demo', (req, res, next) => {
//     throw new Error('This is to test Error handling in express');
// });

module.exports = router;
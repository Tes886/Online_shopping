const Product = require('../models/product');
const User = require('../models/user');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('products', { 'products': products });
        })
        .catch(err => console.log(err));

}

exports.addToCart = (req, res, next) => {
    Product.findById(req.body.id)
        .then(product => {
            return req.user.addToCart(product);
        }) // we can use async/await as well
        .then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.prodId')
        .execPopulate()
        .then(user => {
            console.log(user)
            res.render('cart', {
                cart: user.cart,
                pageTitle: 'shopping cart Detail',
                path: '/cart',
                name: 'Tes Edit'
            })
        })
        .catch(err => console.log(err));
};

exports.deleteInCart = (req, res, next) => {
    req.user.removeFromCart(req.body.id)
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
};
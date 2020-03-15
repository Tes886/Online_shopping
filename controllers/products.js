const Product = require('../models/product');
const path = require('path');
const User = require('../models/user')

exports.getProduct = (req, res, next) => {
    res.render('add-product', {
        'pageTitle': 'Product Detail'
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description

    });
    product.save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
};


exports.getAllproducts = (req, res, next) => {
    Product.getAll()
        .then(products => {
            res.render('products', { 'prods': products });
        })
        .catch(err => console.log(err))
};

exports.getProductDetail = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            res.render('product-detail', { prod: product, pageTitle: 'Product Detail', path: '/admin', name: 'Tes' })
        })
        .catch(err => console.log(err))

};

exports.getEditProduct = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            res.render('edit-product', { prod: product, pageTitle: 'edit-product', path: '/admin', name: 'Tes Edit' });
        })
        .catch(err => console.log(err))

}
exports.postEditProduct = (req, res, next) => {
    Product.updateOne({ _id: req.body.id }, { $set: { title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description } })
        .then(result => {
            res.redirect('/');
        }).catch(err => console.log(err));
    // Product.findByIdAndUpdate(req.body.id)
    // .then(oldproduct => {
    //     oldproduct.title = req.body.title;
    //     oldproduct.imageUrl = req.body.imageUrl;
    //     oldproduct.price = req.body.price;
    //     oldproduct.description = req.body.description;
    //     return oldproduct.save();
    // })
    // .then(result => {
    //     res.redirect('/');
    // }).catch(err => console.log(err))

};

exports.deleteProduct = (req, res, next) => {
   // Product.deleteOne({_id: req.body.id })// delete one
    //Product.findByIdAndDelete(req.body.id) // find one and delete
    Product.findByIdAndRemove(req.body.id) // find and modify
        .then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err))

};




// exports.getCart = (req, res, next) => {

//     res.render('cart', { cart: User.getCart(), pageTitle: 'shopping cart Detail', path: '/cart', name: 'Tes Edit' })
// };
// exports.deleteInCart = (req, res, next) => {
//     Cart.delete(req.body.id);
//     res.redirect('/cart');
// }
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            prodId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        totalPrice: {
            type: Number
        }
    }
});

userSchema.methods.addToCart = function (product) {
    let cart = this.cart;

    const isExisting = cart.items.findIndex(objInItems => {
        return objInItems.prodId.toString() == product._id.toString()
    });
    if (isExisting >= 0) {
        cart.items[isExisting].qty += 1;
    } else {
        cart.items.push({ prodId: product._id, qty: 1 });
    }
    if (!cart.totalPrice) {
        cart.totalPrice = 0;
    }
    cart.totalPrice += product.price;
    return this.save();

}

userSchema.methods.removeFromCart = function (prodId) {
    const cart = this.cart;

    const isExisting = cart.items.findIndex(objInItems =>
        new String(objInItems.prodId).trim() == new String(prodId).trim());
    if (isExisting >= 0) {
        cart.items.splice(isExisting, 1);
        return this.save();
    }
}

module.exports = mongoose.model('User', userSchema);
























































// //const getDB = require('../util/database').getDB;
// const ObjectId = require('mongodb').ObjectId;
// const Product = require('./product');

// module.exports = class User {

//     constructor(_id, email, password, cart) {
//             this._id = _id,
//             this.email = email,
//             this.password = password,
//             this.cart = cart
//     }
//     save() {
//         const db = getDB();
//         return db.collection('users')
//             .insertOne(this)

//     };
//     static findById(productId) {
//         // return Products.filter(p => p.id == productId);
//         const db = getDB();
//         return db.collection('products')
//             .findOne({ _id: new ObjectId(productId) })

//     }
//     static findUserId(id) {
//         const db = getDB();
//         return db.collection('users')
//             .findOne({ _id: new ObjectId(id) })

//     }
//     addToCart(prodid) {
//         Product.findById(prodid)
//             .then(product => {

//                 if (this.cart == 'null') {
//                     this.cart = {
//                         products: [{ prod: product, qty: 1 }],
//                         totalPrice: product.price
//                     };
//                     console.log(this)
//                 } else {
//                     const existProductIndex = this.cart.products.findIndex(p => p._id == prodid);// checking existing products
//                     console.log('existproduct:', existProductIndex);
//                     if (existProductIndex >= 0) {// exist in cart already
//                         const existproduct = this.cart.products[existProductIndex];
//                         existproduct.qty += 1;

//                     } else {// not exist
//                         product.qty = 1;
//                         this.cart.products.push(product);
//                     }

//                     const temp = parseInt(this.cart.totalPrice);
//                      const productPrice = parseInt(product.price);
//                     this.cart.totalPrice =(temp + productPrice) ;
//                 }
//                 console.log('cart------', this.cart);
//                 const db = getDB()
//                 db.collection('users')
//                     .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: this.cart } })
//                     .then(result => {
//                         console.log(result.result);
//                     })
//                     .catch(err => console.log(err))

//             })
//             .catch(err => console.log(err))
//     }


//     static getCart(id) {
//         const db = getDB();
//         return db.collection('users')
//             .findOne({ _id: new ObjectId(id) })
//     }
//     static delete(productId) {
//         // const existing = cart.products.findIndex(p => p.id == productId);
//         const db = getDB()
//         return db.collection('products')
//             .deleteOne({ _id: new ObjectId(productId) })

//     }

// };



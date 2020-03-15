const User = require('../models/user');

exports.getSignUpForm = (req, res, next) => {
    res.render('signup', { path: '/signup', pageTitle: 'signUp', name: 'tes' });
}

exports.saveUser = (req, res, next) => {

    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    }).save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err));

}
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const shopRoutes = require('./routes/shop');
//const mongoconnect =  require('./util/database').mongoConnect;
const mongoose = require('mongoose');
const User = require('./models/user');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/mycss', express.static(path.join(__dirname, 'public', 'css')));
app.use('/img', express.static(path.join(__dirname, 'public', 'images')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

app.use((req, res, next) => {
    User.findById('5e68461cb86548448450e896')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
app.use("/", shopRoutes);
app.use(userRoutes);

mongoose.connect('mongodb://localhost:27017/Myonlineshooping', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on 3000.....')
        });
    })
    .catch(err => console.log(err));


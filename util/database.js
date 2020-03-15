// const MongoClient = require('mongodb').MongoClient;

// let _db; // private 

// const mongoConnect = function (callback) {
//     MongoClient.connect('mongodb://localhost:27017', {
//         useUnifiedTopology: true
//     })
//         .then(client => {
//             _db = client.db('Myonlineshopping');
//             callback();

//         })
//         .catch(err => {
//             console.group(err);
//             throw new Error('Db connections failed...');
//         })
// };

// const getDB = () => {
//     if(_db) {
//         return _db;
//     }else{
//         throw new Error('DB connect failed...')
//     };
// };


// exports.getDB = getDB;
// exports.mongoConnect = mongoConnect;
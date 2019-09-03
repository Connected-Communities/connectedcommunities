const MongoClient = require('mongodb').MongoClient;
const accountManager = require('./account-manager')

var db, filesUploaded;
MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true }, function (e, client) {
    if (e) {
        console.log(e);
    } else {
        db = client.db(process.env.DB_NAME);
        filesUploaded = db.collection('filesUploaded');
        // index fields 'user' & 'email' for faster new account validation //
        filesUploaded.createIndex({ user: 1, email: 1 });
        console.log('mongo :: connected to database :: "' + process.env.DB_NAME + '"');
    }
});


/////////////////////////////////////////
exports.uploadFile = function (newData, callback) {
    let findOneAndUpdate = function (data) {
        var o = {
            name: data.name,
            email: data.email,
            country: data.country
        }
        if (data.pass) o.pass = data.pass;
        accounts.findOneAndUpdate({ _id: getObjectId(data.id) }, { $set: o }, { returnOriginal: false }, callback);
    }
    if (newData.pass == '') {
        findOneAndUpdate(newData);
    } else {
        saltAndHash(newData.pass, function (hash) {
            newData.pass = hash;
            findOneAndUpdate(newData);
        });
    }
}
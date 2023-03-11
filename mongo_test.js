const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; // Replace [::1] with the IPv6 address of your MongoDB server

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    if(err){
        console.error('Failed to connect to MongoDB:', err);
    } else {
        console.log('Connected to MongoDB!');
    }
    
    //database name
    const dbName = 'myproject';
    const db = client.db(dbName);

    //database  Name
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    //insert into customer table
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err,result) {
        console.log('Document insert')
    });

    var customer = db
        .collection('customers')
        .find()
        .toArray(function(err,docs) {
            console.log('Collection:', docs);

            //clean up
            client.close();
        })
});
const MongoClient = require('mongodb').MongoClient;
const url = require('url');

const mongoAddress = 'mongodb://demo:pwd@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=demo';

const client = new MongoClient(mongoAddress,{ useNewUrlParser: true });

client.connect(function(err) {
    if(err) console.log(err);
    else console.log('连接成功!');
})

global._client = client;

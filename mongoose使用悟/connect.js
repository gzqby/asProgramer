const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://demo:pwd@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=aaas';

const client = new MongoClient(url,{ useNewUrlParser: true });

global._client = client;

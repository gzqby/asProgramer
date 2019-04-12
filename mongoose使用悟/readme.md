如果用node、mongodb做前端，其实用不到很多增删改查，于是我思考使用node mongodb drive,然后顺便根据我的mongoose使用体验封装一下drive,自用。  
整体逻辑如下：
```bash
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://demo:pwd@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=database';

const client = new MongoClient(url,{ useNewUrlParser: true });

function find(queryJson,func){
    let name = this.name;
    client.connect(function(err) {
        if(err){
            func(err);
        }else{
            client.db('nodercms').collection(name).find(queryJson).toArray(func)
        }
        client.close();
    });
} 

function Modal(name){
    this.name = name;
    this.find = find;
}

const navModal = new Modal('navs');
navModal.find({},(err,doc)=>{
    if(err) console.log();
    console.log(doc);        
})
```bash

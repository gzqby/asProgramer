const db = require('./connect');
const url = require('url');

const _connect = function(name,_func){
    global._client.connect(function(err) {
        let u = url.parse(_client.s.url),search = new URLSearchParams(u.search),
        authSource = search.get('authSource');
        if(err) return _func(err);
        else {
            return _func(null,global._client.db(authSource).collection(name))
        }
    });
}

class parentModel{
    constructor(props){
        this.name = props;
    }
    find(queryJson,options,func){
        if(typeof options == 'function'){
            func = options;
            options = {};
        }
        let name = this.name,
        _funca = (err,docs)=>{
            if(err) func(err);
            else func(err,docs);
        }
        _connect(name,function(err,collection) {
            if(err){
                func(err);
            }else{
                if(options) collection.find(queryJson,options).toArray(_funca);
                else collection.find(queryJson).toArray(_funca)
            }
        });
    } 
}

class Model extends parentModel{
}
var m = new Model('navs');
m.find({},function(err,docs){
    if(err) console.log(err);
    else console.log(docs[0]._id);
})
module.exports = Model;

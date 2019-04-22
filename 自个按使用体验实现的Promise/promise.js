const axios = require('axios');
const PENDING = 'pending',FULFILLED='fulfilled',REJECTED='rejected';
class ZPromise{
    constructor(func){
        this.state = PENDING;
        this.result={
            _resolve:null,
            _reject:null,
            _finally:null
        };
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        this.finally = this.finally.bind(this);
        func(this.resolve,this.reject);
    }
    resolve(val){
        this.result._resolve ? this.result._resolve(val) : null ;
        this.state = FULFILLED;
        this.result._finally ? this.result._finally(val) : null;
    }
    reject(err){
        this.result._reject ? this.result._reject(err) : null ;
        this.state = REJECTED;
        this.result._finally ? this.result._finally(err) : null;
    }
    listen(key,func){
        this.result[key] = func;
    }
    then(_resolveFunc,_rejectFunc){
        this.listen('_resolve',function(res){
            _resolveFunc(res);
        })
        if(_rejectFunc){
            this.listen('_reject',function(err){
                _rejectFunc(err);
            })
        }
        return this;
    }
    catch(_rejectFunc){
        this.result._reject ? null :
        this.listen('_reject',function(err){
            _rejectFunc(err);
        });
    }
    finally(_finallyFunc){
        this.listen('_finally',function(){
            _finallyFunc();
        });
    }
    static all(PromiseArr){
        let temArr = [];
        PromiseArr.forEach(element => {
            element.then(function(res){
                temArr.push(res);
            }).finally(function(){
                if(temArr.length===PromiseArr.length){
                    console.log(temArr);
                }
            })
        });
    }
}


const z = new ZPromise(function(resolve,reject){
    axios({
        url:'http://47.105.232.102:2000/getnav',
        method:'get'
    })
    .then(function(res){
        resolve(res.data[1])
    })
})
const g = new ZPromise(function(resolve,reject){
    axios({
        url:'http://47.105.232.102:2000/getnav',
        method:'get'
    })
    .then(function(res){
        resolve(res.data[0])
    })
})
ZPromise.all([z,g]);

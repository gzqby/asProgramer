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
        return this;
    }
    finally(_finallyFunc){
        this.listen('_finally',function(){
            _finallyFunc();
        });
    }
    static all(PromiseArr){
        let temArr = [],flag=0;
        return new ZPromise(function(resolve,reject){
            PromiseArr.forEach((element,index) => {
                return element.then(function(res){
                    temArr[index] = res;
                    // 这个为什么使用标识不是最后判断长度或者验证数组中每个值，
                    // 因为可能真的没有值或者'',null,undefined;
                    flag++;
                })
                .catch(function(err){
                    reject(err)
                })
                .finally(function(){
                    if(temArr.length===flag){
                        resolve(temArr);
                    }
                })
            });
        })
    }
    static resolve(res){
        return new ZPromise(function(resolve){
            setTimeout(() => {
                resolve(res)
            });
        })
    }
    static reject(res){
        return new ZPromise(function(resolve,reject){
            setTimeout(() => {
                reject(res)
            });
        })
    }
    static race(PromiseArr){
        let tem = null;
        return new ZPromise(function(resolve,reject){
            PromiseArr.forEach((element,index) => {
                element.then(function(res){
                    if(!tem){
                        tem = tem ? null : res;
                        resolve(tem);
                    }
                })
            });
        })
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
    setTimeout(()=>{
        resolve(1)
    },0)
})

const o = ZPromise.resolve(null);


ZPromise.all([z,g,o]).then(res=>console.log(res));

Function.prototype.cal = function(obj){
    obj._func = this;
    let _arguments = Array.from(arguments).slice(1);
    obj._func(..._arguments)
}
const b = {
    name:'zgo'
}
function a(d,r){
    console.log(this.name,d,r);
}

a.cal(b,1,'undefined')

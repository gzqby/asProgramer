class parentModel{
    constructor(props){
        this.name = props;
    }
    find(queryJson,func){
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
}

class Model extends parentModel{
    constructor(props){
        super(props);
    }
}

module.exports = Model;

const navModel = new Model('navs');

console.log(navModel.find);
console.log(navModel);

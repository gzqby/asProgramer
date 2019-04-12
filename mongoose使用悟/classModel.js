class parentModel{
    constructor(props){
        this.name = props;
    }
    find(queryJson,options,func){
        let name = this.name;
        if(func){
            func = func;
        }else{
            func = options;
            options = null;
        }
        global._client.connect(function(err) {
            if(err){
                func(err);
            }else{
                if(options) global._client.db('nodercms').collection(name).find(queryJson,options).toArray(func);
                else global._client.db('nodercms').collection(name).find(queryJson).toArray(func)
            }
            global._client.close();
        });
    } 
}

class Model extends parentModel{
    constructor(props){
        super(props);
    }
}

module.exports = Model;

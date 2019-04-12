class parentModel{
    constructor(props){
        this.name = props;
    }
    find(queryJson,func){
        let name = this.name;
        global._client.connect(function(err) {
            if(err){
                func(err);
            }else{
                global._client.db('nodercms').collection(name).find(queryJson).toArray(func)
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

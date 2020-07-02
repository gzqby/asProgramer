
const Model = require('./classModal');
const client = require('./connect');
const navsModel = new Model('navs');
navsModel.find({},function(err,doc){
      if(err) console.log(err);

      console.log(doc);

  })

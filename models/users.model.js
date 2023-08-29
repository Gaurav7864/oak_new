let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
let schema = new mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
}, {timestamp : true, strict : false, autoIndex : true});
schema.plugin(mongoosePaginate);
module.exports = schema;
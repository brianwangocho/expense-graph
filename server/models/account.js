const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AccountSchema =  new Schema({
    tag:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    amount:{
        type:Number,
        require:true
    }
    
});
module.exports = mongoose.model('account',AccountSchema);
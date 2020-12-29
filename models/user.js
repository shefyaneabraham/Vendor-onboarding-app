var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name:{type: String, required: true}
},
{
    timestamps:{createdAt: 'createdDate',updatedAt:'updatedDate'}
});

module.exports =mongoose.model("User",userSchema);
var mongoose = require('mongoose')

var actionSchema = new mongoose.Schema({
    _id:{type: Number, required:true},
    name:{type: String, required: true}
}
);

module.exports =mongoose.model("Action",actionSchema);
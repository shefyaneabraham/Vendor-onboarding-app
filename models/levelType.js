var mongoose = require('mongoose')

var levelTypeSchema = new mongoose.Schema({
    _id:{type: Number, required:true},
    name:{type: String, required: true}
});

module.exports =mongoose.model("LevelType",levelTypeSchema);
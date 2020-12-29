var mongoose = require('mongoose')

var workFlowSchema = new mongoose.Schema({
    name:{type: String, required: true}
},
{
    timestamps:{createdAt: 'createdDate',updatedAt:'updatedDate'}
});

module.exports =mongoose.model("WorkFlow",workFlowSchema);
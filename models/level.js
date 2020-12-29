var mongoose = require('mongoose')

var levelSchema = new mongoose.Schema({
    levelType:{type: Number, ref:'LevelType',required:true},
    approver:{type: mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    workflowId:{type: mongoose.Schema.Types.ObjectId, ref:'WorkFlow',required:true},
    approvalAction:{type: Number, ref:'Action'},
    predecessor:{type: mongoose.Schema.Types.ObjectId, ref:'Level'},
    workflowStatus:{type: String, default:"Active"}
},
{
    timestamps:{createdAt: 'createdDate',updatedAt:'updatedDate'}
});

module.exports =mongoose.model("Level",levelSchema);
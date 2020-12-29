var express = require("express");
const router= express.Router({mergeParams:true});
var controller = require('../controllers/levels');

//Add level type and user to a level in the workflow
router.post("/addLevelandApprover",async function(req,res,next){
    await controller.postlevelandapprover(req,res,next);
});

//Create workflow

router.post("/addWorkflow",async function(req,res,next){
    await controller.postworkflow(req,res,next);
})

// GET level by workflow and user for frontend
router.get("/levelByWorkflowAndApprover/:workflowId/:approverId",async function(req,res,next){
    await controller.getlevel(req,res,next);
})

// Add Approval Action
router.put("/updateAction/:levelId",async function(req,res,next){
    await controller.putlevel(req,res,next);
})

//Get final result
router.get("/finalResultByWorkflow/:workflowId",async function(req,res,next){
    await controller.getresult(req,res,next);
})

module.exports=router;
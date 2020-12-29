var mongoose = require("mongoose")
var workflow=  require('../models/workflow')
var level =require('../models/level');
var levelType = require("../models/levelType");
var levelService = require('../services/level');

module.exports ={

    postlevelandapprover: async function(req,res,next){
        let paylod= req.body;
        level.create(paylod,(err, newLevel)=>{
            if(err) return next(err);
            res.json(newLevel);
        })
    },

    postworkflow:async function(req,res,next){
        let paylod= req.body;
        workflow.create(paylod,(err, newWorkflow)=>{
            if(err) return next(err);
            res.json(newWorkflow);
        })
    },

    getlevel: async function(req,res,next){
        level.find({"workflowId":req.params.workflowId, "approver":req.params.approverId},null,{sort:{"createdDate":1}},(err,data)=>{
            if(err) return next(err);
            res.json(data);
        })
    },

    putlevel: async function(req,res,next){
        level.find({"_id":req.params.levelId},null,{sort:{"createdDate":1}},(err,levelData)=>{
            levelService.addlink(levelData[0].workflowId);
            console.log("levelData._id",levelData);
            //levelService.sequence(levelData.workflowId,levelData._id);
            this.sequence(levelData[0].workflowId,levelData[0]._id).then(results=>{;
                console.log("result",results);
                if(results==1){
                    level.findOneAndUpdate({"_id":req.params.levelId},{$set:{"approvalAction":req.body.approvalAction}},{new:true},(err, updatedLevel)=>{
                        if(err) return next(err);
                        console.log("updatedLevel 1",updatedLevel);
                        levelService.status(updatedLevel).then(item=>{
                            res.json(item);
                        })
                        
                        
                        
                    })
                }
                else{
                    console.log("error");
                    res.send("Cannot add");
                }
            })
        })
            
    },
    
    sequence: async function(workflowId, levelId){
        
        console.log("workflowId", workflowId);
        console.log("levelId", levelId);
        let promise = new Promise((resolve,reject)=>{
        var result;    
        level.find({'workflowId':workflowId},null,{sort:{'createdDate':1}},(err, data)=>{
            //console.log("data",data);
            
            for(let i=0; i<data.length; i++){
                // console.log("inside for");
                if(data[i]._id.equals(levelId)){
                    let pred= data[i].predecessor;
                    console.log("pred",pred);
                    level.find({'_id':pred},(err, item)=>{
                        
                    if(item[0].approvalAction===2){                                                //if predecessor action terminated
                            result= 0;
                             
                    }    
                        
                    
                    else if(data[i].levelType===1 && data[i].predecessor!= undefined){ 
                        console.log("inside else if");   //if sequential and predecessor present
                       
                            console.log("item",item); 
                            if(item[0].approvalAction!= undefined){ 
                                //console.log("inside if");                   //if approval action present in predecessor
                                result =1;
                                
                            }
                            else {         
                                //console.log("inside else 1");
                                //var result =0;                                         //approval action not present
                                result =0;
                                
                            }

                        //})
                    }
                    else{        
                        //console.log("inside else 2");                                 //if any other type other than sequential
                       result =1;
                    
                    }
                    resolve(result);
                })
                
            }
        }
        
    });
        
    })
    let result= await promise;
    console.log("result end",result);
        return result;
    },

    getresult: async function(req,res,next){                     //Get final result
        var status;
        level.find({"workflowId":req.params.workflowId},null,{sort:{"createdDate":1}},(err,levelData)=>{
        let ter= levelData.find(item=> item.approvalAction ==2);
        console.log("eee",ter);
        if(ter !=undefined){
            res.json("This workflow was terminated");
        }
        else{
        res.json("This workflow was executed succesfully");
        }
        
        })
    }


}
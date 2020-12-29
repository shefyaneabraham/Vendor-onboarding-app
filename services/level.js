var mongoose = require("mongoose")
var workflow=  require('../models/workflow')
var level =require('../models/level');
const levelType = require("../models/levelType");

module.exports ={

    addlink: async function(workflowId){
        level.find({'workflowId':workflowId},null,{sort:{'createdDate':1}},(err, data)=>{
            // data[0].predecessor=" ";
            // console.log(data);
            level.findOneAndUpdate({"_id":data[0]._id},{$set:{"predecessor":data[0].predecessor}},{new:true},(err,updatedLevel)=>{
                //console.log("updatedLevel",updatedLevel);
            })
            for(let i=1; i<data.length; i++){
               data[i].predecessor= data[i-1]._id; 
               level.findOneAndUpdate({"_id":data[i]._id},{$set:{"predecessor":data[i].predecessor}},{new:true},(err,updatedLevel)=>{
                   //console.log("updatedLevel",updatedLevel);
               })  
            }
        })
    },

    // sequence: function(workflowId, levelId){
    //     //var result;
    //     //let promise = new Promise((resolve,reject)=>{
    //     workflow.find({'workflowId':workflowId},null,{sort:{'createdDate':1}},(err, data)=>{
    //         console.log("data",data);
    //         for(let i=0; i<data.length; i++){
    //             if(data[i]._id===levelId){
    //                 let pred= data[i].predecessor;
    //                 level.find({'levelId':pred},(err, item)=>{
    //                     var result = null;
    //                 if(item.approvalAction===2){                                                //if predecessor action terminated
    //                         return 0;
    //                          //console.log("result 1",result);
    //                         //resolve(result);
    //                 }    
                        
    //                 //})
    //                 else if(data[i].levelType===1 && data[i].predecessor!= undefined){    //if sequential and predecessor present
    //                     // pred =data[i].predecessor;
    //                     // level.find({'levelId':pred},(err, item)=>{
    //                         if(item.approvalAction!= undefined){                     //if approval action present in predecessor
    //                             return 1;
    //                             //resolve(result);
    //                         }
    //                         else {                                                  //approval action not present
    //                             return 0;
    //                             //resolve(result);
    //                         }

    //                     //})
    //                 }
    //                 else{                                                           //if any other type other than sequential
    //                     return 1;
    //                 //resolve(result);
    //                 }

    //             })

    //         }
    //     }
    // })
        
    // // })
    // // result= await promise;
    // //console.log("result end",result);
    //     //return result;
    // },
    status: async function(updatedLevel){
        let wStatus;
        if(updatedLevel.approvalAction===1){
            wStatus="Active";
        }
        else if(updatedLevel.approvalAction===3){
            wStatus= "Active"
        }
        else{
            wStatus= "Terminated"
        }
        let promise = new Promise((resolve, reject)=>{
            var result=[];
        level.findOneAndUpdate({"_id":updatedLevel._id},{$set:{"workflowStatus":wStatus}},{new:true},(err,updatedLevel)=>{
            result = updatedLevel;
            resolve(result);
        })
    })
    let result= await promise;
    return result;
    }
}


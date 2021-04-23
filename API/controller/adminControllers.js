const mongoose=require('mongoose');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../moduls/admin');
const User = require("../moduls/user");



exports.signUpAdmin= (req,res,next)=>{
  
    Admin.find({adminName:req.body.adminName})
    .exec()
    .then(
         admin=>{
             if(admin.length>=1){
                 return res.status(409).json({
                     message:"adminName olrady exists"
                 });
             }else{
                const saltRounds = 10;
                const pass = req.body.adminPassword;
                 bcrypt.hash(req.body.adminPassword,10,(err,hash)=>{
                        
                     if(err){
                         return res.status(500).json({
                             failedAddAdmin:err.message
                         });
                     }else{
                         const adminSignUp = new Admin({
                             _id: new mongoose.Types.ObjectId(),
                             adminName: req.body.adminName,
                             adminPassword:hash
                          });
                          adminSignUp.save()
                          .then(result=>{
                             console.log(result);
                             res.status(201).json( {
                                  message:'Admain created',
                                });
                          })
                          .catch(result=>{
                             console.log(result);
                             res.status(500).json({
                                 error:result.message,
                                 message:'admin did not created'
                             });
                          });
          
                     }
         
                 });
             }
 
         }
    )
    .catch(err=>{
     console.log(err);
     res.status(500).json({
         error:err,
         message:"did not sign up"
     
     });
    });
 }


 exports.LogInAdmin=(req,res,next)=>{
    Admin.find({adminName: req.body.adminName})
        .exec()
        .then(admin=>{
            if(admin.length <1){
                return res.status(401).json({
                    message: "Admin not found , admin doesn\'t exist"
                });
            }
            bcrypt.compare(req.body.adminPassword , admin[0].adminPassword, (err,result)=>{
                if(err){
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if(result){
                   const token= jwt.sign({
                        _id:admin[0]._id,
                        adminName: admin[0].adminName,
                        adminPassword : admin[0].adminPassword
                
                    },process.env.JWT_KEY,
                    {
                        expiresIn:"24h"

                    },

                    );
                    return res.status(201).json({
                        message: "Auth successful",
                        token:token,
                        adminName: admin[0].adminName,
                        adminPassword : admin[0].adminPassword,
 
                    }); 
                }
                res.status(401).json({
                    message: "Auth failed, password did not match"
                });
            });

        })
        .catch(reson=>{
            res.status(500).json({
                error:reson,
                message:"admin did not sign up"
            });
         });
}


exports.getAllUsers=(req,res,next)=>{
   
    User.find()
    .exec()
    .then(
        doc=>{
            const all_users={
                NumberOfUser: doc.length,
                Users:doc.map(
                    documents=>{
                        return{
                            _id:documents._id,
                            email:documents.email,
                            password:documents.password,
                         
                            request:{
                                    type:'GET',
                            }
                        }
                    }
                )
            };
            res.status(200).json(all_users);
        }
    )
    .catch(
        err=>{
            console.log(err);
            res.status(404).json({
                     error:err
            })
          }
    );

}


exports.getAllAdmins=(req,res,next)=>{
   
    Admin.find()
    .exec()
    .then(
        doc=>{
            const all_admins={
                NumberOfAdmins: doc.length,
                Admins:doc.map(
                    documents=>{
                        return{
                            admin:documents,
                            adminName:documents.adminName,
                            request:{
                                    type:'GET',
                            }
                        }
                    }
                )
            };
            res.status(200).json(all_admins);
        }
    )
    .catch(
        err=>{
            console.log(err);
            res.status(404).json({
                     error:err.messag
            })
          }
    );

}


exports.getUsersById=(req,res,next)=>{
  
    const id = req.params.userId;
    User.findById(id)
    .exec()
    .then(doc=>{
        console.log("from database",doc);
        if(doc){
            res.status(200).json({
                user:doc,
                request:{
                    type:'GET',
                  
                }
            });
        }else{
            res.status(404).json({
                messag: "Invalid entry founded for provided ID"
            });
        }
    })
    .catch(
        err=>{
            console.log(err);
            res.status(500).json({error:err});
        }
    );
    

}



exports.getAdminById=(req,res,next)=>{
  
    const id = req.params.adminId;
    Admin.findById(id)
    .exec()
    .then(doc=>{
        console.log("from database",doc);
        if(doc){
            res.status(200).json({
                admin:doc,
                request:{
                    type:'GET',
                  
                }
            });
        }else{
            res.status(404).json({
                messag: "Invalid entry founded for provided ID"
            });
        }
    })
    .catch(
        err=>{
            console.log(err);
            res.status(500).json({error:err});
        }
    );
    

}
exports.deleteAdmin =(req,res,next)=>{
    Admin.remove({_id: req.params.adminId})
    .exec()
    .then(result=>{
        res.status(200).json({
                message: 'Admin delted'
        });
    })
    .catch(err=>{
       res.status(500).json({
           error:err
       });
    });
}

exports.updateById=(req,res,next)=>{
    const updateObj = req.body;
    const id = req.params.adminId;
    Admin.update({
        _id:id
    },{
        $set:updateObj
    }).then(
       result=>{
        console.log(result);
        res.status(200).json({
            message:'Admin Updated',
            request:{
                type:'PATCH',
            }
        });
       }
    ).catch(
        err=>{
            console.log(err);
             res.status(500).json({
                    error:err
            });
             }   
    );
}

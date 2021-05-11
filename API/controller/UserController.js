const User = require("../moduls/user");
const mongoose=require('mongoose');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");
const checkAuth = require("../middleweare/check-auth");
const DOMAIN = 'sandbox0564028e1f694671b664d1f8a66170e6.mailgun.org?';

const mg = mailgun({apiKey: process.env.MAILGUN_KEY, domain: DOMAIN});
const _ =require('lodash');
 
const nodemailer = require('nodemailer');

exports.signIn= (req,res,next)=>{
  
    User.find({email:req.body.email})
    .exec()
    .then(
         user=>{
             if(user.length>=1){
                 return res.status(409).json({
                     message:"Email olrady exists"
                 });
             }else{
                const saltRounds = 10;
                 bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
                     if(err){
                         return res.status(500).json({
                             failedSignUp:err.message
                         });
                     }else{
                         const userSignUp = new User({
                             _id: new mongoose.Types.ObjectId(),
                             email:req.body.email,
                             password:hash,
                             firstName:req.body.firstName,
                             lastName:req.body.lastName,
                            
                          });
                          userSignUp.save()
                          .then(result=>{
                             console.log(result);
                             //here
                             const token = jwt.sign({_id:user._id},process.env.JWT_KEY,{expiresIn:'20m'});
                             const data = {
                                 from: 'mersalapplication@gmail.com',
                                 to: req.body.email,
                                 subject: 'Authentication Activated',
                                 text: `
                                  Please click on given link to activate  your account
                                  ${process.env.client_url}/auth/${token}
                                 `
                             };
                             mg.messages().send(data, function (err, body) {
                                 if(err){
                                     return res.status(201).json({
                                         error:err.message
                                     })
                                 }
                                 return res.status(400).json({
                                     sent:'Email has been sent, kindly follow the instrucations.',
                                     message:'User created',

                                     
                                 });
                             })
                            
                          })
                          .catch(result=>{
                             console.log(result);
                             res.status(500).json({
                                 error:result,
                                 message:'User did not created'
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

exports.activateAccount=(req,res)=>{
    const {token} = req.body;
    if(token){
            jwt.verify(token,process.env.ACTIVATE_ACCOUNT,function(error,decodeData){
                if(error){
                    return res.status(201).json({
                        message:'Incorrect or experid link'
                    });
                }
                const {email,password,firstName,lastName} = decodeData;
                User.findOne({email}).exec()
                .then(
                    user=>{
                        if(user){
                            return res.status(409).json({
                                message:"Email olrady exists"
                            });
                        }else{
                            return res.status(400).json({
                                message:'Signed up successfully'
                            });
                        }
                    }
                )
                .catch(                                                                                                                                                                                                                                                                                                                                                                                 
                    err=>{
                        res.status(500).json({
                            message:err.message
                        });
                    }
                    
                );

            })
    }else{
        return res.status(500).json({
            message:'Something went wrong!!'
        });
    } 
   
    

}

exports.logIn=(req,res,next)=>{
    User.find({email: req.body.email})
        .exec()
        .then(user=>{
            if(user.length <1){
                return res.status(401).json({
                    message: "Mail not found , user doesn\'t exist"
                });
            }
            bcrypt.compare(req.body.password , user[0].password, (err,result)=>{
                if(err){
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if(result){
                   const token= jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        FullName:user[0].FullName,
                        firstName:user[0].firstName,
                        lastName:user[0].lastName,
                        dateCreated:user[0].dateCreated,
                        password:user[0].password

                    },process.env.JWT_KEY,
                    {
                        expiresIn:"24h"
                        
                    },
                    );
                    
                    const data = {
                        from: 'mersalapplication@gmail.com',
                        to: req.body.email,
                        subject: 'Hello',
                        html: `
                         <h>Please click on given link to actived your account</h2>
                         <p>${process.env.client_url}/auth/activate/${token}</p>
                        `
                    };
                    mg.messages().send(data, function (err, body) {
                        if(err){
                            return res.status(201).json({
                                error:err.message
                            })
                        }
                        return res.status(400).json({
                            message:'Email has been sent, kindly activate your email.',
                            message: "Auth successful",
                            token:token,
                            id:  user[0]._id,
                        });
                    });
                }else{
                    res.status(401).json(
                        {
                        message: "Auth failed,password did not match"
                    });
                }
               
            });

        })
        .catch(reson=>{
            res.status(500).json({
                error:reson,
                message:"user did not sign up"
            });
         });
}

exports.updateById=(req,res,next)=>{
    const updateObj = req.body;
    const id = req.params.userId;
    User.updateOne({
        _id:id
    },{
        $set:{
          updateObj
        
        }
    }).then(
       result=>{
        console.log(result);
        res.status(200).json({
            message:'user Updated',
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

exports.deleteUser =(req,res,next)=>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result=>{
        res.status(200).json({
                message: 'User delted'
        });
    })
    .catch(err=>{
       res.status(500).json({
           error:err
       });
    });
}

exports.update = (req,res,next)=>{
    const set = 10;
     bcrypt.hash(req.body.password,set,function(err,hash){
            
        if(err){
            return res.status(500).json({
                failedAddAdmin:err.message
            })
        }
        else{
             const  objectUpdate = new User({
                _id:req.params.userId,
                email:req.body.email,
                password:hash,
                FullName:req.body.FullName,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                profileImage:req.file.path,
                phonenumper:req.body.phonenumper
             });
             const id ={_id:req.params.userId}
             User.updateOne({
                 _id:id
             },{
                 $set:{
                    objectUpdate
                 }
             }).then(
                 result=>{
                  console.log(result);
                  res.status(200).json({
                      message:'user Updated',
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
        
    });

 
}
exports.forgetPasswoed=(req,res)=>{
    const email = body.email;
    User.findOne({email},(err,user)=>{
        if(err  || !user){
            return res.status(400).json({message:'user doesn\'t exists'})
        }
        const token= jwt.sign({
            email: user[0].email,
            userId: user[0]._id,
            FullName:user[0].FullName,
            firstName:user[0].firstName,
            lastName:user[0].lastName,
            dateCreated:user[0].dateCreated,
            password:user[0].password

        },process.env.JWT_KEY,
        {
            expiresIn:"24h"
            
        },

        );
    
        const data ={
            from:'noreply@gmail.com',
            to:email,
            subject:'Account Activation Link',
            html: process.env.client_url+'/forget_pass'+token
            
        };
        return user.updateOne({resetLink:token},(err,success)=>{
            if(err ){
                return res.status(400).json({message:'reset password link error'})
            }else{
                
            }
        });
    })
}

exports.forgetpassword=(req,res,next)=>{
    const email = req.body.email;
     User.findOne({email},(err,user)=>{
        if(!user || err){
            return res.status(400).json({message:'User dose not exists.'});
        }
        const token = jwt.sign({_id:user._id},process.env.reset_pass_key,{expiresIn:'20m'});
        const data = {
            from: 'mersalapplication@gmail.com',
            to: req.body.email,
            subject: 'Reset Password',
            html: `
             <h2>Please click on given link to reser your passsword</h2>
             <p>${process.env.client_url}/reset/${token}</p>
            `
        };
        return user.updateOne({resetLink:token},(err,success)=>{
            if(err){
                return res.status(201).json({
                    error:err.message
                })
            }else{
                mg.messages().send(data, function (err, body) {
                    if(err){
                        return res.status(400).json({
                            error:err.message,
                            message:'Reset Password link error'
                        })
                    }
                    return res.status(201).json({
                        message:'Email has been sent, kindly follow the instrucations.',
                        reset:`${process.env.client_url}/reset/${token}`
                        
                    });
                })
            }
        })
       


    })
}

exports.resetPassword=(req,res)=>{
    const {newPass, resetLink} = req.body;
    if(resetLink){
       const user= jwt.verify(resetLink,process.env.reset_pass_key,function(err,decodeData){
            if(err){
                return res.status(401).json({
                    error:err.message,
                    message:'Incoorect token or it is expired'
                })
            }
        })
        User.findOne(user,(err,user)=>{
            if(err||!user){
                return res.status(201).json({
                    error:err
                })
            }
            bcrypt.hash(newPass,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const obj = ({password:hash});
                    user=_.extend(user,obj);
                    user.save((err,result)=>{
                        if(err){
                            return res.status(400).json({
                                error:err.message,
                                
                            })
                        }else{
                            return res.status(201).json({ message:'Your password has been changed'});
        
                        }
        
                    })
                }

            })
           
          

        })   
    }else{
        return res.status(400).json({ message:'Authentication Error'});
    }

}


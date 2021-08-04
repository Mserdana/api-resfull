const mongoose=require('mongoose');

const Card = require("../moduls/card");
const Order = require("../moduls/order");


 exports.postCard=(req,res,next)=>{
    Order.find({userId : req.body.userId}).exec()
    .then(
        orders=>{
            if(orders){
                    const card = new Card({
                        _id:mongoose.Types.ObjectId(),
                        orderId:req.body.orderId,
                        userId:req.body.userId
                    });
                    card.save().then(
                       result=> {
                              res.status(201).json({
                                 id:result._id,
                                 userId:result.userId,
                                 orderId:result.orderId
                             });  
                            
                        }
                    )
                    .catch( error=>{
                        console.log(error);
                        res.status(500).json({
                            error:error
                 
                        });
                    });
 
            }else{

                res.status(401).json({
                    messag: "Invalid entry found for provided ID",
                    
                }); 
            }
           
            
        }
    ).catch(
        error=>{
            console.log(error);
        res.status(500).json({
            message:error.messag
        });
     });
 }


 exports.getCardById=(req,res,next)=>{
    Card.findById(req.params.cardId)
    .exec()
    .then(
        card=>{
        if(!card){
         res.status(404).json({
             message:'Cadr not founded'
            });
        }    
        res.status(200).json({
            id:card._id,
            orderId:card.orderId,
            userId:card.userId
        });
    })
    .catch(error=>{
        res.status(500).json({
         err:error
        });
    });
 }

 exports.petch_card_by_id=(req,res,next)=>{
    const updateObj = req.body;
    const id = req.params.cardId;
    Order.update(
        {_id:id},
        {$set:updateObj}
    ).then(result=>{
        console.log(result);
        res.status(200).json({
          message:'Card Updated',
          request:{
              type:'PATCH',
           }
      });
 }).catch(
     error=>{
      console.log(err);
       res.status(500).json({
              error:err
      });
       }
  );
}

 exports.deleteCardById=(req,res,next)=>{
    Card.remove({
        _id:req.params.cadrId
    })
    .exec()
    .then(
     card=>{
     res.status(200).json({
         message:'Card Deleted',
     });
 })
    .catch(error=>{
     res.status(500).json({
      error:error
     })
 });
 }
 

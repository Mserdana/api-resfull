const mongoose=require('mongoose');
const Delivery = require('../moduls/delivery');
const Order = require('../moduls/order');
const Admin = require('../moduls/admin');


exports.add_Delivery=(req,res,next)=>{
    Admin.findById(req.body.adminId)
    .then(
        admin=>{
         if(!admin){
             return res.status(404).json({
                 message:"Admin not founded"
             });
         }
         Order.findById(req.body.orderId).then(
            order=>{
                if(!order){
                   return res.status(404).json({
                       message:"Order not founded"
                   });
                }
                const delivery= new Delivery({
                    _id:mongoose.Types.ObjectId(),
                    orderId:req.body.orderId,
                    adminId:req.body.adminId,
                    phoneNumber:req.body.phoneNumber
                });
               return delivery.save();
                
            }
        ).then(
            result=>{
                console.log(result);
                res.status(201).json({
                   message:'Delivery stored',
                   createdDeliveryr:{
                       _id:result._id,
                   } ,
                   require:{
                       type:'POST',

                    }
                });
            }
        ).catch(
            err=>{
                res.status(500).json({
                    error:err.message
         
                });
            }
        ); 
       
     }).catch(
    error=>{
        res.status(500).json({
            message:"Order not found",
            error:error.message
 
        });
    }
 );
     

 }

exports.update_delivery=(req,res,next)=>{
    const deliveryeObj = req.body;
    const id = req.params.deliveryId;
    Delivery.update(
        {_id:id},
        {$set:deliveryeObj}
    ).then(result=>{
        console.log(result);
        res.status(200).json({
          message:'delivery Updated',
          request:{
              type:'PATCH',
           }
      });
 }).catch(
     error=>{
      console.log(err);
       res.status(500).json({
              error:err.message
      });
       }
  );
}



exports.delete_delivery=(req,res,next)=>{
   

    Delivery.remove({
        _id:req.params.deliveryId
    })
    .exec()
    .then(res.status(200).json({
        message:'Deliver Deleted',
    }))
    .catch(error=>{
     res.status(500).json({
      error:error
     })
 });
 }


 exports.deliveryId=(req,res,next)=>{
    Delivery.findById(req.params.id)
    .exec()
    .then(
        delivery=>{
        if(!delivery){
         res.status(404).json({
             message:'Delivery not founded'
            });
        }    
        res.status(200).json({
            delivery:delivery,
            request:{
                type:'GET',

            }
        });
    })
    .catch(error=>{
        res.status(500).json({
         error:error
        });
    });
 }
const Order = require("../moduls/order");
const mongoose=require('mongoose');
const Book = require("../moduls/book");
const User = require("../moduls/user");


exports.order_get_all =(req,res,next)=>{
    Order.find()
    .select("book_key quantity _id  userId address")
    .populate('book_key')
    .exec()
    .then(
        docs=>{
        res.status(200).json(
            {
             count: docs.length,
             orders:docs.map(
                 docs=>{
                     return {
                         _id: docs._id,
                         book_key:docs.book_key,
                         quantity:docs.quantity,
                         address:docs.address,
                         userId:docs.userId,
                         request:{
                             type:'GET',

                            }
 
                     }
                 }
             ),
              
            }
        );
 
    })
    .catch(err=>{
     res.status(500).json({
         error:err
     });
    });
 }
 
 exports.add_order=(req,res,next)=>{
    Book.findById(req.body.book_key)
    .then(
        book=>{
         if(!book){
             return res.status(404).json({
                 message:"Book not founded"
             });
         }
         User.findById(req.body.userId).then(
            user=>{
                if(!user){
                   return res.status(404).json({
                       message:"User not founded"
                   });
                }
                const order= new Order({
                    _id:mongoose.Types.ObjectId(),
                    quantity:req.body.quantity,
                    book_key:req.body.book_key,
                    userId:req.body.userId,
                    address:req.body.address
                });
               return order.save();
                
            }
        ).then(
            result=>{
                console.log(result);
                res.status(201).json({
                   message:'Order stored',
                     _id:result._id,
                      require:{
                       type:'POST',

                    }
                });
            }
        ).catch(
            error=>{
                res.status(500).json({
                    error:error
         
                });
            }
        ); 
       
     }).catch(
    error=>{
        res.status(500).json({
            message:"Product not found",
            error:error
 
        });
    }
 );
     

 }
 
 exports.order_get_by_id=(req,res,next)=>{
    Order.findById(req.params.orderID)
    .exec()
    .then(
        order=>{
        if(!order){
         res.status(404).json({
             message:'Order not founded'
            });
        }    
        res.status(200).json({
            order:order,
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

 exports.petch_order_by_id=(req,res,next)=>{
    const updateObj = req.body;
    const id = req.params.orderID;
    Order.update(
        {_id:id},
        {$set:updateObj}
    ).then(result=>{
        console.log(result);
        res.status(200).json({
          message:'order Updated',
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



exports.delete_order_by_id=(req,res,next)=>{
  
    Order.remove({
        _id:req.params.orderID
    })
    .exec()
    .then(
     order=>{
     res.status(200).json({
         message:'Order Deleted',
     });
 })
    .catch(error=>{
     res.status(500).json({
      error:error
     })
 });
 }
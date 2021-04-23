const mongoose=require('mongoose');
const Book = require("../moduls/book");
const Card = require("../moduls/card");
const user = require("../moduls/user");
const Order = require("../moduls/order");
 

 exports.getCard=(req,res,next)=>{
    Order.find({userId : req.body.userId}).exec()
    .then(
        orders=>{
            const response ={
            orders_count : orders.length , 
            all_orders: orders.map(
                doc=>{
                    return{
                         _id: doc._id,
                         quantity: doc.quantity,
                         userId :doc.userId,
                         address: doc.address
                        }
                
                }
            )
        }
           if(orders){
            res.status(200).json(response);
        }else{
            res.status(404).json({
                messag: "Invalid entry found for provided ID"
            });
        }
        }
    ).catch(
        reson=>{
        res.status(500).json({
            error:reson,
        });
     });
 }
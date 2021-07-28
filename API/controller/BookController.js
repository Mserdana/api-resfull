const Book = require("../moduls/book");
const mongoose=require('mongoose');


exports.add_book = (req,res,next)=>{
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        publishedDate:req.body.publishedDate,
        pageCount:req.body.pageCount,
        CreatedAt:req.body.CreatedAt,
        coverImageName:req.files.coverImageName[0].path,
        auther:req.body.auther,
        type:req.body.type,
        bookPrice:req.body.bookPrice,
        pdfSrc:req.files.pdfSrc[0].path,
        descriptioin:req.body.descriptioin,
        Rate:req.body.Rate,
        isbn10:req.body.isbn10,
        isbn13:req.body.isbn13
    });
    book.save().then(
        res.status(201).json({
            createedBook:{
                messag:"craeted successfully",
                id:book.id,
                request:{
                    type:'Post',

                    
                }
            }
        })
    ).catch(
        err=>{
            console.log(err);
            res.status(500).json({error:err});
        }
    )
}
exports.getBook=(req,res,next)=>{
    const id = req.params.bookId;
    Book.findById(id).exec().then(
        doc=>{
            console.log("from database",doc);
            if(doc){
                console.log(doc.coverImageName);
                const response={
                    _id:doc._id,
                    title:doc.title,
                    descriptioin:doc.descriptioin,
                    publishedDate:doc. publishedDate,
                    pageCount:doc.pageCount,
                    CreatedAt:doc.CreatedAt,
                    coverImageName:doc.coverImageName,
                    pdfSrc:doc.pdfSrc,
                    auther:doc.auther,
                    Rate:doc.Rate,
                    type:doc.type,
                    bookPrice:doc.bookPrice,
                    isbn10:doc.isbn10,
                    isbn13:doc.isbn13,
                  
                   
                }
                res.status(200).json(response)
                 
            }else{
                res.status(404).json({
                    messag: "Invalid entry found for provided ID"
                });
            }
        }

    ).catch(
        err=>{
            console.log(err);
            res.status(500).json({error:err});
        }
    );
   
}
//

 

exports.getBookByisbn10=(req,res,next)=>{
     
    //// 
    var isbn10book = req.params.isbn10;
    Book.find({isbn10:isbn10book}).exec().then(
        doc=>{
            const response ={
                count: doc.length,
                books: doc.map(
                   doc=>{
                      return{
                        _id:doc._id,
                        title:doc.title,
                        descriptioin:doc.descriptioin,
                        publishedDate:doc. publishedDate,
                        pageCount:doc.pageCount,
                        CreatedAt:doc.CreatedAt,
                        coverImageName:doc.coverImageName,
                        pdfSrc:doc.pdfSrc,
                        auther:doc.auther,
                        Rate:doc.Rate,
                        type:doc.type,
                        bookPrice:doc.bookPrice,
                        isbn10:doc.isbn10,
                        isbn13:doc.isbn13,                        
                      }

                   } 
                )
           };
           console.log(doc);
            res.status(200).json(response);
        }
    ).catch( err=>{
        console.log(err);
        res.status(500).json({
                 error:err.messag
        })
      });
}



exports.getBookByisbn13=(req,res,next)=>{
     
    //// 
    var isbn13book = req.params.isbn13;
    Book.find({isbn13:isbn13book}).exec().then(
        doc=>{
            const response ={
                count: doc.length,
                books: doc.map(
                   doc=>{
                      return{
                        _id:doc._id,
                        title:doc.title,
                        descriptioin:doc.descriptioin,
                        publishedDate:doc. publishedDate,
                        pageCount:doc.pageCount,
                        CreatedAt:doc.CreatedAt,
                        coverImageName:doc.coverImageName,
                        pdfSrc:doc.pdfSrc,
                        auther:doc.auther,
                        Rate:doc.Rate,
                        type:doc.type,
                        bookPrice:doc.bookPrice,
                        isbn10:doc.isbn10,
                        isbn13:doc.isbn13,                        
                      }

                   } 
                )
           };
           console.log(doc);
            res.status(200).json(response);
        }
    ).catch( err=>{
        console.log(err);
        res.status(500).json({
                 error:err.messag
        })
      });
}




exports.getBookByType=(req,res,next)=>{
     
    //// 
    var itypebook = req.params.type;
    Book.find({type:itypebook}).exec().then(
        doc=>{
            const response ={
                count: doc.length,
                books: doc.map(
                   doc=>{
                      return{
                        _id:doc._id,
                        title:doc.title,
                        descriptioin:doc.descriptioin,
                        publishedDate:doc. publishedDate,
                        pageCount:doc.pageCount,
                        CreatedAt:doc.CreatedAt,
                        coverImageName:doc.coverImageName,
                        pdfSrc:doc.pdfSrc,
                        auther:doc.auther,
                        Rate:doc.Rate,
                        type:doc.type,
                        bookPrice:doc.bookPrice,
                        isbn10:doc.isbn10,
                        isbn13:doc.isbn13,                        
                      }

                   } 
                )
           };
           console.log(doc);
            res.status(200).json(response);
        }
    ).catch( err=>{
        console.log(err);
        res.status(500).json({
                 error:err.messag
        })
      });
}


exports.getAllBooks=(req,res,next)=>{

    Book.find().exec().then(
        doc=>{ 
            const response
            = doc.map(
              doc=>{
                 return{
                     _id:doc._id,
                     title:doc.title,
                     descriptioin:doc.descriptioin,
                     publishedDate:doc. publishedDate,
                     pageCount:doc.pageCount,
                     CreatedAt:doc.CreatedAt,
                     coverImageName:doc.coverImageName,
                     pdfSrc:doc.pdfSrc,
                     auther:doc.auther,
                     Rate:doc.Rate,
                     type:doc.type,
                     bookPrice:doc.bookPrice,
                     isbn10:doc.isbn10,
                     isbn13:doc.isbn13,
                   
                   
                 }

              } 
           )
            console.log(doc);
             res.status(200).json(response);
            
          }
    ).catch(
        err=>{
            console.log(err);
            res.status(500).json({
                     error:err
            })
          });
      }

exports.updateBook=(req,res,next)=>{
    const updateObj = req.body;
    const id = req.params.BookId;
    Book.update(
        {_id:id},
        {$set:updateObj}
    ).then(result=>{
        console.log(result);
        res.status(200).json({
          message:'Book Updated',
          book : result.body,
          request:{
              type:'PATCH',
          }
      });
 }).catch(
     err=>{
      console.log(err);
       res.status(500).json({
              error:err
      });
       }
  );
}

exports.deleteBook=(req,res,next)=>{
   
    const id = req.params.BookId;
    Book.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            messag:'deleted successfully'
        });
    })
    .catch(err=>{
          console.log(err);
          res.status(500).json({
              error:err
          });
         }
     );
    
 }


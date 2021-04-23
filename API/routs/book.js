const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../moduls/book');
const bookController = require('../controller/BookController');
const multer = require('multer');
const checkAuth = require('../middleweare/check-auth');
const path = require('path');



//const dirPath = path.join(__dirname, '..','./upload/filePDF/');


const file_image_stroage = multer.diskStorage({
    destination :(req,file,cb)=>{
            if(file.fieldname==='pdfSrc'){
                cb(null, './upload/filePDF/');

            }else if(file.fieldname==='coverImageName'){
                cb(null, './upload/images/')
            }
    },
    filename:(req,file,cb)=>{
        if(file.fieldname==='pdfSrc'){
            cb(null, `${new Date().toISOString().replace(/:/g, '-' ,/\s+/g, ' ')}${file.originalname}`);


        }else if(file.fieldname==='coverImageName'){
            cb(null, `${new Date().toISOString().replace(/:/g, '-' ,/\s+/g, ' ')}${file.originalname}`);

        }
    }
});
/*
const upload2 = multer({
    file_image_stroage
  });
*/
const upload = multer({
    storage : file_image_stroage,
  
    fileFilter: (req, file, cb)=>{
        checkFileType(file,cb);
    }
}).fields(
    [
        {name:'pdfSrc', maxCount:1},{name:'coverImageName'}
    ]
);
// onst uploadSingleFile = upload2.single('pdfSrc');
function checkFileType(file, cb) {
    if(file.fieldname==="pdfSrc")
    {
     if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ) { // check file type to be pdf, doc, or docx
            cb(null, true);
          } else {
            cb(null, false); // else fails
          }
    }
    else if(file.fieldname==="coverImageName")
    {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'||
            file.mimetype==='image/gif'
          ) { // check file type to be png, jpeg, or jpg
            cb(null, true);
          } else {
            cb(null, false); // else fails
          }
        }
    }


router.get('/',bookController.getAllBooks);

router.post('/',upload,checkAuth,bookController.add_book);

router.get('/:bookId',bookController.getBook);
 
router.patch('/:BookId',checkAuth,bookController.updateBook);
   
router.delete('/:BookId',checkAuth,bookController.deleteBook);

/*
router.post('/downloadPdf', (req,res)=>{
    const fileName = req.body.pdfSrc;
    const file = dirPath+"/"+fileName;
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream', // أخبر المتصفح أن هذا ملف ثنائي
        'Content-Disposition': 'attachment; filename='  // أخبر المتصفح أن هذا ملف يحتاج إلى تنزيل
      });
      const readStream = fs.createReadStream(file);  
      readStream.on('data', (chunk) => {
        res.write(chunk, 'binary'); // تمت كتابة محتوى المستند إلى تدفق إخراج الاستجابة بتنسيق ثنائي
      });
      readStream.on('end', () => {
        res.end();
      })
});
*/
module.exports=router;


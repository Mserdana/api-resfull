const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyPorser =  require('body-parser');
const morgan = require('morgan');

const usersRouter = require('./API/routs/user');
const bookRouter = require('./API/routs/book');
const orderRouter = require('./API/routs/order');
const cardRouter = require('./API/routs/card');
const adminRouter = require('./API/routs/admin');
const deliveryRouter = require('./API/routs/delivery');


  
const cors = require('cors');
    mongoose.connect(
    'mongodb+srv://rest-api:'+process.env.MONGO_ALTLAS_PW+'@mersal.5nqps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useMongoClient:true}
    );
    mongoose.connection.on('error', function (err) {
        console.log('MONGOOSE ERROR')
        console.log(err)
      })

/*
mongoose.connect(process.env.URL,{
    dbName:process.env.DB_NAME,
    user:process.env.USER_NAME,
    pass:process.env.MONGO_ALTLAS_PW,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true

})
*/
app.use(bodyPorser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyPorser.json({limit:'5mb',extended:true}));

app.use(cors());
//app.use('/files' express.static("files"));
app.use(morgan('dev'));
 
app.use('/bookcovers',express.static('./upload/images'));
app.use('/userprofile',express.static('./upload/profileImages'));
app.use('/file_pdf_path',express.static('./upload/filePDF'));

app.use((res,req,next)=>{
    res.header('Acess-Control-Allow-Origin',"*");
    res.header('Acess-Control-Allow-Headers',
    'Origin, X-Requsted-With, Content-Type, Accept, Authorization');
    if(req.methold === 'OPTIONS'){
        res.header('Aceess-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/users',usersRouter);
app.use('/books',bookRouter);
app.use('/orders',orderRouter);
app.use('/cards',cardRouter);
app.use('/admins',adminRouter);
app.use('/delivery',deliveryRouter);
//handel errores
app.use((req,res,next)=>{
    const reson = new Error('Not found');
    reson.status = 404;
    next(reson);
});


app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        result :{
            app:'app.js',
            message: error.message
        }
    });
});


module.exports = app;
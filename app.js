const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const usersRouter = require('./API/routs/user');
const bookRouter = require('./API/routs/book');
const orderRouter = require('./API/routs/order');
const cardRouter = require('./API/routs/card');
const adminRouter = require('./API/routs/admin');
const deliveryRouter = require('./API/routs/delivery');

const parseJson = bodyparser.json();

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

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({limit: '10mb'}));

  app.use(cors());
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

app.use(function (req, res, next) {
    req.getBody = function (callback) {
        parseJson(req, res,function (err) {
          callback(err, req.body);
        });
    };
    next();
}); 

app.use('/users',usersRouter);
app.use('/books',bookRouter);
app.use('/orders',orderRouter);
app.use('/cards',cardRouter);
app.use('/admins',adminRouter);
app.use('/delivery',deliveryRouter);
/*
app.use((req,res,next)=>{
    const reson = new Error('Not found');
    reson.status = 404; 
    next(reson);
});

*/
app.use((err, req, res, next)=> {
    if (err instanceof SyntaxError && err.status === 400) {
        return res.status(400).send(JSON.stringify({
            error: {
                code: "INVALID_JSON",
                message: "The body of your request is not valid JSON."
            }
        }))
    }

    console.error(err);
    res.status(500).send();
  });


module.exports = app;
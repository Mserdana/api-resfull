    const jwt = require('jsonwebtoken');
  


   module.exports= function (req,res,next){
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ error: 'token missing' })
         }
         try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = decoded;
            next();
          } catch (ex) {
            return res.status(400).json({ error: ex })
          }
        
    };


const connectDB = require('./config/dbConnect')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const customError = require('./config/customError')
const express = require('express');
//const helmet = require('helmet');
const logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config()

//alternatively we can just require dotenv
//require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser()); //parsing incoming cookies into req.cookies
app.use(cors({
    origin: [process.env.FRONTEND_ORIGIN || 'http://localhost:3000'],
    //allow this origin to talk to the backend
    credentials: true
    //allow cookies to be sent to us
}));
app.use(express.json()); //parsing incoming body into req.body
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));

// const referrer_domain = "http://localhost:3000"
// //check for the referrer domain
// app.all('/*', function(req, res, next) {
//   if(req.headers.referer.indexOf(referrer_domain) == -1){
//     res.send('Invalid Request')
//   }

//   next();
// });

//protect and secure the headers 
//app.use(helmet());
//app.use(noCache()); //disable client side caching 

//connect to DB
connectDB();

//require routers
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
//const secretRouter = require('./routes/secretRouterOriginal');
//const profileRouter = require('./routes/profileRouter');
//const pwResetRouter = require('./routes/pwResetRouter')
const contactRouter = require('./routes/contactRouter');
const deleteRouter = require('./routes/deleteRouter');


//user routers as middlewares
//not going to implement social media account auth in this projects, but there are ready codes in oaRouters and oaControllers
app.use('/register', registerRouter);
app.use('/login', loginRouter);
//app.use('/secret', secretRouter);
app.use('/delete', deleteRouter);
//app.use('/profile', profileRouter);
//app.use('/logout', logoutRouter);
//app.use('/reset_password', pwResetRouter);
app.use('/contact', contactRouter);

//a simple test to make sure server works
// app.get('/', (req, res)=>{
//     res.json({"pooh": "bear"})
// })

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return err;
    }else{
        console.log(`Application/Server is now listening on port ${port}`);
    }
})

//Error Handling for 400 
app.use((req, res, next) => {
    next(customError('test error'))
});

//Central Error Handling for internal server error 
//added next to make sure whatever error is forwarded
app.use(errorHandler = (err, req, res, next)=> {  
    res.status(err.status || 500).json({ error: err.message })
})



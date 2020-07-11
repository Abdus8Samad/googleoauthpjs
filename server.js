const express = require('express'),
app = express(),
morgan = require('morgan'),
bodyParser = require('body-parser'),
expressSession = require('express-session'),
flash = require('connect-flash'),
passport = require('passport'),
google = require('./gauth');
mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log('Connected to the DB'))
.catch(err => console.log(err))

app.use(morgan('dev'));
app.set('view engine','ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({
    secret:'My secret !!',
    resave:true,
    saveUninitialized:true
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next) =>{
    res.locals.user = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next();
})

app.get('/',(req,res) =>{
    res.render('home');
})

app.get('/profile',(req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','Please login first');
    res.redirect('/');
},(req,res) =>{
    res.render('profile');
})

const authRoutes = require('./auth');
app.use('/auth',authRoutes);

app.listen(8080,() => console.log('Server listening at port 8080'));
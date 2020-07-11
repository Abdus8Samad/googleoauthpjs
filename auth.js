const router = require('express').Router(),
passport = require('passport');

router.get('/google',passport.authenticate('google',{scope:['profile','email','openid']}));

router.get('/google/redirect',passport.authenticate('google',{failureRedirect:'/',failureFlash:true,failureMessage:'There was some error'}),(req,res) =>{
    console.log('------------------------------')
    console.log(req.user);
    console.log('------------------------------')
    req.flash('success',`You've been successfully logged in, Welcome ${req.user.username}`);
    res.redirect('/');
})
router.get('/logout',(req,res) =>{
    req.logOut();
    req.flash('success','You\'ve been successfully logged out');
    res.redirect('/')
})
module.exports = router;
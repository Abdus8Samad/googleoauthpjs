const passport = require('passport'),
User = require('./user'),
GoogleStrategy = require('passport-google-oauth20');

passport.serializeUser((user, done) =>{
    done(null, user.id);
})
passport.deserializeUser((id, done) =>{
    User.findById(id)
    .then(user =>{
        done(null ,user);
    })
    .catch(err =>{
        done(err, null);
    })
})

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'/auth/google/redirect'
},( accessToken, refreshToken, profile, done ) =>{
    console.log(profile);
    User.findOne({username:profile._json.name})
    .then(user =>{
        if(user){
            done(null, user);
        } else {
            let { name , email, picture } = profile._json;
            let newUser = {
                username:name,
                email,
                avatar:picture
            }
            User.create(newUser)
            .then(user =>{
                console.log(user);
                done(null, user);
            })
            .catch(err =>{
                done(err, null)
            })
        }
    })
    .catch(err =>{
        done(err, null);
    })
})
)

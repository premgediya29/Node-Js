const passport = require('passport')
const localst = require('passport-local').Strategy
const {Login} = require('../Model/Model')

passport.use("local", new localst({ usernameField: "email"},
    async(email, password, done)=> {
        let admindata = await Login.findOne({email: email})
        if(admindata){
            if(admindata.password == password){
               return done(null, admindata)
            }else{
               return done(null, false)
            }
        }else{
          return done(null, false)
        }
    }
))

passport.serializeUser((user, done)=> {
   return done(null, user.id)
})

passport.deserializeUser(async (id, done)=> {
    const admin = await Login.findById(id)
    if(admin){
       return done(null, admin)
    }else{
       return done(null, false)
    }
})

passport.chechauth = (req, res, next)=> {   
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/')
    }
    
}

passport.setauthuser = (req, res, next)=> {
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

module.exports = passport
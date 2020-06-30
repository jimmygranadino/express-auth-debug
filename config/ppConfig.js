// import libraries/modules
const passort = require('passport')
const LocalStrategy = require('passport-local').LocalStrategy
const db = require('../models')
const passport = require('passport')

//serialize user
passport.serializeUser(function(user, cb) {
    cb(null, user.id)
})

//deserialized version
passport.deserializeUser(function(id, cb) {
    db.user.findByPk(id).then(function(user) {
        cb(null, user)
    }).catch(callback)
})

// config local vars/settings
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, callback) {
    db.userfindOne({ where: { email }}).then(function(user) {
        if(!user || !user.validPassword(password)) {
            callback(null, false)
        } else {
            callback(null, user)
        }
    }).catch(callback)
}
))

// password local config

module.exports = passport
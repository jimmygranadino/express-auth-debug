// require express
const express = require('express')

// import router
const router = express.Router()

// import db
const db = require('../models')

// import middleware
const flash = require('flash')
const passport //update to config file path when available

// GET route for register
router.get('/register', function(req, res) {
    res.render('auth/register')
})
// POST route for register
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        // if user was created
        if(created) {
            console.log(`🐳 user created 🐳`)
            res.redirect('/')
        } else {
            console.log(`💥 user email already exists 💥`)
            req.flash('error', 'Error: Email already exists for user. Try again.')
            res.redirect('/auth/register')
        }
    }).catch(function(err) {
        console.log(`❌ Error! \nMessage: ${err.message}.\nSee - ${err} ❌`)
        req.flash('error', err.message)
        res.redirect('/auth/register')
    })
})

// GET route for login
router.get('/login', function(req, res) {
    res.render('auth/login')
})

// POST route for login
router.post('/login', function(req, res) {
    passport.authenticate('local', function(error, user, info) {
        //if no user authenticated
        if(!user) {
            req.flash('error', 'Invalid username or password')
            // save to our user session no username
            // redirect our user to try logging in again
        }
        if (error) {
            return error
        }

        req.login(function(user, error) {
            // if error move to error
            // if success flash success message
            // if success save session and redirect user
        })
    })
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    successFlash: 'Welcome to our app!',
    failureFlash: 'Invalid username or password'
}))

// export router
module.exports = router
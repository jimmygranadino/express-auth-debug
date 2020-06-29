// require express
const express = require('express')

// import router
const router = express.Router()

// import db
const db = require('../models')

// import middleware
const flash = require('flash')

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

// export router
module.exports = router
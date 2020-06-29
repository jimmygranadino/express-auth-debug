// require express
const express = require('express')

// import router
const router = express.Router()

// import db
const db = require('../models')

// import middleware

// GET route for register
router.get('/register', function(req, res) {
    res.render('auth/register')
})
// POST route for register


// GET route for login
router.get('/login', function(req, res) {
    res.render('auth/login')
})
// POST route for login
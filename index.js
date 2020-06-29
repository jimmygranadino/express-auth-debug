/* -- REQUIRING NPM LIBRARIES -- */
// configure dotenv
require('dotenv').config()
const Express = require('express')
const ejsLayouts = require('express-ejs-layouts')
// get all your middleware for authentication
// helemet, morgan, passport, some custom middleware, express-sessions, sequelize sessions, flash
const helmet = require('helmet')
const session = require('express-sessions')
const flash = require('flash')

/* -- APP SETUP -- */
const app = Express()
app.use(Express.urlencoded({ extended: false }))
app.use(Express.static(__dirname + '/public'))
app.set('view engine','ejs')
app.use(ejsLayouts)
app.use(require('morgan')('dev'))
app.use(helmet())

// ROUTES
app.get('/', function(req, res) {
    res.render('index')
})

app.listen(process.env.PORT || 3000, function() {
    console.log(`🌻🌻🌻🌻 hittin on ${process.env.PORT}`)
})
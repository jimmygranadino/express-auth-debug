/* -- REQUIRING NPM LIBRARIES -- */
// configure dotenv
require('dotenv').config()
const Express = require('express')
const ejsLayouts = require('express-ejs-layouts')
// get all your middleware for authentication
const helmet = require('helmet')
const session = require('express-sessions')
const flash = require('flash')
const passport = require('./config/ppConfig')
const db = require('./models')
// add link to custom middleware for isLoggedIn
const isLoggedIn = require('./middleware/isLoggedIn')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

/* -- APP SETUP -- */
const app = Express()
app.use(Express.urlencoded({ extended: false }))
app.use(Express.static(__dirname + '/public'))
app.set('view engine','ejs')
app.use(ejsLayouts)
app.use(require('morgan')('dev'))
app.use(helmet())

// create new instance of class Sequelize Store
const sessionStore = new SequelizeStore({
    db: db.sequeliz,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync()

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function(req, res, next) {
    res.locals.alert = req.flash()
    res.locals.currentUser = req.user
    next()
})



// ROUTES
app.get('/', function(req, res) {
    res.render('index')
})

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile')
})

// include auth controller
app.use('/auth', require('./controllers/auth'))

// initializes app on port
app.listen(process.env.PORT || 3000, function() {
    console.log(`🌻🌻🌻🌻 hittin on ${process.env.PORT}`)
})
/* -- REQUIRING NPM LIBRARIES -- */
// configure dotenv
require('dotenv').config()

// require expresss and setup an express app instance
const Express = require('express')

// require and set view engine use ejs
const ejsLayouts = require('express-ejs-layouts')

/* -- APP SETUP -- */
const app = Express()
app.use(Express.urlencoded({ extended: false }))
app.use(Express.static(__dirname + '/public'))
app.set('view engine','ejs')
app.use(ejsLayouts)

// ROUTES
app.get('/', function(req, res) {
    res.render('index')
})

app.listen(process.env.PORT || 3000, function() {
    console.log(`🌻🌻🌻🌻 hittin on ${process.env.PORT}`)
})
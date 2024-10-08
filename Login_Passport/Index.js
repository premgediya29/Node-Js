const express = require('express')
const path = require('path');
const db = require('./Server/Server')
const port = 3000
const passport = require('passport')
const localst = require('./Log/Passport')
let session = require('express-session')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded())
app.use(session({
    name: 'demo',
    secret: 'keyboard',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 100 * 100 * 60}
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setauthuser)

app.use('/', require('./Route/Routing'))
app.use('/category', require('./Route/CategoryRoutes'))
app.use('/category/subcategory', require('./Route/SubCategoryRoutes'))


app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/images/categoryimage/', express.static(path.join(__dirname, 'images/categoryimage')))

app.listen(port, (err) => {
    if (err) {
        console.log('port listening error : ', err)
    } else {
        console.log(`listening on port ${port}`)
    }
})
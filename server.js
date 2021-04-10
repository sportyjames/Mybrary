if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views', __dirname + '/views') //views will be coming from views folder(current directory/views) views folder: server rendered views
app.set('layout','layouts/layout') //the layout file will be from layouts folder
app.use(expressLayouts) //we want to use expressLayouts
app.use(express.static('public')) //tell express where the public files(stylesheets,javascript of images) are from

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/',indexRouter)


app.listen(process.env.PORT || 3000)  
const express = require('express')
const app = express()

const ejs = require('ejs')
app.set('view engine','ejs')

const fileUpload = require('express-fileupload')
app.use(fileUpload())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true,useUnifiedTopology:true})

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const validateMiddleWare = require("./middleware/validationMiddleware")
app.use('/posts/store',validateMiddleWare)

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostContoller = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')


app.listen(3000,()=>{
    console.log("App listening on port 3000")
})

app.get('/',homeController)

app.get('/post/new',newPostController)

app.post('/posts/store',storePostContoller)

app.get('/post/:id',getPostController) 
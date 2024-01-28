const express = require('express')
const path = require('path')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost.js')
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true,useUnifiedTopology:true})
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000,()=>{
    console.log('App listening on port 3000')
})

app.get('/',async(req,res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index',{
        blogposts
    })
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})

app.get('/post/new',(req,res)=>{
    res.render('create')
})

const fileUpload = require('express-fileupload')
app.use(fileUpload())
app.post('/posts/store',(req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'public/img',image.name),async(error)=>{
        await BlogPost.create({
            ...req.body,
            image:'/img/' + image.name
        })
        res.redirect('/')
    }) 
})

app.get('/post/:id',async(req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{
        blogpost
    })
})
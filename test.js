const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

// mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true});
mongoose.connect('mongodb://localhost/my_database',{useUnifiedTopology: true,useNewUrlParser: true});

BlogPost.create({
    title:'Test Number One',
    body:'This is the first test.',
    username:'David' 
},(error,blogoost)=>{
    console.log(error,blogoost)
}) 
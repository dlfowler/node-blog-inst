module.exports = (req,res,next)=>{
    if(req.files == null || req.body == null){
        return res.redirect('/post/new')
    }
    next()
}
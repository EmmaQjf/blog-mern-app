const Blog = require('../../models/blog')

/*
req.user is typically used to represent the authenticated user associated with the request.
req.body is used to access data submitted in the request body, such as form data or JSON payloads.
*/

module.exports = {
    indexBlogs,
    showBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    jsonBlog,
    jsonBlogs
}

//_ means I am not using this parameter 
function jsonBlog(_, res) {
    res.json(res.locals.data.blog)
}

function jsonBlogs(_, res) {
    res.json(res.locals.data.blogs)
}

async function indexBlogs(req,res,next) {
    try{
        const blogs = await Blog.find({})
        res.locals.data.blogs = blogs
        next()
    } catch(error) {
        res.status(400).json({msg: error.message})
    }
}

async function showBlog(req,res,next) {
    try{
        const blog = await Blog.findOne({_id: req.params.id})
        res.locals.data.blog = blog
        next()
    } catch(error) {
        res.status(400).json({msg: error.message})
    }
}

async function createBlog(req,res,next) {
    try{
        req.body.user = req.user._id // add the id, the value, to the user property in the blog 
        const blog = await Blog.create(req.body)
        req.user.blogs.addToSet(blog) // add the blog to the blogs in the user
        await req.user.save()
        res.locals.data.blog = blog
        next()
    } catch(error) {
        res.status(400).json({msg: error.message})
    }
}

async function updateBlog(req,res,next) {
    try{
        const blog = await Blog.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
        res.locals.data.blog = blog
        next()
    } catch(error) {
        res.status(400).json({msg: error.message})
    }
}

async function deleteBlog(req,res,next) {
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id)
        //req.user.blogs.pull(blog)
        //req.user.save()
        // req.user.blogs.indexOf(blog)
         const user = req.user
         const blogsArray = user.blogs
         const index = blogsArray.findIndex(blog => blog._id === req.params.id )
         user.blogs.splice(index, 1)
        await user.save()
        res.locals.data.blog = blog
        next()
    } catch(error) {
        res.status(400).json({msg: error.message})
    }
}
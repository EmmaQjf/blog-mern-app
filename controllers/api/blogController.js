const Blog = require('../../models/blog')

/*
// get all the blogs
router.get('/', blogCtrl.indexBlogs, blogCtrl.jsonBlogs)
// get individual post
router.get('/:id',blogCtrl.showBlog, blogCtrl.jsonBlog)
// create a blog
router.post('/', userCtrl.Auth, blogCtrl.createBlog, blogCtrl.jsonBlog)
// update a blog
router.post('/:id', userCtrl.Auth, blogCtrl.updateBlog, blogCtrl.jsonBlog)
// delete a blog
router.delete('/:id', userCtrl.Auth, userCtrl.deleteUser,blogCtrl.jsonBlog)
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
        res.status(400).json({msg: error.msg})
    }
}

async function showBlog(req,res,next) {
    try{
        const blog = await Blog.findOne({_id: req.params.id})
        res.locals.data.blog = blog
        next()
    } catch(error) {
        res.status(400).json({msg: error.msg})
    }
}

async function createBlog(req,res,next) {
    try{
        const blog = await Blog.create(req.body)
        const user = req.user
        user.blogs.addToSet(blog)
        await user.save()
        res.locals.data.blog = blog
        next()
    } catch(error) {
        res.status(400).json({msg: error.msg})
    }
}

async function updateBlog(req,res,next) {
    try{
        const blog = await Blog.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
        res.locals.data.blog = blog
        next()
    } catch(error) {
        res.status(400).json({msg: error.msg})
    }
}

async function deleteBlog(req,res,next) {
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id)
        //req.user.blogs.pull(blog)
         const user = req.user
         const blogsArray = user.blogs
         const index = blogsArray.findIndex(blog => blog._id === req.params.id )
         user.blogs.splice(index, 1)
        await user.save()
        res.locals.data.blog = blog
        next()
    } catch(error) {
        res.status(400).json({msg: error.msg})
    }
}
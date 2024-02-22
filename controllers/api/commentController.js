const Comment = require('../../models/comment')
const userCtrl = require('./userController')
const blogCtrl = require('./blogController')
const Blog = require('../../models/blog')
/*
router.post('/', commentCtrl.createComment, commentCtrl.jsonComment)
router.put('/:id', userCtrl.Auth, commentCtrl.updateComment,commentCtrl.jsonComment)
router.delete('/:id',userCtrl.Auth, commentCtrl.deleteComment,commentCtrl.jsonComment)
router.get('/',commentCtrl.indexComments,commentCtrl.jsonComments )
router.get('/:id',commentCtrl.showComment,commentCtrl.jsonComment )
*/

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    indexComments,
    showComment,
    jsonComments,
    jsonComment
}
function jsonBlog(_, res) {
    res.json(res.locals.data.blog)
}

function jsonBlogs(_, res) {
    res.json(res.locals.data.blogs)
}

async function indexComments(req,res,next) {
    try{
        const comments = await Comment.find({})
        res.locals.data.comments = comments
        next()
    } catch(error) {
        res.status(400).json({msg: error.msg})
    }
}

async function showComment(req,res,next) {
    try{
        const comment = await Comment.findOne({_id: req.params.id})
        res.locals.data.comment = comment
        next()
    } catch(error) {
        res.status(400).json({msg: error.msg})
    }
}

async function createComment(req,res,next) {
    try{
        const comment = await Comment.create(req.body)
        const blog = await Blog.findOne({_id: req.params.id})
        blog.comments.addtoSet(comment)
        // const user = req.user
        // user.blogs.addToSet(blog)
        // await user.save()
        res.locals.data.comment = comment
        next()
    } catch(error) {
        res.status(400).json({msg: error.msg})
    }
}

async function updateComment(req,res,next) {
    try{
        const comment = await Comment.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
        res.locals.data.comment = comment
        next()
    } catch(error) {
        res.status(400).json({msg: error.msg})
    }
}

async function deleteComment(req,res,next) {
    try{
        const comment = await Comment.findByIdAndDelete(req.params.id)
        res.locals.data.comment = comment
        next()
    } catch(error) {
        res.status(400).json({msg: error.msg})
    }
}
async function createComment(req, res) {
    try {

    } catch(error) {

    }
}
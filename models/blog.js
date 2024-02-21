const {Schema, model} = require('mongoose')


const blogSchema = new Schema({
    title: {type: String, required:true},
    body:{type: String, required:true},
   comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {
    timestamps: true
})


const Blog = model('Blog', blogSchema)

module.exports = Blog
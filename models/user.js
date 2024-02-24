require('dotenv').config()
const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {type: String},
    email:{type: String, required:true, unique: true},
    password: {type:String, required:true},
    blogs: [{type: Schema.Types.ObjectId, ref: 'Blog'}]
}, {
    timestamps: true
})


userSchema.pre('save', async function(next) {
    this.isModified('password')?
    this.password = await bcrypt.hash(this.password, 8):
    null;
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = await jwt.sign({_id: this._id, user:this}, process.env.SECRET)
    return token
}

const User = model('User', userSchema)

module.exports = User
/*
router.post('/', userCtrl.signup)
// log in
router.post('/', userCtrl.login)
// see all the blogs
// router.get('/blogs', userCtrl.Auth, userCtrl.indexBlogs)
// update the user
router.put('/:id', userCtrl.Auth, userCtrl.updateUser)
// delete the user
router.delete('/:id', userCtrl.Auth, userCtrl.deleteUser)
// show the user info
router.get('/:id', userCtrl.showUser)
*/

const User = require('../../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.Auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({ _id: data._id })
    if (!user) {
      throw new Error()
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).send('Not authorized')
  }
}

exports.signup = async (req, res) => {
  try{
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.json({ user, token })
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.login = async (req, res) => {
  try{
    const user = await User.findOne({ email: req.body.email })
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      res.status(400).send('Invalid login credentials')
    } else {
      const token = await user.generateAuthToken()
      res.json({ user, token })
    }
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.updateUser = async (req, res) => {
  try{
    const updates = Object.keys(req.body)
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()
    res.json(req.user)
  }catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.deleteUser = async (req, res) => {
  try{
    await req.user.deleteOne()
    res.json({ message: 'User deleted' })
  }catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.showUser = async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id)
         res.json(foundUser)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}








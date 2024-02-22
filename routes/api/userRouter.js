const express = require('express')
const router = express.Router()
const userCtrl = require('../../controllers/api/userController')

// sign up
router.post('/signup', userCtrl.signup)
// log in
router.post('/login', userCtrl.login)
// see all the blogs
// router.get('/blogs', userCtrl.Auth, userCtrl.indexBlogs)
// update the user
router.put('/:id', userCtrl.Auth, userCtrl.updateUser)
// delete the user
router.delete('/:id', userCtrl.Auth, userCtrl.deleteUser)
// show the user info
router.get('/:id', userCtrl.showUser)


module.exports = router
const express = require('express')
const router = express.Router()
const commentCtr = require('../../controllers/api/commentController')
const userCtrl = require('../../controllers/api/userController')

// create
router.post('/', commentCtrl.createComment, commentCtrl.jsonComment)
router.put('/:id', userCtrl.Auth, commentCtrl.updateComment,commentCtrl.jsonComment)
router.delete('/:id',userCtrl.Auth, commentCtrl.deleteComment,commentCtrl.jsonComment)
router.get('/',commentCtrl.indexComments,commentCtrl.jsonComments )
router.get('/:id',commentCtrl.showComment,commentCtrl.jsonComment )

module.exports = router
const router = require('express').Router()
const uploadCtrl = require('../controllers/uploadCtrl')
const auth = require('../middleware/auth')

router.post('/uploadimages', auth, uploadCtrl.upload)
router.post('/removeimage', auth, uploadCtrl.remove)

module.exports = router

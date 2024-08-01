const router = require('express').Router()

 router.use('/user',require('./user'))
router.use('/',require('./post'))
router.use('/',require('./like'))
router.use('/',require('./follow'))


module.exports = router
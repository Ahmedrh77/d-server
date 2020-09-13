const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/', auth, (req, res) => {
    res.json(true)
})

module.exports=router
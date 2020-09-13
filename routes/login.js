const express = require('express')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const router = express.Router()


router.post('/', [check('email').not().isEmpty(),
check('password').not().isEmpty()], async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty) { return res.status(400).json({ errors: errors.array() }) }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email  })
        if (!user) { res.status(400).json({ message: 'user not found' }) }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) { res.status(400).json({ message: 'invalid password' }) }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, 'key', { expiresIn: '1h' }, (err, token) => {
            if (err) { throw err }
            else { res.status(200).json({ token }) }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'server error' })
    }

})

module.exports = router
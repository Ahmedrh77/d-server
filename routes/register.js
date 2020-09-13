const express = require('express')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const router = express.Router()



router.post('/', [check('username', 'username is required').not().isEmpty(),
check('email', 'email is required').not().isEmpty(),
check('email', 'not valid email').isEmail(),
check('password', 'password is required').not().isEmpty(),
check('password', 'password is too short').isLength({ min: 7 })

], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }
    const { username, email, password } = req.body
    try{
    let user=await User.findOne({email:email})
    if(user) {return res.status(400).json({message:'email already used'})}  
    const NewUser = new User({
        username,
        email,
        password
    })
    
        const salt = await bcrypt.genSalt(5)
        NewUser.password = await bcrypt.hash(password, salt)
        await NewUser.save()
        const payload = {
            user: {
                id: NewUser.id
            }
        }
        jwt.sign(payload, 'key', { expiresIn: '1h' }, (err, token) => {
            if (err) { throw err }
            else { res.status(200).json({ token }) }
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'server error' })
    }
})




module.exports = router
const express = require('express')
const auth = require('../middleware/auth')
const declaration = require('../models/declaration')
const { check, validationResult } = require('express-validator')
const router = express.Router()




router.get('/', auth, async (req, res) => {
    let alldec = await declaration.find({ userId: req.user.id })
    res.json(alldec)
})

    .post('/', auth, [check('title', 'title is required').not().isEmpty(),
    check('date', 'date is required').not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

        try {

            const { title, date } = req.body

            const NewD = new declaration({
                userId: req.user.id,
                title,
                date
            })

            await NewD.save()
            res.json('Declaration ajoutée')
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ message: 'error' })
        }



    }).delete('/:id', auth, async (req, res) => {
        let result = await declaration.findByIdAndRemove(req.params.id)
        if (result) { res.status(200).json({ message: 'Declaration suprimée' }) }

    }).put('/:id', auth, async (req, res) => {
        let dec = await declaration.findOne({ _id: req.params.id })
        dec.status = 'payée'
        await dec.save()
        res.status(200).json({ message: 'Done' })

    }).get('/filter', async (req, res) => {

        const data = req.body.input
        try {

            let result = await declaration.findOne({ title: data })
            if (result) { res.status(200).json(result) }
            else { res.status(404).json({ message: 'Introvable' }) }

        } catch (error) {
            console.log(error.message)
            res.status(400).json({ message: 'server error' })
        }


    }).post('/select', auth, async (req, res) => {

        const data = req.body.query
        try {

            if (data === 'Tous') {

                let result = await declaration.find({ userId: req.user.id })
                if (result) { res.status(200).json(result) }
                else { res.status(404).json({ message: 'Introvable' }) }
            } else {

                let result = await declaration.find({ userId: req.user.id, status: data })
                if (result) { res.status(200).json(result) }
                else { res.status(404).json({ message: 'Introvable' }) }
            }




        } catch (error) {

            console.log(error.message)
            res.status(400).json({ message: 'server error' })
        }
    })

module.exports = router
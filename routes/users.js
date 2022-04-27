const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/addUser', async (req, res) => {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = new User({
        name,
        email,
        password: hash
    })
    try {
        const a1 = await user.save()
        res.status(200).json(a1)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json('Updated successfully')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User deleted successfully')
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router
const router = require('express').Router()

const Product = require('../models/product')

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/addProduct', async (req, res) => {
    const product = new Product(req.body)
    try {
        const a1 = await product.save()
        res.status(200).json(a1)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json('Updated successfully')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product deleted successfully')
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router
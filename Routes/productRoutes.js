const express = require('express')
const router = express.Router()
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const { createProduct, updateProduct, deleteProduct, getSingleProduct, getProducts, getProductsForUpdate } = require('../Controller/productController')

router.get('/create', verifyTokenAndAdmin, (req, res)=>{
    res.render("addProduct")
})
router.post('/create', verifyTokenAndAdmin, createProduct)

router.get('/update', verifyTokenAndAdmin, getProductsForUpdate)

router.get('/update/:productId', verifyTokenAndAdmin, getSingleProduct)

router.post('/updateProduct/:productId', verifyTokenAndAdmin, updateProduct)

router.get('/delete/:productId', verifyTokenAndAdmin, deleteProduct)

router.get('/find', verifyTokenAndAuthorization, getProducts)


module.exports = router
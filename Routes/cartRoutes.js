const express = require('express')
const router = express.Router()
const { verifyTokenAndAuthorization, verifyToken } = require('./verifyToken')

const { deleteCart, getCart, addtocart } = require('../Controller/cartController')


router.post('/addtocart', verifyToken, addtocart)

router.get('/delete/:productId',verifyToken, deleteCart)

router.get('/find/:userId', verifyToken, getCart)




module.exports = router
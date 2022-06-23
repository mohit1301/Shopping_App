const express = require('express')
const router = express.Router()

const { registerUser, loginUser, logoutUser} = require('../Controller/authController')
const { verifyTokenAndAuthorization, verifyToken } = require('./verifyToken')

//register new user
router.get('/register', (req, res)=>{
    res.render('registerPage')
})
router.post('/register', registerUser)


router.get('/login', (req, res)=>{
    res.render('loginPage')
})

router.post('/login', loginUser)

router.get('/logout', verifyToken, logoutUser)


module.exports = router
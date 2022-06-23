const express = require('express')
const router = express.Router()
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyAdmin } = require('./verifyToken')
const { updateUser, deleteUser, getUser, getUsers } = require('../Controller/userController')


// router.put('/update/:id', verifyTokenAndAuthorization, updateUser)

// router.delete('/delete/:id', verifyTokenAndAuthorization, deleteUser)

// router.get('/find/:id', verifyTokenAndAdmin, getUser)

// router.get('/find', verifyTokenAndAdmin, getUsers)

router.get('/dashboard', verifyTokenAndAuthorization, (req, res) => {
        res.render('dashboard', {user : req.user.name, message: req.flash('message')})
    })

module.exports = router
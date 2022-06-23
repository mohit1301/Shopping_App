require('dotenv').config()
const jwt = require("jsonwebtoken")
const User = require('../Model/users')
// const cookie = require('cookie-parser')

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken
  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        res.send("This token is invalid")
      }
      else {
        // const currentUser = await User.findOne({_id: user._id}) 
        // req.user = currentUser
        req.user = user.user
        next();
      }
    })
  } else {
    res.send("Access Denied. A token is required")
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    }
    else {
      res.status(403).json("You are not allowed to view this")
    }
  })
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    }
    else {
      req.flash('message', 'You are not allowed to view this')
      res.redirect('/user/dashboard')
      // res.status(403).json("You are not allowed to view this")
    }
  })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }
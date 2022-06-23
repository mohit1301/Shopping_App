require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../Model/users')
const bcrypt = require('bcrypt')


exports.registerUser = async(req, res)=>{
        try {
          const { name, email, password } = req.body;
          if (!(email && password && name)) {
            res.status(400).send("All input is required");
          }
          const user = await User.findOne({ email: email });
          if (user) {
            return res.status(409).send("User Already Exists. Please Login");
          }
          encryptedPassword = await bcrypt.hash(password, 10);
          // Create user in database
          const newUser = await User.create({
            name: name,
            email: email,
            password: encryptedPassword
          });
          await newUser.save()
          // req.session.user = newUser
          // res.cookie("accessToken", token, {httpOnly : true, expiresIn: 180000})
          res.status(201).render('loginPage')
        } catch (err) {
          console.log(err);
        }
}

exports.loginUser = async(req, res)=>{
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email: email });
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            {user}, process.env.TOKEN_KEY,
            // { expiresIn: "2m" }
          );
          res.cookie("accessToken", token, {httpOnly : true})

          res.redirect('/user/dashboard')
        }
        else{
            res.status(400).send("Invalid Credentials");
        }
      } catch (err) {
        console.log(err);
      }
}

exports.logoutUser = async(req, res)=>{
   
    res.clearCookie("accessToken")
    req.flash('message', 'Logged Out Successfully...!')
    res.redirect('/')
}


// require('dotenv').config()
// const jwt = require('jsonwebtoken')
// const User = require('../Model/users')
// const bcrypt = require('bcrypt')

// exports.mainPage = (req, res)=>{
//     res.render('users')
// }

// exports.updateUser = async(req, res)=>{
//     const body = req.body
//     if(body.password){
//         body.password = await bcrypt.hash(body.password, 10);
//     }
//     try{ 
//         let updatedStudent = await User.findByIdAndUpdate(
//          {_id: req.params.id}, 
//         {
//             $set: body
//         },
//         { new: true }
//     )
//     res.status(200).json(updatedStudent)
//     }catch(err){
//         res.json({message: err.message})
//     }
// }

// exports.deleteUser = async(req, res)=>{
//     try{
//         await User.findByIdAndDelete(req.params.id)
//         res.status(200).json("User deleted successfully!")
//     }catch(err){
//         res.json({message: err.message})
//     }
// }

// exports.getUser = async(req, res)=>{
//     try{
//         const user = await User.findById(req.params.id, {password: 0})
//         res.status(200).json(user)
//     }catch(err){
//         res.json({message: err.message})
//     }
// }

// exports.getUsers = async(req, res)=>{
//     try{
//         const user = await User.find()
//         res.render('users', {users: user})
//         // res.status(200).json(user)
//     }catch(err){
//         res.json({message: err.message})
//     }
// }
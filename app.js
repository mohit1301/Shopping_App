const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./config')
const flash = require('connect-flash');
app.use(flash())
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

app.use(cookieParser())
const authRouter = require('./Routes/authRoutes')
const userRouter = require('./Routes/userRoutes')
const productRouter = require('./Routes/productRoutes')
const cartRouter = require('./Routes/cartRoutes')

app.use(session({
    secret: uuidv4(), 
    resave: false,
    saveUninitialized: true
}));

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)


app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))


// home route
app.get('/', (req, res) =>{
    res.render('mainPage',{message: req.flash('message')} );
})
 
app.listen(3000, ()=>{
    console.log(`server running on port 3000`)
})










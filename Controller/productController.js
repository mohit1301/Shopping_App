const Product = require('../Model/products')

exports.createProduct = async(req, res)=>{
    try{
        
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        res.render('addProduct', {message: "Product Added successfully"})
    }catch(err){
        res.send(err.message)
    }
}

exports.updateProduct = async(req, res)=>{
    try{ 
        let updatedProduct = await Product.updateOne(
         {_id: req.params.productId}, 
        {
            $set: req.body
        },
        { new: true }
    )
    req.flash('message', 'Product Updated Successfully')
    res.redirect('/product/update/'+ req.params.productId)
    }catch(err){
        res.status(500).json({message: err.message})
        
    }
}

exports.deleteProduct = async(req, res)=>{
    try{
        await Product.deleteOne({_id: req.params.productId})
        req.flash('message', 'Product deleted successfully!')
        res.redirect('/product/update')
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
exports.getSingleProduct = async(req, res)=>{
    try{
        const singleProduct = await Product.findById(req.params.productId)
        
        res.render('updateProduct', {product: singleProduct, message: req.flash('message')})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}


exports.getProducts = async(req, res)=>{
    try{
        const product = await Product.find()
        res.render('products', {user: req.user, Products: product, message: req.flash('message')})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
exports.getProductsForUpdate = async(req, res)=>{
    try{
        const product = await Product.find()
        res.render('productsForUpdate', {user: req.user, Products: product, message: req.flash('message')})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
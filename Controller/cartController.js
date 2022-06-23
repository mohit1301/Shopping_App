const Cart = require('../Model/carts')


exports.addtocart = async (req, res) => {
  try {

    const { productId, productQuantity, productPrice, userId, productName } = req.body;
    if (productQuantity < 1) {
      req.flash('message', 'Add at least 1 item to the cart')
      res.redirect('/product/find')
    }
    else {
      let cart = await Cart.findOne({ userId });

      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);

        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.productQuantity = productQuantity;
          cart.products[itemIndex] = productItem;
          cart.amount += productQuantity * productPrice
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productName, productId, productQuantity, productPrice });
          cart.amount += productQuantity * productPrice
        }
        cart = await cart.save();
        req.flash('message', 'Item added to cart')
        res.redirect('/product/find')
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productName, productId, productQuantity, productPrice }],
          amount: productQuantity * productPrice
        });
        req.flash('message', 'Item added to cart')
        res.redirect('/product/find')
      }
    }

  }
  catch (err) {
    console.log(err)
  }
}

exports.deleteCart = async (req, res) => {
  const userId = req.user._id
  let cart = await Cart.findOne({ userId: userId });
  try {
    let itemIndex = cart.products.findIndex(p => p.productId == req.params.productId);

    let productItem = cart.products[itemIndex];
    const original_price = productItem.productPrice
    const original_quant = productItem.productQuantity

    await Cart.updateOne(
      { userId: req.user._id },
      {
        $pull: {
          products: {
            "productId": productItem.productId
          }
        }
      }
    );
    cart.amount -= original_quant * original_price
    cart = await cart.save()
    req.flash('message', 'Item removed from cart')
    res.redirect('/cart/find/' + userId)
    // res.status(200).json("Product deleted successfully!")
  } catch (err) {
    console.log(err)
    // res.status(500).json({message: err.message})
  }
}

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
    if (cart == null) {
      req.flash('message', 'Cart is empty. Add at least 1 item in the cart')
      res.redirect('/product/find')
    }
    res.render('cart', {
      user: req.user, Products: cart.products, amount: cart.amount,
      message: req.flash('message')
    })

  } catch (err) {
    console.log(err)
  }
}

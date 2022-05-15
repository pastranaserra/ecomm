// const session = require('express-session');
const { NotFoundErrorResponse } = require('../../../responses');
const { Products } = require('./productModel');
const { Cart } = require('./cart');

exports.add = async (req, res, next) => {
  const { _id: productId } = req.body;
  const { cart: oldCart } = req.session;
  try {
    const product = await Products.findById(productId);
    console.log(product);
    if (product) {
      oldCart.items.push(product); // Cart add function
      oldCart.totalQtty = oldCart.items.length;
      oldCart.totalPrice = 50;
      // (function totalPrice() {
      //   let ttlPrice = 0;
      //   oldCart.items.forEach((item) => {
      //     ttlPrice += item.price;
      //   });
      //   return ttlPrice;
      // })();
      req.session.cart = oldCart; // updates the session
      console.log(req.session.cart); // to test new session
      res.json({
        'Shopping Cart': req.session.cart,
      });
    } else {
      next(NotFoundErrorResponse("This item doesn't exist"));
    }
  } catch (error) {
    next(InternalServerErrorResponse(error));
  }
};

exports.read = (req, res) => {
  const { cart } = req.session;
  res.json({
    'Your Cart': cart,
  });
};

// exports.modify = (req, res) => {
//   // not ready
//   const { _id: productId } = req.body;

//   for (let i = 0; i < userCart.length; i += 1) {
//     if (userCart[i].id === productId) {
//       Object.assign(userCart[i], req.body);
//       res.json(userCart[i]);
//     } else {
//       res.json(NotFoundErrorResponse("The product doesn't exist"));
//     }
//   }
// };

exports.remove = async (req, res, next) => {
  const { _id: productId } = req.body;
  const cart = new Cart(req.session.cart);

  if (!cart) {
    res.json(NotFoundErrorResponse('This shopping cart is empty'));
  }

  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].id === productId) {
      cart.splice(i, 1); // save result in model--> cart.splice().save()
    } else {
      return res.json(
        NotFoundErrorResponse('This product is not in your cart'),
      );
    }
  }
  session.cart = cart;
  await session.save((err) => {
    if (err) {
      next(err);
    }
  });
  return res.json({
    'Shopping Cart': cart,
  });
};

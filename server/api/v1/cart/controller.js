// const session = require('express-session');
const {
  NotFoundErrorResponse,
  InternalServerErrorResponse,
} = require('../../../responses');
const { Products } = require('./productModel');
const { Cart } = require('./cart');
const { ttlPrice } = require('./middlewares');

exports.add = async (req, res) => {
  const { _id: productId } = req.body;
  const { cart } = req.session;
  const newCart = cart;
  try {
    const product = await Products.findById(productId);
    if (product) {
      newCart.items.push(product); // Cart add function
      newCart.totalQtty = newCart.items.length;
      newCart.totalPrice = ttlPrice(newCart.items);
      req.session.cart = newCart; // updates the session
      // console.log(req.session.cart); // to test new session
      res.json({
        'Shopping Cart': req.session.cart,
      });
    }
  } catch (error) {
    res.json(NotFoundErrorResponse("This item doesn't exist"));
  }
};

exports.read = (req, res) => {
  const { cart } = req.session;
  res.json({
    'Your Cart': cart,
  });
};

exports.remove = async (req, res) => {
  const { _id: productId } = req.body;
  // const { cart } = req.session;
  const { items } = req.session.cart;

  for (let i = 0; i < items.length; i += 1) {
    const { _id: itemId } = items[i];
    if (itemId === productId) {
      items.splice(i, 1);
    } else {
      return res.json(
        NotFoundErrorResponse('This product is not in your cart'),
      );
    }
  }
  req.session.cart.items = items;
  req.session.cart.totalQtty = items.length;
  req.session.cart.totalPrice = ttlPrice(items);

  return res.json({
    'Shopping Cart': req.session.cart,
  });
};

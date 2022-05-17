// const session = require('express-session');
const {
  NotFoundErrorResponse,
  BadRequestErrorResponse,
} = require('../../../responses');
const { Products } = require('./productModel');
const { Cart } = require('./cart');

exports.add = async (req, res) => {
  const { _id: productId } = req.body;
  const { cart } = req.session;

  const newCart = new Cart(cart.items);
  try {
    const product = await Products.findById(productId);
    if (product) {
      newCart.add(product);
      req.session.cart = newCart;
      res.json({
        'Shopping Cart': req.session.cart,
      });
    } else {
      res.json(NotFoundErrorResponse(`The ${productId} product doesn't exist`));
    }
  } catch (error) {
    res.json(BadRequestErrorResponse(`${error}`));
  }
};

exports.read = (req, res) => {
  const { cart } = req.session;
  res.json({
    'Your Cart': cart,
  });
};

exports.remove = async (req, res) => {
  const { _id: id } = req.body;
  const { cart } = req.session;
  const product = cart.items.find((element) => {
    const { _id: productId } = element.item;
    return productId === id;
  });

  if (product) {
    const newCart = new Cart(cart.items);
    newCart.remove(product);
    req.session.cart = newCart;
    if (newCart.totalQtty === 0) {
      return res.json(NotFoundErrorResponse('Your shopiing cart is empty now'));
    }
    return res.json({
      'Shopping Cart': req.session.cart,
    });
  }
  return res.json(
    BadRequestErrorResponse(`the ${id} product is not in your shopping cart`),
  );
};

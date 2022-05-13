const session = require('express-session');
const { Model } = require('./productModel');
const { NotFoundErrorResponse } = require('../../../responses');

const userCart = []; // create session and userCart database

exports.add = async (req, res, next) => {
  const { _id: productId } = req.body;
  const { cart } = req.session;
  try {
    const product = await Model.findById(productId);
    if (product) {
      cart.push(product); // save user cart in the model--> userCart.save()
      session.cart = cart; // updates the session
      await session.save((err) => {
        if (err) {
          next(err);
        }
      });
      console.log(session); // to test session
      res.json({
        'Shopping Cart': userCart,
      });
    }
  } catch (error) {
    res.json(NotFoundErrorResponse("The product doesn't exist"));
  }
};

exports.read = (req, res) => {
  const { cart } = req.session;
  res.json({
    'Shopping Cart': cart,
  });
};

exports.modify = (req, res) => {
  // not ready
  const { _id: productId } = req.body;

  for (let i = 0; i < userCart.length; i += 1) {
    if (userCart[i].id === productId) {
      Object.assign(userCart[i], req.body);
      res.json(userCart[i]);
    } else {
      res.json(NotFoundErrorResponse("The product doesn't exist"));
    }
  }
};

exports.remove = async (req, res, next) => {
  const { _id: productId } = req.body;
  const { cart } = req.session;

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

module.exports = { userCart };

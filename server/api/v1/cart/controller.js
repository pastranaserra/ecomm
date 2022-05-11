const { BadRequestErrorResponse } = require('../../../responses');

const userCart = [];

exports.isEmpty = (req, res, next) => {
  if (userCart.length === 0) {
    res.json({
      message: 'Your shopping cart is empty',
    });
  }
  next();
};

exports.add = (req, res) => {
  userCart.push(req.body);
  res.json({
    'Shopping Cart': userCart,
  });
};

exports.read = (req, res) => {
  res.json({
    'Shopping Cart': userCart,
  });
};

exports.modify = (req, res) => {
  const { id } = req.body;

  for (let i = 0; i < userCart.length; i += 1) {
    if (userCart[i].id === id) {
      Object.assign(userCart[i], req.body);
      res.json(userCart[i]);
    } else {
      res.json(BadRequestErrorResponse('This item is not in your cart'));
    }
  }
};

exports.remove = (req, res) => {
  const { id } = req.body;
  for (let i = 0; i < userCart.length; i += 1) {
    if (userCart[i].id === id) {
      userCart.splice(i, 1);
    } else {
      return res.json(BadRequestErrorResponse('This item is not in your cart'));
    }
  }
  return res.json({
    'Shopping Cart': userCart,
  });
};

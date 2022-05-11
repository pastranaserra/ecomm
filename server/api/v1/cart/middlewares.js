const { userCart } = require('./controller');

exports.isEmpty = (req, res, next) => {
  if (userCart.length === 0) {
    res.json({
      message: 'Your shopping cart is empty',
    });
  }
  next();
};

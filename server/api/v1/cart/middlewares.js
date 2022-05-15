const { NotFoundErrorResponse } = require('../../../responses');

exports.isEmpty = (req, res, next) => {
  const { cart } = req.session;
  if (cart.totalQtty === 0) {
    res.json(NotFoundErrorResponse('Your shopping cart is empty'));
  }
  next();
};

exports.ttlPrice = function totalPrice(itemsList) {
  let finalPrice = 0;
  itemsList.forEach((item) => {
    finalPrice += item.price;
  });
  return finalPrice;
};

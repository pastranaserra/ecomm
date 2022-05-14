exports.isEmpty = (req, res, next) => {
  console.log(req.session.cart);
  // prints undefined when it should be {items:[], totalQtty:0, totalPrice: 0}
  const { cart } = req.session;
  if (!cart) {
    res.json({
      message: 'Your shopping cart is empty',
    });
  }
  next();
};

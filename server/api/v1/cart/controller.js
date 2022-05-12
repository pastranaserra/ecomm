const { Model } = require('./productModel');
const { NotFoundErrorResponse } = require('../../../responses');

const userCart = []; // create session and userCart database

exports.add = async (req, res) => {
  const { _id: productId } = req.body;
  try {
    const product = await Model.findById(productId);
    if (product) {
      userCart.push(product); // save user cart in the model--> userCart.save()
      res.json({
        'Shopping Cart': userCart,
      });
    }
  } catch (error) {
    res.json(NotFoundErrorResponse("The product doesn't exist"));
  }
};

exports.read = (req, res) => {
  res.json({
    'Shopping Cart': userCart,
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

exports.remove = (req, res) => {
  const { _id: productId } = req.body;

  for (let i = 0; i < userCart.length; i += 1) {
    if (userCart[i].id === productId) {
      userCart.splice(i, 1); // save result in model--> userCart.splice().save()
    } else {
      return res.json(NotFoundErrorResponse("The product doesn't exist"));
    }
  }
  return res.json({
    'Shopping Cart': userCart,
  });
};

module.exports = { userCart };

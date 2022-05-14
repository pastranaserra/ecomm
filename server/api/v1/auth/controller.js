const { sign } = require('jsonwebtoken');
const {
  jwt: { secret: jwtSecret, expiresIn: jwtExpiresIn },
} = require('../../../../config');
const { UnauthorizedErrorResponse } = require('../../../responses');
const { User } = require('../users/entity');
const { defaultCart: cart } = require('../cart/cart');

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const userModel = new User(body);
    const createdUserDoc = await userModel.save();
    res.status(201).json(createdUserDoc);
  } catch (err) {
    next(err);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const invalidCredsError = UnauthorizedErrorResponse('Invalid credentials');
    const { email = '', password = '' } = req.body;
    const { session } = req; // sets the session
    const userDoc = await User.findOne({ email });
    if (!userDoc) return next(invalidCredsError);
    const isPasswordValid = await userDoc.verifyPassword(password);
    if (!isPasswordValid) return next(invalidCredsError);
    const { _id: userId } = userDoc;
    const jwt = sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiresIn });
    await session.regenerate((err) => {
      if (err) next(err); // regenerate session as a good practice (?)
    });
    if (!session.user && !session.cart) {
      session.userId = userId; // sets the user _id in the session
      session.userName = userDoc.name; // sets the user name in the session
      session.cart = cart; // sets the user shopping cart in the session
      await session.save((err) => {
        // saving the session
        if (err) {
          next(err);
        }
      });
      console.log(session); // to test the session creation
    }
    return res.status(200).json({ ...userDoc.toJSON(), jwt });
  } catch (err) {
    return next(err);
  }
};

exports.getProfile = (req, res) => res.status(200).json(req.me);

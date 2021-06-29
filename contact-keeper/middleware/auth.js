const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token'); // 'x-auth-token' is the key to the 
                                            // token in the header

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user; // remember how we put a user object in the token in register route
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key_here';

// Generate JWT with userId, email, and role
function generateToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
}

module.exports = {
  generateToken,
};

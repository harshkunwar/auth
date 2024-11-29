const { User,Session } = require('./models');
async function registerUser(username, email, password, role = 'user') {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword, role });
      await user.save();
      console.log('User registered successfully:', user);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  }
async function createSession(userId, token) {
    try {
      const session = new Session({ userId, token });
      await session.save();
      console.log('Session created:', session);
    } catch (error) {
      console.error('Error creating session:', error.message);
    }
  }
  async function verifySession(token) {
    try {
      const session = await Session.findOne({ token }).populate('userId');
      if (!session) {
        console.log('Session not found or expired');
        return null;
      }
      console.log('Session is valid for user:', session.userId);
      return session.userId;
    } catch (error) {
      console.error('Error verifying session:', error.message);
    }
  }
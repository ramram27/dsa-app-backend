const prisma = require('../prisma/client');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRET || (() => {
  throw new Error('token is not defined')
})();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || (() => {
  throw new Error('JWT_REFRESH_SECRET is not defined');
})();

async function createUser(email, password) {
  if (!email || !password) {
    const err = new Error('email and password are required')
    err.status = 400;
    throw err;
  }
  const checkExisting = await prisma.user.findUnique({
    where: { email }
  });
  if (checkExisting) {
    const err = new Error('Email already exist');
    err.status = 409;
    throw err;
  }
  const saltRound = 10
  const hashPassword = await bcrypt.hash(password, saltRound)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword
    }
  })
  try {
    const access_Token = jwt.sign({ user_id: user.id }, JWT_SECRET, { expiresIn: '15m' })
    const refresh_Token = jwt.sign({ user_id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' })

    await prisma.refreshToken.create({
      data: {
        token: refresh_Token,
        user_id: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })
    return { user, access_Token, refresh_Token };
  } catch (err) {
    const error = new Error('Token is not generate');
    error.status = 501;
    throw error;
  }
}

async function loginUser(email, password) {
  if (!email || !password) {
    const err = new Error('email and password are required')
    err.status = 400;
    return err;
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    const err = new Error('user is not found')
    err.status = 400;
    return err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid credential');
    err.status = 400;
    return err;
  }

  try {
    const access_Token = jwt.sign({ user_id: user.id }, JWT_SECRET, { expiresIn: '15m' })
    const refresh_Token = jwt.sign({ user_id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' })
    return { user, access_Token, refresh_Token };
  } catch (err) {
    const error = new Error('Token is not generate');
    error.status = 501;
    throw error;
  }
}



module.exports = {
  createUser,
  loginUser
}



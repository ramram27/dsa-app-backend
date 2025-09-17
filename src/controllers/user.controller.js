const userService = require('../services/user.service')
const { revokeRefreshToken } = require('../services/token.service')
const bcrypt = require('bcrypt')

async function createUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const { user, access_Token, refresh_Token } = await userService.createUser(email, password);
    return res.status(201).json({
      succes: true, data: {
        user: {
          id: user.id,
          email: user.email
        }
      },
      access_Token,
      refresh_Token
    })
  } catch (err) {
    return next;
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const { user, access_Token, refresh_Token } = await userService.loginUser(email, password)
    return res.status(200).json({
      succes: true, data: {
        user: {
          id: user.id,
          email: user.email
        }
      },
      access_Token,
      refresh_Token
    })
  } catch (err) {
    return next;
  }
}

async function logout(req, res, next) {
  try {
    const { refresh_Token } = req.body
    await revokeRefreshToken(refresh_Token)
    return res.status(200).json({ succes: true, message: 'user logout' })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createUser,
  loginUser,
  logout
}











// const userService = require('../services/user.service');

// async function createUser(req, res, next) {
//   try {
//     const { name, rollnum } = req.body;
//     const user = await userService.createUser({ name, rollnum });
//     console.log("user",user)
//     return res.status(201).json({ success: true, data: user });
//   } catch (err) {
//     console.error("err",err)
//     return next(err);
//   }
// }

// module.exports = {
//   createUser,
// };

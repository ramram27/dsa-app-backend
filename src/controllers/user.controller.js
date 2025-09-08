const userService = require('../services/user.service')
const bcrypt = require('bcrypt')

async function createUser(req,res,next) {  
  try{
    const {email,password} = req.body;
    const user = await userService.createUser(email,password);
    return res.status(201).json({succes:true,data:user})
  }catch(err) {
    console.log("err",err)
    return next;
  }
}

async function loginUser(req,res,next) {
  try{
    const {email,password} = req.body;
    const user = await userService.loginUser(email,password)
    return res.status(200).json({succes:true,user:{
      id:user.id,
      email:user.email
    }})
  }catch(err) {
    return next;
  }
}

module.exports = {
  createUser,
  loginUser
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

const prisma = require('../prisma/client');
const bcrypt = require('bcrypt')


async function createUser(email,password) {
  
  if(!email || !password) {
    const err = new Error('email and password are required')
    err.status = 400;
    throw err;
  }
  const saltRound = 10
  const hashPassword = await bcrypt.hash(password,saltRound)
  const user = await prisma.user.create({
    data : {
      email,
      password : hashPassword
    }
  })
  return user;
}

async function loginUser(email,password) {
  if(!email || !password) {
    const err = new Error('email and password are required')
    err.status = 400; 
    return err;
  }

  const user = await prisma.user.findUnique({
    where:{email}
  })

  if(!user) {
    const err = new Error('user is not found')
    err.status = 400;
    return err;
  }
 
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch) {
    const err = new Error('Invalid credential');
    err.status = 400;
    return err;
  }

  return user;
}

module.exports = {
  createUser,
  loginUser
}

// async function createUser({ email,password }) {
//   // Basic validation at service level
//   if (!name || !rollnum) {
//     const err = new Error('name and rollnum are required');
//     err.status = 400;
//     throw err;
//   }

//   // Create user
//   const user = await prisma.user.create({
//     data: {
//       name,
//       rollnum,
//     },
//   });

//   return user;
// }

// module.exports = {
//   createUser,
// };

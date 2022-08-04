// import getLyraPositions from './src/lyra/getLyraPositions';

// const account = '0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155'

// const userPositions = getLyraPositions([account])

// console.log("userPositions", userPositions)



import addUpdateUser from "./src/script/addUpdateUser";

addUpdateUser(['0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155', '0x23c5c19d2ad460b7cd1ea5d6a2274a3c53733238'])


// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient()

// async function seedPosts() {
//   const post = await prisma.post.create({
//     data: {
//         title: 'First test post',
//         body: 'My first test post body'
//     }
//   })
// }

// seedPosts();

// async function fetchUsers() {
//     // ... you will write your Prisma Client queries here
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
//   }
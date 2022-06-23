import getPositions from "./lyra/getPositions/getPositions";

const account = '0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155'

const userPositions = getPositions([account])

console.log("userPositions", userPositions)






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
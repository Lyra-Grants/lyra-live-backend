import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function seedPosts() {
  const post = await prisma.post.create({
    data: {
        title: 'First test post',
        body: 'My first test post body'
    }
  })
}

seedPosts();

// async function fetchUsers() {
//     // ... you will write your Prisma Client queries here
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
//   }
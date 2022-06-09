import { PrismaClient } from '@prisma/client'
// import { 
// } from './db/seed'

const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")

mongoose
	.connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use("/api", routes) // new

		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})


export const prisma = new PrismaClient()

// async function fetchUsers() {
//   // ... you will write your Prisma Client queries here
// const allUsers = await prisma.user.findMany()
// console.log(allUsers)
// }

// Run command: npx ts-node index.ts

// async function main() {
//   await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@prisma.io',
//       posts: {
//         create: { title: 'Hello World' },
//       },
//       profile: {
//         create: { bio: 'I like turtles' },
//       },
//     },
//   })

//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//       profile: true,
//     },
//   })
//   console.dir(allUsers, { depth: null })
// }




// main()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

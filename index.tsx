import { PrismaClient } from '@prisma/client'
import { 
  seedCollection,
  seedAllCollections,
  seedAsset,
  seedCollectionAssets 
} from './db/seed'


// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./db");

// //middleware
// app.use(cors());
// app.use(express.json()); //req.body

export const prisma = new PrismaClient()

async function fetchUsers() {
  // ... you will write your Prisma Client queries here
const allUsers = await prisma.user.findMany()
console.log(allUsers)
}

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






// //ROUTES//

// //create a collection

// app.post("/collections", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newCollection = await pool.query(
//       "INSERT INTO collection (description) VALUES($1) RETURNING *",
//       [description]
//     );

//     res.json(newCollection.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //get all collections

// app.get("/collections", async (req, res) => {
//   try {
//     const allCollections = await pool.query("SELECT * FROM collection");
//     res.json(allCollections.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //get a collection

// app.get("/collections/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const collection = await pool.query("SELECT * FROM collection WHERE collection_id = $1", [
//       id
//     ]);

//     res.json(collection.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //update a collection

// app.put("/collections/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateCollection = await pool.query(
//       "UPDATE collection SET description = $1 WHERE collection_id = $2",
//       [description, id]
//     );

//     res.json("Collection was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //delete a collection

// app.delete("/collections/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteCollection = await pool.query("DELETE FROM collection WHERE collection_id = $1", [
//       id
//     ]);
//     res.json("Collection was deleted!");
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// app.listen(5000, () => {
//   console.log("server has started on port 5000");
// });

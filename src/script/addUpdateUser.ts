import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";
// import { Position, IPosition } from '../models/position'
import userRouter from '../controllers/userController';
import positionRouter from '../controllers/positionController';
// import { addUser } from "../models/user";

const accountsArray: string[] = ['fff', 'ggg']

// const addUpdateUser = async (accounts: string[]) => {
//     for (let i = 0; i < accounts.length; i++) {
//         addUser(accounts[i])

//         const userPositions = await getLyraPositions([accounts[i]])
    
//     }
// }

// export default addUpdateUser;


// fetch('/', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         user: {
//             name: "John",
//             email: "john@example.com"
//         }
//     })
// });
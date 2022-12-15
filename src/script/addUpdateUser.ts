import { User, blankUser } from '../models/user';
import { IUser } from '../interfaces'
import { connectDB, disconnectDB } from '../index'
import getLyra from "../utils/getLyra";
import Lyra from "@lyrafinance/lyra-js";
import getUserData from './getUserData';
import Logging from '../library/Logging';

const DB_URL = 'http://localhost:4000'

export const updateUser = async(lyra: Lyra, _user: IUser) => {
    const userData = await getUserData(lyra, _user);

    try { 
        const updateUserData = await User.findOneAndUpdate(userData);
        Logging.info(`>> Successfully updated user ${updateUserData.account}`);

        return updateUserData
    } catch (err) {
        console.log('failed to update user' + err);
    }
}

export const addUser = async(lyra: Lyra, userAccount: string) => {
    const userObject = Object.assign(blankUser, {account: userAccount})
    const newUserData = await getUserData(lyra, userObject);

    try { 
        const newUser = new User(newUserData);
        const saveUser = newUser.save();
        Logging.info(`>> Successfully added user ${saveUser.account}`);

        return saveUser;
    } catch (err) {
        console.log('failed to add user' + err);
    }
}

const addUpdateUser = async (accounts: string[]) => {

    await connectDB().then(async (mongoose) => {
    try {
            const collection = mongoose.model('User');
            const lyra: Lyra = getLyra();
            for (let i = 0; i < accounts.length; i++) {
                // TODO: Before updating a user, check subgraph events to see if any lyraPositions changed
                // Add each new user

                const user: IUser | null = await collection.findOne({account: accounts[i]});
                
                if (user) await updateUser(lyra, user);
                else if (user == null) await addUser(lyra, accounts[i])
            }
            return 
        } catch (err) {
            console.log('addUpdateUser error' + err);
        } finally {
            mongoose.connection.close();
            Logging.info('Disconnected from mongoDB.');
        }
    })

}

// const quickConnectDB = async(callback: VoidFunction)=> {

//     await connectDB().then(async () => {
//         try {
//             callback()
//         } catch (err) {
//             console.log('addUpdateUser error' + err);
//         } finally {
//             disconnectDB();
//         }
//     })
// }

export default addUpdateUser;




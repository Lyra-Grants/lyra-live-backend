import { User } from '../models/user';
import { IUser } from '../interfaces'
import { connectDB, disconnectDB } from '../index'
import getLyra from "../utils/getLyra";
import Lyra from "@lyrafinance/lyra-js";
import getUserData from './getUserData';

const DB_URL = 'http://localhost:4000'

export const updateUser = async(lyra: Lyra, _user: IUser) => {
    const userData = await getUserData(lyra, _user);

    try { 
        const updateUserData = await User.findOneAndUpdate(userData);
        console.log('successfully updated user', updateUserData);

        return updateUserData
    } catch (err) {
        console.log('failed to update user' + err);
    }
}

const blankUser: IUser = {
    account: "",
    duration: null,
    ensAvatar: null,
    ensName: null,
    favoriteMarket: null,
    realizedPnl: 0,
    realizedLongPnl: 0,
    unrealizedPnl: 0,
    unrealizedLongPnl: 0,
    realizedLongPnlPercentage: 0,
    unrealizedLongPnlPercentage: 0,
    totalPremiums: 0,
    totalLongPremiums: 0,
    totalNotionalVolume: 0,
    tradesCount: 0,
    positions: [], 
}

export const addUser = async(lyra: Lyra, userAccount: string) => {
    const userObject = Object.assign(blankUser, {account: userAccount})
    console.log("See blank user with account here =", userObject)
    const newUserData = await getUserData(lyra, userObject);

    try { 
        const newUser = new User(newUserData);
        const saveUser = newUser.save();
        console.log('successfully added user', saveUser);

        return saveUser;
    } catch (err) {
        console.log('failed to add user' + err);
    }
}

const addUpdateUser = async (accounts: string[]) => {
    const lyra: Lyra = getLyra();

    await connectDB().then(async () => {
        try {
            for (let i = 0; i < accounts.length; i++) {
                // TODO: Before updating a user, check subgraph events to see if any lyraPositions changed
                // Add each new user

                const user: IUser | null = await User.findOne({account: accounts[i]});
                
                if (user) await updateUser(lyra, user);
                else if (user == null) await addUser(lyra, accounts[i])
            }
        } catch (err) {
            console.log('addUpdateUser error' + err);
        } finally {
            disconnectDB();
        }
    })
}

export default addUpdateUser;




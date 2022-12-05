import { 
    addUser, 
    User, 
    IUser
} from '../models/user'
import userRouter from '../controllers/userController';
import positionRouter from '../controllers/positionController';
import { Response } from "express";
import server from '../../server'
import getLyra from "../utils/getLyra";
import Lyra from "@lyrafinance/lyra-js";
import getUserData from './getUserData';

const accountsArray: string[] = ['0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155', '0x23c5c19d2ad460b7cd1ea5d6a2274a3c53733238']
const DB_URL = 'http://localhost:4000'

const addUpdateUser = async (accounts: string[]) => {
    const lyra: Lyra = getLyra();

    async function updateUser (_user: IUser) {
        const userData = await getUserData(lyra, _user);

        try { 
            await User.findOneAndUpdate(userData);
        } catch (err) {
            console.log('err' + err);
            // res.status(500).send(err);
        }
    }

    await server().then(async (mongoose) => {
        try {
            for (let i = 0; i < accounts.length; i++) {
                // Before updating a user, check subgraph events to see if any lyraPositions changed

                // Add each new user

                const user: IUser | null = await User.findOne({account: accounts[i]});
                console.log("user =", user)

                if (user) updateUser(user);

                else if (user == null) {

                    const defaultUser: IUser = {
                        account: accounts[i],
                        duration: "",
                        ensAvatar: "", // getENSAvatar(accounts[i]),
                        ensName: "",  // getENS(accounts[i]),
                        favoriteAsset: "",
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

                    const newUserData = getUserData(lyra, defaultUser)

                    // IF USER DOES NOT EXIST, WE CAN SET A DEFAULT USER using Object.assign(default, new)

                    try { 
                        // User.init()
                        const newUser = new User(newUserData);

                    let saveUser = await newUser.save();
                    console.log('success', saveUser);
                    } catch (err) {
                        console.log('err' + err);
                        // res.status(500).send(err);
                    }
                }
            }
        } finally {
            mongoose.connection.close()
        }
    })
}

export default addUpdateUser;




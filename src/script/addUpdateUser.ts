import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";
import { Position, IPosition } from '../models/position'
import { addUser, User, IUser } from '../models/user'
import userRouter from '../controllers/userController';
import positionRouter from '../controllers/positionController';
import { Response } from "express";
// import { addUser } from "../models/user";
import server from '../../server'

const accountsArray: string[] = ['0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155', '0x23c5c19d2ad460b7cd1ea5d6a2274a3c53733238']
const DB_URL = 'http://localhost:4000'

const addUpdateUser = async (accounts: string[]) => {
    await server().then(async (mongoose) => {
        try {

            for (let i = 0; i < accounts.length; i++) {
                const userPositions = await getLyraPositions(accounts[i]);
        
                let currentPnl: number = 0;
        
                userPositions.map((position: IPosition) => {
                    if(position.realizedPnl) currentPnl = currentPnl + position.realizedPnl
                });
                console.log("current pnl =", currentPnl)
        
                const userExists = await User.findOne({account: accounts[i]});

                console.log("userExists =", userExists)


                if(!userExists.success) {
                    // Need to replace the status 400 below to match the error message from not finding the user in the DB
                    if(userExists.message === `status 400`) {
                        const newUser = new User({
                            // _id,
                            account: accounts[i],
                            // ens,
                            // avatar,
                            // trades_count,
                            // duration,
                            // favorite_asset,
                            pnl: currentPnl,
                            // positions,
                        });
                        await newUser.save();
                    }
                    else console.log(userExists.message)
                }
                else if (userExists.success) await User.findOneAndUpdate({
                    // _id,
                    account: accounts[i],
                    // ens,
                    // avatar,
                    // trades_count,
                    // duration,
                    // favorite_asset,
                    pnl: currentPnl,
                    // positions,
                });
            }

        } finally {
            mongoose.connection.close()
        }
    })
}

export default addUpdateUser;




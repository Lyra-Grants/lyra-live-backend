import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";
import { Position, IPosition } from '../models/position'
import { addUser, User} from '../models/user'
import { tUser } from '../types/user' 
import userRouter from '../controllers/userController';
import positionRouter from '../controllers/positionController';
import { Response } from "express";
import server from '../../server'

const accountsArray: string[] = ['0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155', '0x23c5c19d2ad460b7cd1ea5d6a2274a3c53733238']
const DB_URL = 'http://localhost:4000'

const addUpdateUser = async (accounts: string[]) => {
    await server().then(async (mongoose) => {
        try {
            for (let i = 0; i < accounts.length; i++) {
                const userPositions = await getLyraPositions(accounts[i]);
        
                let currentPnl: number = 0;
                let currentPnlPercent: number = 0;
        
                userPositions.map((position: IPosition) => {
                    if(position.realizedPnl) currentPnl = currentPnl + position.realizedPnl
                    // if(position.realizedPnlPercent) currentPnlPercent = currentPnlPercent + 
                });
                // console.log("current pnl =", currentPnl)
        
                const user: any = await User.findOne({account: accounts[i]});
                console.log("user =", user)

                if (user) await User.findOneAndUpdate({
                    // _id,
                    account: accounts[i],
                    // ens,
                    // avatar,
                    // trades_count,
                    // duration,
                    // favorite_asset,
                    pnl: currentPnl,
                    // positions,
                })
                else if (typeof user === 'undefined' || user == null) {

                    try { 
                        // User.init()
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
                    console.log('before save');
                    let saveUser = await newUser.save();
                    console.log(saveUser);
                    console.log('after save');
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




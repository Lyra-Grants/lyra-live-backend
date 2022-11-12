import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";
import { Position, IPosition } from '../models/position'
import { addUser, User} from '../models/user'
import { tUser } from '../types/user' 
import userRouter from '../controllers/userController';
import positionRouter from '../controllers/positionController';
import { Response } from "express";
import server from '../../server'
import { USDC_ADDRESS } from "@lyrafinance/lyra-js";

const accountsArray: string[] = ['0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155', '0x23c5c19d2ad460b7cd1ea5d6a2274a3c53733238']
const DB_URL = 'http://localhost:4000'

const addUpdateUser = async (accounts: string[]) => {

    let tradeCount: number = 0;
    let totalPnl: number = 0;
    let weightedPnlPercent: number = 0;
    let totalVolume: number = 0;
    let totalPnlPercent: number = 0;

    async function updateUser (user_) {
        await User.findOneAndUpdate(user_)}

    await server().then(async (mongoose) => {
        try {
            for (let i = 0; i < accounts.length; i++) {
                // Before updating a user, check subgraph events to see if any lyraPositions changed

                // Add each new user

                const user: any = await User.findOne({account: accounts[i]});
                console.log("user =", user)

                const userPositions = await getLyraPositions(accounts[i]);

                userPositions.map((position: IPosition) => {
                    if(position) tradeCount = tradeCount + 1;
                    if(position.realizedPnl) totalPnl = totalPnl + position.realizedPnl;

                    if(position.realizedPnlPercent && position.size && position.avgCostPerOption) {
                        totalVolume = totalVolume + position.size * position.avgCostPerOption;
                        if(position.size > 0 && position.avgCostPerOption > 0)
                            weightedPnlPercent = weightedPnlPercent + position.realizedPnlPercent / 
                                (position.size * position.avgCostPerOption);
                    };
                });

                // console.log("current pnl =", currentPnl)
                if(totalVolume > 0) totalPnlPercent = weightedPnlPercent / totalVolume
                else totalPnlPercent = 0;


                // USE AN OBJECT TO STORE THESE, NOT RANDOM NEW NAMES

                // IF USER DOES NOT EXIST, WE CAN SET A DEFAULT USER using Object.assign(default, new)

                // _id
                // account
                user.pnl = totalPnl;
                // ens
                // avatar
                user.trades_count = tradeCount;
                // duration
                // favorite_asset
                user.volume = totalVolume;
                user.pnlPercent = totalPnlPercent;
                // positions

        

                if (user) updateUser(user);
                else if (typeof user === 'undefined' || user == null) {

                    try { 
                        // User.init()
                        const newUser = new User({
                        // _id,
                        account: accounts[i],
                        // ens,
                        // avatar,
                        trades_count: tradeCount,
                        // duration,
                        // favorite_asset,
                        pnl: totalPnl,
                        volume: totalVolume,
                        pnlPercent: totalPnlPercent,
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




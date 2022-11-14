import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";
import { Position, IPosition } from '../models/position'
import { addUser, User} from '../models/user'
import { UserParams } from '../types/user' 
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

    async function updateUser (_user: UserParams) {
        await User.findOneAndUpdate(_user)
    }

    async function getUserPositions(_user: UserParams) {
        const userPositions = await getLyraPositions(_user.account);

        userPositions.map((position: IPosition) => {
            if(position) _user.trades_count = _user.trades_count + 1;
            if(position.realizedPnl) _user.pnl = _user.pnl + position.realizedPnl;

            if(position.realizedPnlPercent && position.size && position.avgCostPerOption) {
                _user.volume = _user.volume + position.size * position.avgCostPerOption;
                if(position.size > 0 && position.avgCostPerOption > 0)
                    weightedPnlPercent = weightedPnlPercent + position.realizedPnlPercent / 
                        (position.size * position.avgCostPerOption);
            };
        });

        // console.log("current pnl =", currentPnl)
        if(_user.volume > 0) _user.pnlPercent = weightedPnlPercent / _user.volume
        else _user.pnlPercent = 0;

        // _id?
        // account
        // _user.pnl = totalPnl;
        // ens?
        // avatar?
        // _user.trades_count = tradeCount;
        // duration
        // favorite_asset
        // _user.volume = totalVolume;
        // _user.pnlPercent = totalPnlPercent;
        // positions

        // IF USER DOES NOT EXIST, WE CAN SET A DEFAULT USER using Object.assign(default, new)



        return _user;

    }

    await server().then(async (mongoose) => {
        try {
            for (let i = 0; i < accounts.length; i++) {
                // Before updating a user, check subgraph events to see if any lyraPositions changed

                // Add each new user

                const user: UserParams | null = await User.findOne({account: accounts[i]});
                console.log("user =", user)

                if (user) getUserPositions(user);

                if (user) updateUser(user);
                else if (user == null) {

                    const defaultUser = {
                        account: accounts[i],
                        ens: "",  // getENS(accounts[i]),
                        avatar: "",  // getENSAvatar(accounts[i]),
                        trades_count:  0,
                        duration: "",
                        favorite_asset: "",
                        pnl: 0,
                        volume: 0,
                        pnlPercent: 0,
                        // positions: 
                    }

                    const newUserWithPositions = getUserPositions(defaultUser)

                    // IF USER DOES NOT EXIST, WE CAN SET A DEFAULT USER using Object.assign(default, new)

                    try { 
                        // User.init()
                        const newUser = new User(newUserWithPositions);

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




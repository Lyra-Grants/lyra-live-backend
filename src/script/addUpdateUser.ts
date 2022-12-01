import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";
// import { Position, IPosition, Position } from '../models/position'
import { addUser, User} from '../models/user'
import { UserParams } from '../types' 
import userRouter from '../controllers/userController';
import positionRouter from '../controllers/positionController';
import { Response } from "express";
import server from '../../server'
import getLyra from "../utils/getLyra";
import Lyra from "@lyrafinance/lyra-js";

const accountsArray: string[] = ['0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155', '0x23c5c19d2ad460b7cd1ea5d6a2274a3c53733238']
const DB_URL = 'http://localhost:4000'

import { 
    PositionData,
    Position,
    PositionFilter, 
    PositionLeaderboard, 
    PositionLeaderboardFilter
} from '@lyrafinance/lyra-js/src/position'

import fetchPositionDataByOwner from "@lyrafinance/lyra-js/src/utils/fetchPositionDataByOwner";

const addUpdateUser = async (accounts: string[]) => {
    const lyra: Lyra = getLyra();

    let weightedPnlPercent: number = 0;

    async function updateUser (_user: UserParams) {
        await User.findOneAndUpdate(_user)
    }

    async function getUserPositions(_user: UserParams) {

        const userPositions = await fetchPositionDataByOwner(lyra, _user.account);
        
        userPositions.map((_position: PositionData) => {


            // if(position) _user.trades_count = _user.trades_count + 1;
            // if(position.realizedPnl) _user.pnl = _user.pnl + position.realizedPnl;

            // if(position.realizedPnlPercent && position.size && position.avgCostPerOption) {
            //     _user.volume = _user.volume + position.size * position.avgCostPerOption;
            //     if(position.size > 0 && position.avgCostPerOption > 0)
            //         weightedPnlPercent = weightedPnlPercent + position.realizedPnlPercent / 
            //             (position.size * position.avgCostPerOption);
            };

            // for duration, map keep track of the oldest position

            // start a count for the position asset type
            // increase the count for each next asset
            // display the highest count as favorite_asset (trade #, not volume)
        });

        // console.log("current pnl =", currentPnl)
        if(_user.volume > 0) _user.pnlPercent = weightedPnlPercent / _user.volume
        else _user.pnlPercent = 0;


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




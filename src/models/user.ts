import { Schema, model, Types } from 'mongoose';
import { Position } from '@lyrafinance/lyra-js'
import { IUser } from '../interfaces';

// user model
const userSchema = new Schema({
    account: { 
        type: String, 
        required: true, 
        trim: true,
        unique: true
    },
    duration: String,
    ensAvatar: String,
    ensName: String,
    favoriteMarket: String,
    realizedPnl: Number,
    realizedLongPnl: Number,
    unrealizedPnl: Number,
    unrealizedLongPnl: Number,
    realizedLongPnlPercentage: Number,
    unrealizedLongPnlPercentage: Number,
    totalPremiums: Number,
    totalLongPremiums: Number,
    totalNotionalVolume: Number,
    tradesCount: Number,
    positions: Array<Position>,
    // positions: [{ type: Schema.Types.ObjectId, ref: 'livePosition' }],
})

export const User = model('User', userSchema)


export const blankUser: IUser = {
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

import { Schema, model, Types } from 'mongoose';
import { Position } from '@lyrafinance/lyra-js'

// user model
const userSchema = new Schema({
    // _id: Types.ObjectId,
    account: { 
        type: String, 
        lowercase: true, 
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

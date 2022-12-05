import { Schema, model, Types } from 'mongoose';
import { IPosition } from './livePosition';
import { Position, PositionData } from '@lyrafinance/lyra-js'

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
    favoriteAsset: String,
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

export interface IUser {
    // _id: Types.ObjectId,
    account: string;
    duration: string | null;
    ensAvatar: string | null;
    ensName: string | null;
    favoriteAsset: string | null;
    realizedPnl: number;
    realizedLongPnl: number;
    unrealizedPnl: number;
    unrealizedLongPnl: number;
    realizedLongPnlPercentage: number;
    unrealizedLongPnlPercentage: number;
    totalPremiums: number;
    totalLongPremiums: number;
    totalNotionalVolume: number;
    tradesCount: number;
    positions: Array<Position>;
  }

export const User = model('User', userSchema)


export const addUser = async(
    // _id: Types.ObjectId,
    account: string,
    duration: string,
    ensAvatar: string,
    ensName: string,
    favoriteAsset: string,
    realizedPnl: number,
    realizedLongPnl: number,
    unrealizedPnl: number,
    unrealizedLongPnl: number,
    realizedLongPnlPercentage: number,
    unrealizedLongPnlPercentage: number,
    totalPremiums: number,
    totalLongPremiums: number,
    totalNotionalVolume: number,
    tradesCount: number,
    positions: Array<Position>,
    // livePositions: Types.ObjectId[],
    ) => {
    const newUser = new User({
        // _id,
        account,
        duration,
        ensAvatar,
        ensName,
        favoriteAsset,
        realizedPnl,
        realizedLongPnl,
        unrealizedPnl,
        unrealizedLongPnl,
        realizedLongPnlPercentage,
        unrealizedLongPnlPercentage,
        totalPremiums,
        totalLongPremiums,
        totalNotionalVolume,
        tradesCount,
        positions,
        // livePositions,
    });
  
    return newUser.save();
  }

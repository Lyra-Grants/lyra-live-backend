import { Schema, model, Types } from 'mongoose';
// import { IPosition } from './livePosition';
import { Position } from '@lyrafinance/lyra-js'

export interface IUser {
    // _id: Types.ObjectId,
    account: string;
    duration: string | null;
    ensAvatar: string | null;
    ensName: string | null;
    favoriteMarket: string | null;
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
    positions?: Array<Position>;
  }

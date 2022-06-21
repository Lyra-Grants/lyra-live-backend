import { BigNumber } from '@ethersproject/bignumber'
import { Schema, model } from 'mongoose';

// interface IUser {
//     name: string;
//     email: string;
//     avatar?: string;
//   }

// position model
const positionSchema = new Schema({

    dataSource: { type: String },
    id: { type: String },
    owner: { type: String, required: true },
    size: { type: Number, required: true },
    isOpen: { type: Boolean, required: true },
    isCall: { type: Boolean, required: true },
    isLong: { type: Boolean, required: true },
    isSettled: { type: Boolean, required: true },
    isBaseCollateral: { type: Boolean },
    numTrades: { type: Number },
    avgCostPerOption: { type: BigNumber },
    pricePerOption: { type: BigNumber },
    realizedPnl: { type: BigNumber },
    realizedPnlPercent: { type: BigNumber },
    unrealizedPnl: { type: BigNumber },
    unrealizedPnlPercent: { type: BigNumber },
})

export const Position = model('Position', positionSchema)
module.exports = Position
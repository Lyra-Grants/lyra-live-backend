import { BigNumber } from '@ethersproject/bignumber'
import { Schema, model, Types } from 'mongoose';

export interface IPosition {
    _id?: Types.ObjectId;
    dataSource: String;
    positionId: Number;
    owner?: Types.ObjectId;
    size: BigNumber;
    isOpen: Boolean;
    isCall: Boolean;
    isLong: Boolean;
    isSettled: Boolean;
    isBaseCollateral?: Boolean;
    numTrades?: Number;
    avgCostPerOption?: BigNumber;
    pricePerOption?: BigNumber;
    realizedPnl?: BigNumber;
    realizedPnlPercent?: BigNumber;
    unrealizedPnl?: BigNumber;
    unrealizedPnlPercent?: BigNumber;
  }

// position model
const positionSchema = new Schema<IPosition>({
    _id: { type: Types.ObjectId },
    dataSource: { type: String },
    positionId: { type: Number },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    size: { type: BigNumber, required: true },
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
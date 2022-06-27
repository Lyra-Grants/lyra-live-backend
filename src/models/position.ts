import { Schema, model, Types } from 'mongoose';

export interface IPosition {
    _id?: Types.ObjectId;
    dataSource: String;
    positionId: Number;
    owner?: Types.ObjectId;
    size: String;
    isOpen: Boolean;
    isCall: Boolean;
    isLong: Boolean;
    isSettled: Boolean;
    isBaseCollateral?: Boolean;
    numTrades?: Number;
    avgCostPerOption?: String;
    pricePerOption?: String;
    realizedPnl?: String;
    realizedPnlPercent?: String;
    unrealizedPnl?: String;
    unrealizedPnlPercent?: String;
  }

// position model
const positionSchema = new Schema<IPosition>({
    _id: { type: Types.ObjectId },
    dataSource: { type: String },
    positionId: { type: Number },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    size: { type: String, required: true },
    isOpen: { type: Boolean, required: true },
    isCall: { type: Boolean, required: true },
    isLong: { type: Boolean, required: true },
    isSettled: { type: Boolean, required: true },
    isBaseCollateral: { type: Boolean },
    numTrades: { type: Number },
    avgCostPerOption: { type: String },
    pricePerOption: { type: String },
    realizedPnl: { type: String },
    realizedPnlPercent: { type: String },
    unrealizedPnl: { type: String },
    unrealizedPnlPercent: { type: String },
})

export const Position = model('Position', positionSchema)
module.exports = Position
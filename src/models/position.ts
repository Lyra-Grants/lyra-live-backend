import { Schema, model, Types } from 'mongoose';

// position model
const positionSchema = new Schema({
    _id: Types.ObjectId,
    dataSource: String,
    positionId: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    size: String,
    isOpen: Boolean,
    isCall: Boolean,
    isLong: Boolean,
    isSettled: Boolean,
    isBaseCollateral: Boolean,
    numTrades: Number,
    avgCostPerOption: String,
    pricePerOption: String,
    realizedPnl: String,
    realizedPnlPercent: String,
    unrealizedPnl: String,
    unrealizedPnlPercent: String,
})

export const Position = model('Position', positionSchema)


export const addPosition = async(
  _id: Types.ObjectId,
  dataSource: String,
  positionId: Number,
  owner: Types.ObjectId,
  size: String,
  isOpen: Boolean,
  isCall: Boolean,
  isLong: Boolean,
  isSettled: Boolean,
  isBaseCollateral: Boolean,
  numTrades: Number,
  avgCostPerOption: String,
  pricePerOption: String,
  realizedPnl: String,
  realizedPnlPercent: String,
  unrealizedPnl: String,
  unrealizedPnlPercent: String,
  ) => {
  const newPosition = new Position({
    _id,
    dataSource,
    positionId,
    owner,
    size,
    isOpen,
    isCall,
    isLong,
    isSettled,
    isBaseCollateral,
    numTrades,
    avgCostPerOption,
    pricePerOption,
    realizedPnl,
    realizedPnlPercent,
    unrealizedPnl,
    unrealizedPnlPercent,
  });

  return newPosition.save();
}

export interface IPosition {
    _id?: Types.ObjectId;
    dataSource?: String;
    positionId: Number;
    owner?: Types.ObjectId;
    size?: String;
    isOpen?: Boolean;
    isCall?: Boolean;
    isLong?: Boolean;
    isSettled?: Boolean;
    isBaseCollateral?: Boolean;
    numTrades?: Number;
    avgCostPerOption?: String;
    pricePerOption?: String;
    realizedPnl?: String;
    realizedPnlPercent?: String;
    unrealizedPnl?: String;
    unrealizedPnlPercent?: String;
  }
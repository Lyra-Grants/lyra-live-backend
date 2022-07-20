import { Schema, model, Types } from 'mongoose';

// position model
const positionSchema = new Schema({
    _id: Types.ObjectId,
    dataSource: String,
    positionId: { type: Number, required: true, unique: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    size: Number,
    isOpen: Boolean,
    isCall: Boolean,
    isLong: Boolean,
    isSettled: Boolean,
    isBaseCollateral: Boolean,
    numTrades: Number,
    avgCostPerOption: Number,
    pricePerOption: Number,
    realizedPnl: Number,
    realizedPnlPercent: Number,
    unrealizedPnl: Number,
    unrealizedPnlPercent: Number,
})

export const Position = model('Position', positionSchema)


export const addPosition = async(
  _id: Types.ObjectId,
  dataSource: string,
  positionId: number,
  owner: Types.ObjectId,
  size: number,
  isOpen: boolean,
  isCall: boolean,
  isLong: boolean,
  isSettled: boolean,
  isBaseCollateral: boolean,
  numTrades: number,
  avgCostPerOption: number,
  pricePerOption: number,
  realizedPnl: number,
  realizedPnlPercent: number,
  unrealizedPnl: number,
  unrealizedPnlPercent: number,
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
    dataSource?: string;
    positionId: number;
    owner?: Types.ObjectId;
    size?: number;
    isOpen?: boolean;
    isCall?: boolean;
    isLong?: boolean;
    isSettled?: boolean;
    isBaseCollateral?: boolean;
    numTrades?: number;
    avgCostPerOption?: number;
    pricePerOption?: number;
    realizedPnl?: number;
    realizedPnlPercent?: number;
    unrealizedPnl?: number;
    unrealizedPnlPercent?: number;
  }
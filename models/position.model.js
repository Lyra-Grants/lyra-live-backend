import { BigNumber } from '@ethersproject/bignumber'
// position model

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({

    __source: pos.__source,
    id: pos.id,
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

const Position = mongoose.model('Position', positionSchema)
module.exports = Position
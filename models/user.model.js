// user model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    account: { type: String, required: true },
    ens: { type: String },
    trades_count: { type: Number },
    duration: { type: String },
    favorite_asset: { type: String },
    pnl: { type: Number },

    positions: {
        __source: pos.__source,
        id: pos.id,
        size: pos.size,
        isOpen: pos.isOpen,
        isCall: pos.isCall,
        isLong: pos.isLong,
        isSettled: pos.isSettled,
        isBaseCollateral: pos.collateral?.isBase,
        numTrades: pos.trades().length,
        avgCostPerOption: pos.avgCostPerOption(),
        pricePerOption: pos.pricePerOption,
        realizedPnl: pos.realizedPnl(),
        realizedPnlPercent: pos.realizedPnlPercent(),
        unrealizedPnl: pos.unrealizedPnl(),
        unrealizedPnlPercent: pos.unrealizedPnlPercent(),
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User
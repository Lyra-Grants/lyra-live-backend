import { Schema, model } from 'mongoose';

interface IUser {
    account: String;
    ens?: String;
    trades_count:  Number;
    duration: String;
    favorite_asset: String;
    pnl: Number;
    positions?: any;
}

// user model
const userSchema = new Schema<IUser>({
    account: { type: String, required: true },
    ens: { type: String },
    trades_count: { type: Number },
    duration: { type: String },
    favorite_asset: { type: String },
    pnl: { type: Number },
    // positions: { type:  },
})

const User = model('User', userSchema)
module.exports = User
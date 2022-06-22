import { Schema, model, Types } from 'mongoose';

interface IUser {
    _id?: Types.ObjectId;
    account: String;
    ens?: String;
    avatar?: String;
    trades_count?:  Number;
    duration?: String;
    favorite_asset?: String;
    pnl?: Number;
    position?: Types.ObjectId;
}

// user model
const userSchema = new Schema<IUser>({
    _id: { type: Types.ObjectId },
    account: { type: String, required: true },
    ens: { type: String },
    avatar: { type: String },
    trades_count: { type: Number },
    duration: { type: String },
    favorite_asset: { type: String },
    pnl: { type: Number },
    position: { type: Schema.Types.ObjectId, ref: 'Position' },
})

export const User = model('User', userSchema)
module.exports = User
import { Schema, model, Types } from 'mongoose';

// user model
const userSchema = new Schema({
    _id: Types.ObjectId,
    account: { type: String, required: true, unique: true },
    ens: String,
    avatar: String,
    trades_count: Number,
    duration: String,
    favorite_asset: String,
    pnl: Number,
    positions: [{ type: Schema.Types.ObjectId, ref: 'Position' }],
})

export const User = model('User', userSchema)


export const addUser = async(
    _id: Types.ObjectId,
    account: String,
    ens: String,
    avatar: String,
    trades_count:  Number,
    duration: String,
    favorite_asset: String,
    pnl: Number,
    positions: Types.ObjectId[],
    ) => {
    const newUser = new User({
        _id,
        account,
        ens,
        avatar,
        trades_count,
        duration,
        favorite_asset,
        pnl,
        positions,
    });
  
    return newUser.save();
  }

export interface IUser {
    _id?: Types.ObjectId;
    account: String;
    ens?: String;
    avatar?: String;
    trades_count?:  Number;
    duration?: String;
    favorite_asset?: String;
    pnl?: Number;
    positions?: Types.ObjectId[];
}

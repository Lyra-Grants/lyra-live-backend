import { Types } from 'mongoose';

export type tUser = {
    _id: Types.ObjectId;
    account: String;
    ens: String;
    avatar: String;
    trades_count:  Number;
    duration: String;
    favorite_asset: String;
    pnl: Number;
    positions: Types.ObjectId[];
}
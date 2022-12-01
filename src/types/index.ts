import { Types } from 'mongoose';


export type UserParams = {
    _id?: Types.ObjectId;
    account: string;
    ens?: string;
    avatar?: string;
    trades_count:  number;
    duration: string;
    favorite_asset: string;
    pnl: number;
    volume: number;
    pnlPercent: number;
    positions?: Types.ObjectId[];
}

// export type PositionData = PositionData_;


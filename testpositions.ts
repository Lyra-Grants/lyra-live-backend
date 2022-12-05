import getLyraPositions from "./src/lyra/getLyraPositions/getLyraPositions";
import { 
    PositionData,
    Position,
    type PositionFilter, 
    type PositionLeaderboard,
    type PositionLeaderboardFilter
} from '@lyrafinance/lyra-js/src/position';


// getLyraPositions('0x23c5c19d2ad460b7cd1ea5d6a2274a3c53733238')
// getLyraPositions('0x90c6577fb57edf1921ae3f7f45df7a31e46b9155')


// openPositions(owner: string): Promise<Position[]>;
// positions(owner: string): Promise<Position[]>;
// trades(owner: string, options?: SortEventOptions): Promise<TradeEvent[]>;
// collateralUpdates(owner: string, options?: SortEventOptions): Promise<CollateralUpdateEvent[]>;
// position(marketAddressOrName: string, positionId: number): Promise<Position>;
// account(address: string): Account;


import getLeaderboard from "./src/script/getLeaderboard";

getLeaderboard();

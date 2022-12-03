import getLyra from '../utils/getLyra'
import { IPosition } from '../../models/livePosition'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'


const getLyraPositions = async (account: string) => {
    const lyra = getLyra();

    const positions = await lyra.positions(account);
    // const openPositions = await lyra.openPositions(account);

    const BNtoNumber = (BN: BigNumber) => {
        // Change the 18 (ether) to 9 for gwei
        return Number(ethers.utils.formatUnits(BN, 18))
    }
    // let valueBN: BigNumber = ethers.BigNumber.from(value)

    const userPositions = await positions.map((pos): IPosition => ({
        dataSource: pos.__source,
        positionId: pos.id,
        size: BNtoNumber(pos.size),
        isOpen: pos.isOpen,
        isCall: pos.isCall,
        isLong: pos.isLong,
        isSettled: pos.isSettled,
        isBaseCollateral: pos.collateral?.isBase,
        numTrades: pos.trades().length,
        avgCostPerOption: BNtoNumber(pos.avgCostPerOption()),
        pricePerOption: BNtoNumber(pos.pricePerOption),
        realizedPnl: BNtoNumber(pos.realizedPnl()),
        realizedPnlPercent: BNtoNumber(pos.realizedPnlPercent()),
        unrealizedPnl: BNtoNumber(pos.unrealizedPnl()),
        unrealizedPnlPercent: BNtoNumber(pos.unrealizedPnlPercent()),
    }));
    console.log(">>> userPositions =",userPositions)
    
    return userPositions;
}

export default getLyraPositions;
import getLyra from '../utils/getLyra'
import { IPosition } from '../../models/position'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'


const getLyraPosition = async (account: string) => {
    const lyra = getLyra();

    const positions = await lyra.positions(account);
    // const openPositions = await lyra.openPositions(account);

    const BNtoNumber = (BN: BigNumber) => {
        // Change the 18 (ether) to 9 for gwei
        return Number(ethers.utils.formatUnits(BN, 18))
    }
    // let valueBN: BigNumber = ethers.BigNumber.from(value)




    const args = await yargs(argv).options({
        market: { type: 'string', alias: 'm', require: true },
        id: { type: 'string', alias: 'i', require: true },
    }).argv
    const position = await lyra.position(args.market, parseInt(args.id))
    printObject('Position', {
        __source: position.__source,
        marketAddress: position.marketAddress,
        owner: position.owner,
        isOpen: position.isOpen,
        isCall: position.isCall,
        isLong: position.isLong,
        isSettled: position.isSettled,
        isLiquidated: position.isLiquidated,
        size: position.sizeBeforeClose(),
        strikePrice: position.strikePrice,
        breakEven: position.breakEven(),
        avgCost: position.averageCostPerOption(),
        pricePerOption: position.pricePerOption,
        isInTheMoney: position.isInTheMoney,
        trades: position.trades().map(trade => ({
        hash: trade.transactionHash,
        size: trade.size,
        cost: trade.premium,
        isBuy: trade.isBuy,
        isOpen: trade.isOpen,
        collateral: trade.collateralValue,
        })),
        collatUpdates: position.collateralUpdates().map(collatUpdate => ({
        hash: collatUpdate.transactionHash,
        amount: collatUpdate.amount,
        value: collatUpdate.value,
        })),
        collateral: position.collateral,
        settle: {
        hash: position.settle()?.transactionHash,
        settlement: position.settle()?.settlement,
        returnedCollateralValue: position.settle()?.returnedCollateralValue,
        },
        pnl: position.pnl(),
    })

    ///////////

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

export default getLyraPosition;
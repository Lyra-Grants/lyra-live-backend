import yargs from 'yargs'
import getLyra from '../utils/getLyra'
import getSigner from '../utils/getSigner'
import { IPosition } from '../../models/position'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'

// const lyra = new Lyra()

// I would get a trader's positions using lyra.positions() 
// and add up position.realizedPnl() for net realized profits
// You can also get a rolling average of position.realizedPnlPercentage() 
// based on trade size to get an idea of their profits relative to capital

const getLyraPositions = async (argv: string[]) => {
    const lyra = getLyra()

    // const signer = getSigner(lyra)
    const args = await yargs(argv).options({
    account: { type: 'string', alias: 'a', require: false },
    open: { type: 'boolean', alias: 'o', require: false },
    }).argv

    const isOpen = args.open
    const account = args.account ?? '0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155'
    // const account = args.account ?? signer.address
    const positions = isOpen ? await lyra.openPositions(account) : await lyra.positions(account)

    const BNtoNumber = (BN: BigNumber) => {
        // Change the 18 (ether) to 9 for gwei
        return ethers.utils.formatUnits(BN, 18) 
    }
    // let valueBN: BigNumber = ethers.BigNumber.from(value)

    const userPositions = await positions.map((pos): IPosition => ({
        dataSource: pos.__source,
        positionId: pos.id,
        // owner?: ,
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
    }))
    return userPositions;
}

export default getLyraPositions;
import yargs from 'yargs'

import printObject from '@lyrafinance/lyra-js/src/utils/printObject'
import getLyra from '../utils/getLyra'
import getSigner from '../utils/getSigner'

// const lyra = new Lyra()

// I would get a trader's positions using lyra.positions() 
// and add up position.realizedPnl() for net realized profits
// You can also get a rolling average of position.realizedPnlPercentage() 
// based on trade size to get an idea of their profits relative to capital

const Positions = async (argv: string[]) => {
    const lyra = getLyra()

    const signer = getSigner(lyra)
    const args = await yargs(argv).options({
    account: { type: 'string', alias: 'a', require: false },
    open: { type: 'boolean', alias: 'o', require: false },
    }).argv

    const isOpen = args.open
    const account = args.account ?? signer.address
    const positions = isOpen ? await lyra.openPositions(account) : await lyra.positions(account)

    printObject(
    positions.map(pos => ({
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
    }))
    )
}

export default Positions;
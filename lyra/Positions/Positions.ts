import Lyra from '@lyrafinance/lyra-js'

const lyra = new Lyra()

// I would get a trader's positions using lyra.positions() 
// and add up position.realizedPnl() for net realized profits
// You can also get a rolling average of position.realizedPnlPercentage() 
// based on trade size to get an idea of their profits relative to capital

// Fetch all markets
const Positions = async (owner: string) => {

    const userPositions = await lyra.positions(owner)

    
    const userPnL = position.realizedPnl()
    position.realizedPnlPercentage()

    // console.log(
    // markets.map(market => ({
    //     address: market.address,
    //     name: market.name,
    //     // List all live boards (expiries)
    //     expiries: market.liveBoards().map(board => ({
    //     id: board.id,
    //     expiryTimestamp: board.expiryTimestamp,
    //     // List all strikes
    //     strikes: board.strikes().map(strike => ({
    //         id: strike.id,
    //         strikePrice: strike.strikePrice,
    //     })),
    //     })),
    // }))
    // )
}

export default Positions;
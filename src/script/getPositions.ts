import getLyra from "../utils/getLyra";
import Lyra from "@lyrafinance/lyra-js";
import { Position, PositionData } from '@lyrafinance/lyra-js'
import fromBigNumber from "../utils/fromBigNumber";
import { ZERO_BN } from "../constants/bn";


const getPositions = async (account: string) => {
    const lyra: Lyra = getLyra();
    const positions = await lyra.positions(account);

    // !! ADD TRY CATCH 

    const formattedPositions = () => {
        positions.map((_position: Position) => {
            const { realizedPnl, realizedPnlPercentage, settlementPnl, settlementPnlPercentage } = _position.pnl()

            const pnl = _position.isSettled ? settlementPnl : realizedPnl
            const pnlPercentage = _position.isSettled ? settlementPnlPercentage : realizedPnlPercentage

            const firstTrade = _position.firstTrade()
            const lastTrade = _position.lastTrade()
            const lastUpdatedTimestamp = _position.isSettled ? _position.expiryTimestamp : lastTrade?.timestamp ?? 0

            return {
                _position,
                lastUpdatedTimestamp,
                expiryTimestamp: _position.expiryTimestamp,
                openPrice: fromBigNumber(_position.averageCostPerOption()),
                openSpotPrice: fromBigNumber(firstTrade?.spotPrice ?? ZERO_BN),
                closePrice: _position.isSettled ? 0 : fromBigNumber(lastTrade?.pricePerOption ?? ZERO_BN),
                closeSpotPrice: fromBigNumber(
                _position.isSettled ? _position.spotPriceAtExpiry ?? ZERO_BN : lastTrade?.spotPrice ?? ZERO_BN
                ),
                pnl: fromBigNumber(pnl),
                pnlPercentage: fromBigNumber(pnlPercentage)
            }
        })
    }

    return formattedPositions;
}

export default getPositions;
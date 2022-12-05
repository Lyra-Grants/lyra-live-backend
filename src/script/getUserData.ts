import { IUser } from '../models/user'
import Lyra from "@lyrafinance/lyra-js";
import fromBigNumber from "../utils/fromBigNumber";
import { ZERO_BN, UNIT } from "../constants/bn";

export default async function getUserData(lyra: Lyra, _user: IUser) {

    const positions = await lyra.positions(_user.account);

    let accountUnrealizedPnl = ZERO_BN
    let accountRealizedPnl = ZERO_BN
    let accountRealizedLongPnl = ZERO_BN
    let accountUnrealizedLongPnl = ZERO_BN
    let totalLongAverageCloseOrSettleCost = ZERO_BN
    let totalLongAverageOpenCost = ZERO_BN
    let totalNotionalVolume = ZERO_BN
    let totalPremiums = ZERO_BN
    let totalLongPremiums = ZERO_BN

    positions
      // Ignore transferred positions in P&L calcs
      .filter(p => p.transfers().length === 0)
      .forEach(position => {
        const { isLong, isSettled } = position
        const { realizedPnl, settlementPnl, unrealizedPnl, totalAverageCloseCost, totalAverageOpenCost } =
          position.pnl()
        accountRealizedPnl = accountRealizedPnl.add(realizedPnl).add(settlementPnl)
        accountUnrealizedPnl = accountUnrealizedPnl.add(unrealizedPnl)
        if (isLong) {
          accountRealizedLongPnl = accountRealizedLongPnl.add(realizedPnl).add(settlementPnl)
          accountUnrealizedLongPnl = accountUnrealizedLongPnl.add(unrealizedPnl)
          totalLongAverageCloseOrSettleCost = totalLongAverageCloseOrSettleCost.add(totalAverageCloseCost)
          if (isSettled) {
            // Include avg open cost on settled positions
            totalLongAverageCloseOrSettleCost = totalLongAverageCloseOrSettleCost.add(totalAverageOpenCost)
          } else {
            // Ignore avg open cost on settled positions
            totalLongAverageOpenCost = totalLongAverageOpenCost.add(totalAverageOpenCost)
          }
          totalLongPremiums = totalLongPremiums.add(
            position.trades().reduce((sum, trade) => sum.add(trade.premium), ZERO_BN)
          )
        }
        totalNotionalVolume = totalNotionalVolume.add(
          position.trades().reduce((sum, trade) => {
            const volume = trade.strikePrice.mul(trade.size).div(UNIT)
            return sum.add(volume)
          }, ZERO_BN)
        )
        totalPremiums = totalPremiums.add(position.trades().reduce((sum, trade) => sum.add(trade.premium), ZERO_BN))
      })

    const realizedLongPnlPercentage = totalLongAverageCloseOrSettleCost.gt(0)
      ? accountRealizedLongPnl.mul(UNIT).div(totalLongAverageCloseOrSettleCost)
      : ZERO_BN

    const unrealizedLongPnlPercentage = totalLongAverageOpenCost.gt(0)
      ? accountUnrealizedLongPnl.mul(UNIT).div(totalLongAverageOpenCost)
      : ZERO_BN

    //   _user.duration = 
    //   _user.ensAvatar = 
    //   _user.ensName = 
    //   _user.favoriteAsset = 
    _user.realizedPnl = fromBigNumber(accountRealizedPnl);
    _user.unrealizedPnl = fromBigNumber(accountUnrealizedPnl);
    _user.realizedLongPnl = fromBigNumber(accountRealizedLongPnl);
    _user.realizedLongPnlPercentage;
    _user.unrealizedLongPnl = fromBigNumber(accountUnrealizedLongPnl);
    _user.unrealizedLongPnlPercentage;
    _user.totalPremiums = fromBigNumber(totalPremiums);
    _user.totalLongPremiums = fromBigNumber(totalLongPremiums);
    _user.totalNotionalVolume = fromBigNumber(totalNotionalVolume);
    _user.tradesCount = positions.length;
    _user.positions = positions;

    return _user;
}
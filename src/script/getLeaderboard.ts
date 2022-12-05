import Lyra from '@lyrafinance/lyra-js'

export default async function getLeaderboard() {

const lyra = new Lyra

const getLeaderboard = await lyra.leaderboard({
    minPositionIds: {
      eth: 4490,
      btc: 178,
    },
  });

  console.log('pid', getLeaderboard.length)
}
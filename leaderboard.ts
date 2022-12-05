import getLyra from './src/utils/getLyra'

const leaderboard = async () => {
  const lyra = getLyra()

  const leaderboard = await lyra.leaderboard({
    minPositionIds: {
      eth: 4490,
      btc: 178,
    },
  })
  console.log('pid', leaderboard.length)

}

export default leaderboard;
// import { Deployment } from '@lyrafinance/lyra-js/src/constants/contracts'
import { Deployment } from '../../constants/contracts'
import Lyra from '@lyrafinance/lyra-js'

export default function getLyra(): Lyra {
  const deploymentIndex = process.argv.findIndex(arg => arg === '-d' || arg === '--deployment')
  const deployment = deploymentIndex != -1 ? (process.argv[deploymentIndex + 1] as Deployment) : Deployment.Mainnet
  const lyra = new Lyra(deployment)
  return lyra
}

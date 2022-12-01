import { StaticJsonRpcProvider } from '@ethersproject/providers'

import { Deployment } from '@lyrafinance/lyra-js/src/constants/contracts'
import Lyra from '@lyrafinance/lyra-js'
import getLyraDeploymentChainId from '@lyrafinance/lyra-js/src/utils/getLyraDeploymentChainId'

export default function getLyra(): Lyra {
  const deploymentIndex = process.argv.findIndex(arg => arg === '-d' || arg === '--deployment')
  const deployment = deploymentIndex != -1 ? (process.argv[deploymentIndex + 1] as Deployment) : Deployment.Mainnet
  const chainId = getLyraDeploymentChainId(deployment)
  const rpcUrl = process.env.RPC_URL ?? 'https://mainnet.optimism.io'
  const lyra = new Lyra({ provider: new StaticJsonRpcProvider(rpcUrl, chainId) })
  return lyra
}
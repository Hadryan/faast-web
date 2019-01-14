/* global SITE_URL, API_URL */
import highCharts from './highcharts'
import tokenFunctionSignatures from './tokenFunctionSignatures'
import walletTypes from './walletTypes'
import BigNumber from 'bignumber.js'

BigNumber.config({ FORMAT: {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0
} })

const nodeEnv = process.env.NODE_ENV
const isDev = nodeEnv === 'development'
const isProd = nodeEnv === 'production'
const isIpfs = Boolean(process.env.IPFS)

export default {
  nodeEnv,
  isDev,
  isProd,
  isIpfs,
  logLevel: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
  web3Provider: 'https://mainnet.infura.io/v3/6c0b732cae674991b713c9b18ffdd0d3',
  ethereumChainId: 1,
  siteUrl: SITE_URL || 'https://faa.st',
  apiUrl: API_URL || 'https://api.faa.st',
  encrOpts: {
    kdf: 'scrypt',
    n: 1024
  },
  defaultPortfolioId: 'default',
  navbar: {
    expand: 'md',
  },
  affiliateSettings: {
    affiliate_margin: 0.2, 
    affiliate_id: 'DLABdEEmJUcLfLs2Y7jkkZntvdENT3nL',
  },
  explorerUrls: {
    BTC: 'https://blockchain.info',
    ETH: 'https://etherscan.io',
    LTC: 'https://live.blockcypher.com/ltc',
    BCH: 'https://explorer.bitcoin.com/bch',
  },
  bip21Prefixes: {
    BTC: 'bitcoin',
    BCH: 'bitcoincash',
    LTC: 'litecoin',
    ETH: 'ethereum'
  },
  defaultWatchlist: ['BTC', 'ETH', 'BCH', 'EOS', 'LTC', 'USDT', 'XMR', 'TRX', 'DASH', 'MIOTA'],
  walletTypes,
  web3WalletTypes: Object.entries(walletTypes)
    .filter(([, { web3 }]) => web3)
    .map(([type]) => type),
  highCharts,
  tokenFunctionSignatures
}

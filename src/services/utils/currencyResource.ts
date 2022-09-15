import { IconNames } from '../../components';

type CurrencyResourceByAsset = (asset: string) => {
  iconName?: IconNames;
  color?: string;
};
/* eslint-disable import/prefer-default-export */
export const getIlkResourceByToken: CurrencyResourceByAsset = (
  asset: string,
) => {
  const assetArray = asset.split('-');

  if (!assetArray.length) {
    return { color: undefined, iconName: undefined };
  }

  const key = assetArray[0] === 'PSM' ? assetArray[1] : assetArray[0];

  switch (key) {
    case 'USDC':
      return { color: '#2775CA', iconName: 'usdc' };
    case 'ETH':
      return { color: '#8A92B2', iconName: 'ethereum' };
    case 'USDP':
      return { color: '#005120', iconName: 'paxusd' };
    case 'PSM':
      return { color: '#005120', iconName: 'paxusd' };
    case 'WBTC':
      return { color: '#F09242', iconName: 'wbtc' };

    case 'BNB':
      return { color: '#F3BA2F', iconName: 'bnb' };
    case 'BTC':
      return { color: '#F7931A', iconName: 'btc' };
    case 'DIRECT-AAVEV2-DAI':
      return { color: '#F5AC37', iconName: 'dai' };
    case 'CARDANO':
      return { color: '#3CC8C8', iconName: 'cardano' };
    case 'BAT':
      return { color: '#DE4D2A', iconName: 'bat' };
    case 'TUSD':
      return { color: '#002868', iconName: 'tusd' };
    case 'KNC':
      return { color: '#31CB9E', iconName: 'knc' };
    case 'ZRX':
      return { color: '#004466', iconName: 'zrx' };
    case 'MANA':
      return { color: '#FF6957', iconName: 'mana' };
    case 'USDT':
      return { color: '#1BA27A', iconName: 'usdt' };
    case 'COMP':
      return { color: '#01D494', iconName: 'comp' };
    case 'LRC':
      return { color: '#1C60FF', iconName: 'lrc' };
    case 'LINK':
      return { color: '#2A5ADA', iconName: 'link' };
    case 'BAL':
      return { color: '#1E1E1E', iconName: 'bal' };
    case 'YFI':
      return { color: '#006AE3', iconName: 'yfi' };
    case 'GUSD':
      return { color: '#00DCFA', iconName: 'gusd' };
    case 'UNI':
      return { color: '#FF007A', iconName: 'uni' };
    case 'RENBTC':
      return { color: '#F7931A', iconName: 'renbtc' };
    case 'AAVE':
      return { color: '#A85AA2', iconName: 'aave' };
    case 'MATIC':
      return { color: '#2891F9', iconName: 'matic' };
    // case 'DAI':
    // case 'ADAI':
    // case 'PAXUSD':
    // case 'PAX':
    default:
      return { color: '#D1EEEB', iconName: 'defaultIlk' };
  }
};

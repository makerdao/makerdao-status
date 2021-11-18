import { IconNames } from '../../components';

type CurrencyResourceByAsset = (asset: string) => {
  iconName?: IconNames;
  color?: string;
};
/* eslint-disable import/prefer-default-export */
export const getCurrencyResourceByAsset: CurrencyResourceByAsset = (
  asset: string,
) => {
  const assetArray = asset.split('-');
  if (!assetArray.length) {
    return { color: undefined, iconName: undefined };
  }
  const key = assetArray[0];
  switch (key) {
    case 'ETH':
      return { color: '#606061', iconName: 'ethereum' };
    case 'USDC':
      return { color: 'rgb(39, 117, 202)', iconName: 'usdc' };
    case 'TUSD':
      return { color: '#002868', iconName: 'tusd' };
    case 'USDT':
      return { color: 'rgb(80, 175, 149)', iconName: 'usdt' };
    case 'PAXUSD':
      return { color: undefined, iconName: undefined };
    case 'WBTC':
      return { color: 'rgb(240, 146, 66)', iconName: 'wbtc' };
    case 'BAT':
      return { color: 'rgb(255, 80, 0)', iconName: 'bat' };
    case 'KNC':
      return { color: undefined, iconName: undefined };
    case 'ZRX':
      return { color: 'rgb(35, 24, 21)', iconName: 'zrx' };
    case 'MANA':
      return { color: 'rgb(252, 153, 101)', iconName: 'mana' };
    case 'LRC':
      return { color: 'rgb(42, 182, 246)', iconName: 'lrc' };
    case 'COMP':
      return { color: 'rgb(0, 211, 149)', iconName: 'comp' };
    case 'LINK':
      return { color: 'rgb(42, 90, 218)', iconName: 'link' };
    case 'BAL':
      return { color: 'rgb(30, 30, 30)', iconName: 'bal' };
    case 'YFI':
      return { color: 'rgb(0, 106, 227)', iconName: 'yfi' };
    case 'GUSD':
      return { color: 'rgb(0, 220, 250)', iconName: 'gusd' };
    case 'RENBTC':
      return { color: undefined, iconName: undefined };
    case 'UNI':
      return { color: '#ff007a', iconName: 'uni' };
    case 'AAVE':
      return { color: '#b6509e', iconName: 'aave' };
    case 'UNIV2DAIETH':
      return { color: undefined, iconName: undefined };
    case 'PSM':
      return { color: '#3cc7c1', iconName: undefined };
    default:
      return { color: undefined, iconName: undefined };
  }
};

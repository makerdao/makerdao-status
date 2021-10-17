import MemoAaveIcon from './svg/AaveIcon';
import MemoBalIcon from './svg/BalIcon';
import MemoBatIcon from './svg/BatIcon';
import CloseIcon from './svg/CloseIcon';
import CollateralIcon from './svg/CollateralIcon';
import MemoCompIcon from './svg/CompIcon';
import DashboardIcon from './svg/DashboardIcon';
import EthereumIcon from './svg/EthereumIcon';
import FeedbackIcon from './svg/FeedbackIcon';
import FullLogoIcon from './svg/FullLogoIcon';
import MemoGusdIcon from './svg/GusdIcon';
import LeftArrowIcon from './svg/LeftArrowIcon';
import MemoLinkIcon from './svg/LinkIcon';
import LogoIcon from './svg/LogoIcon';
import MemoManaIcon from './svg/ManaIcon';
import OpenInNewIcon from './svg/OpenInNewIcon';
import OverviewIcon from './svg/OverviewIcon';
import RightArrowIcon from './svg/RightArrowIcon';
import SearchIcon from './svg/SearchIcon';
import SpellsIcon from './svg/SpellsIcon';
import CloseUpArrowIcon from './svg/CloseUpArrowIcon';
import MemoTusdIcon from './svg/TusdIcon';
import MemoUniIcon from './svg/UniIcon';
import MemoUsdcIcon from './svg/UsdcIcon';
import MemoUsdtIcon from './svg/UsdtIcon';
import MemoWbtcIcon from './svg/WbtcIcon';
import MemoYfiIcon from './svg/YfiIcon';
import MemoZrxIcon from './svg/ZrxIcon';

export const icons = {
  overview: OverviewIcon,
  rightArrow: RightArrowIcon,
  leftArrow: LeftArrowIcon,
  spells: SpellsIcon,
  collateral: CollateralIcon,
  logo: LogoIcon,
  fullLogo: FullLogoIcon,
  search: SearchIcon,
  dashboard: DashboardIcon,
  feedBack: FeedbackIcon,
  close: CloseIcon,
  openInNewIcon: OpenInNewIcon,
  ethereum: EthereumIcon,
  closeUpArrow: CloseUpArrowIcon,
  usdc: MemoUsdcIcon,
  tusd: MemoTusdIcon,
  usdt: MemoUsdtIcon,
  wbtc: MemoWbtcIcon,
  bat: MemoBatIcon,
  zrx: MemoZrxIcon,
  mana: MemoManaIcon,
  comp: MemoCompIcon,
  link: MemoLinkIcon,
  bal: MemoBalIcon,
  yfi: MemoYfiIcon,
  gusd: MemoGusdIcon,
  uni: MemoUniIcon,
  aave: MemoAaveIcon,
};

export type IconNames = keyof typeof icons;

export const getIconByAsset = (asset: string) => {
  const assetArray = asset.split('-');
  if (!assetArray.length) {
    return undefined;
  }
  const key = assetArray[0];
  switch (key) {
    case 'ETH':
      return 'ethereum';
    case 'USDC':
      return 'usdc';
    case 'TUSD':
      return 'tusd';
    case 'USDT':
      return 'usdt';
    case 'PAXUSD':
      return undefined;
    case 'WBTC':
      return 'wbtc';
    case 'BAT':
      return 'bat';
    case 'KNC':
      return undefined;
    case 'ZRX':
      return 'zrx';
    case 'MANA':
      return 'mana';
    case 'COMP':
      return 'comp';
    case 'LINK':
      return 'link';
    case 'BAL':
      return 'bal';
    case 'YFI':
      return 'yfi';
    case 'GUSD':
      return 'gusd';
    case 'RENBTC':
      return undefined;
    case 'UNI':
      return 'uni';
    case 'AAVE':
      return 'aave';
    case 'UNIV2DAIETH':
      return undefined;
    default:
      return undefined;
  }
};

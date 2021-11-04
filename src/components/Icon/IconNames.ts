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
import MemoUpArrowIcon from './svg/UpArrowIcon';
import MemoNoResultsFoundIcon from './svg/NoResultsFoundIcon';
import MemoLrcIcon from './svg/LrcIcon';

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
  lrc: MemoLrcIcon,
  comp: MemoCompIcon,
  link: MemoLinkIcon,
  bal: MemoBalIcon,
  yfi: MemoYfiIcon,
  gusd: MemoGusdIcon,
  uni: MemoUniIcon,
  aave: MemoAaveIcon,
  upArrow: MemoUpArrowIcon,
  noResultsFound: MemoNoResultsFoundIcon,
};

export type IconNames = keyof typeof icons;

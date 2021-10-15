import CollateralIcon from './svg/CollateralIcon';
import FullLogoIcon from './svg/FullLogoIcon';
import LeftArrowIcon from './svg/LeftArrowIcon';
import LogoIcon from './svg/LogoIcon';
import SearchIcon from './svg/SearchIcon';
import OverviewIcon from './svg/OverviewIcon';
import RightArrowIcon from './svg/RightArrowIcon';
import SpellsIcon from './svg/SpellsIcon';
import DashboardIcon from './svg/DashboardIcon';
import FeedbackIcon from './svg/FeedbackIcon';
import CloseIcon from './svg/CloseIcon';
import OpenInNewIcon from './svg/OpenInNewIcon';
import EthereumIcon from './svg/EthereumIcon';
import CloseUpArrowIcon from './svg/CloseUpArrowIcon';

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
};

export type IconNames = keyof typeof icons;

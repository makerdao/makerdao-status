import CollateralIcon from "./svg/CollateralIcon";
import LeftArrowIcon from "./svg/LeftArrowIcon";
import LogoIcon from "./svg/LogoIcon";
import OverviewIcon from "./svg/OverviewIcon";
import RightArrowIcon from "./svg/RightArrowIcon";
import SpellsIcon from "./svg/SpellsIcon";

export const icons = {
  overview: OverviewIcon,
  rightArrow: RightArrowIcon,
  leftArrow: LeftArrowIcon,
  spells: SpellsIcon,
  collateral: CollateralIcon,
  logo: LogoIcon,
};

export type IconNames = keyof typeof icons;

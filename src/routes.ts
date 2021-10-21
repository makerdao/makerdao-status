import { IconNames } from './components/Icon/IconNames';
import {
  CollateralContainerPage,
  OverviewPage,
  SpellsContainerPage,
} from './pages';

export interface RouteType {
  label: string;
  path: PathType;
  component: () => JSX.Element;
  iconName: IconNames;
}

export type PathType = '/overview' | '/spells' | '/collateral';

export const routes: RouteType[] = [
  {
    label: 'Overview',
    path: '/overview',
    component: OverviewPage,
    iconName: 'search',
  },
  {
    label: 'Spells (changelogs)',
    path: '/spells',
    component: SpellsContainerPage,
    iconName: 'spells',
  },
  {
    label: 'Collateral',
    path: '/collateral',
    component: CollateralContainerPage,
    iconName: 'dashboard',
  },
];

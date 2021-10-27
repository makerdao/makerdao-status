import React from 'react';
import { IconNames } from './components/Icon/IconNames';
import {
  CollateralContainerPage,
  OverviewContainerPage,
  SpellsContainerPage,
} from './pages';
import CollateralsStructureErrorBoundary from './components/errors/CollateralsStructureErrorBoundary';

export interface RouteType {
  label: string;
  path: PathType;
  component: () => JSX.Element;
  iconName: IconNames;
}

export type PathType = '/overview' | '/spells' | '/collaterals';

export const routes: RouteType[] = [
  {
    label: 'Overview',
    path: '/overview',
    component: OverviewContainerPage,
    iconName: 'overview',
  },
  {
    label: 'Spells (changelogs)',
    path: '/spells',
    component: SpellsContainerPage,
    iconName: 'spells',
  },
  {
    label: 'Collateral',
    path: '/collaterals',
    component: () => (
      <CollateralsStructureErrorBoundary>
        <CollateralContainerPage />
      </CollateralsStructureErrorBoundary>
    ),
    iconName: 'collateral',
  },
];

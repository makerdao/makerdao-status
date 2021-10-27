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

export type PathType = '/overview' | '/spells' | '/collateral';

export const routes: RouteType[] = [
  {
    label: 'Overview',
    path: '/overview',
    component: OverviewContainerPage,
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
    component: () => (
      <CollateralsStructureErrorBoundary>
        <CollateralContainerPage />
      </CollateralsStructureErrorBoundary>
    ),
    iconName: 'collateral',
  },
];

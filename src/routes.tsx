import React from 'react';
import { CollateralsStructureErrorBoundary, IconNames } from './components';
import {
  CollateralContainerPage,
  MdViewerContainerPage,
  OverviewContainerPage,
  SpellsContainerPage,
  NotFoundPage,
} from './pages';

export interface RouteType {
  label?: string;
  path: PathType;
  component?: () => JSX.Element;
  iconName?: IconNames;
  hiddenInSidebar?: boolean;
  hiddenSidebar?: boolean;
}

export type PathType =
  | '/overview'
  | '/spells'
  | '/collaterals'
  | '/md-viewer'
  | '/not-found-page';

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
  {
    path: '/md-viewer',
    hiddenInSidebar: true,
    hiddenSidebar: true,
    component: () => <MdViewerContainerPage />,
  },
  {
    path: '/not-found-page',
    component: () => <NotFoundPage />,
    hiddenInSidebar: true,
    hiddenSidebar: true,
  },
];

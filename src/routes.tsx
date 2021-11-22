import React from 'react';
import { CollateralsStructureErrorBoundary, IconNames } from './components';
import {
  CollateralContainerPage,
  MdViewerContainerPage,
  OverviewContainerPage,
  SpellsContainerPage,
} from './pages';

export interface RouteType {
  label?: string;
  path: PathType;
  component?: () => JSX.Element;
  iconName?: IconNames;
  hiddenInSidebar?: boolean;
}

export type PathType = '/overview' | '/spells' | '/collaterals' | '/md-viewer';

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
    component: () => <MdViewerContainerPage />,
    hiddenInSidebar: true,
  },
];

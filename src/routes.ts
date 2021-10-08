import React from "react";
import { IconNames } from "./components/icon/IconNames";
import { CollateralPage, EmptyPage, OverviewPage, Spells } from "./pages";

export interface RouteType {
  label: string;
  path: PathType;
  component: () => JSX.Element;
  iconName: IconNames;
}

export type PathType = "/overview" | "/spells" | "/collateral";

export const routes: RouteType[] = [
  {
    label: "Overview",
    path: "/overview",
    component: OverviewPage,
    iconName: "search"
  },
  {
    label: "Spells (changelogs)",
    path: "/spells",
    component: Spells,
    iconName: "spells"
  },
  {
    label: "Collateral",
    path: "/collateral",
    component: CollateralPage,
    iconName: "dashboard"
  },
];

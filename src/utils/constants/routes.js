import {OverviewPage} from '../../pages/'

const EmptyPage=()=>{
    return null
}

export const routes = [
    {
      label: "Overview",
      path: "/overview",
      component:OverviewPage
    },
    {
      label: "Auctions",
      path: "/auctions",
      component:EmptyPage
    },
    {
      label: "Collateral",
      path: "/collateral",
      component:EmptyPage
    },
    {
      label: "Spells (changelogs)",
      path: "/spells",
      component:EmptyPage
    },
    {
      label: "Voters",
      path: "/voters",
      component:EmptyPage
    },
    {
      label: "Links",
      path: "/links",
      component:EmptyPage
    },
  ];
  
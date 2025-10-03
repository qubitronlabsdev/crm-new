import { NAV_TYPE_ITEM } from "constants/app.constant";
import DashboardsIcon from "assets/dualicons/dashboards.svg?react";
import { ROUTES } from "app/router/routes";

export const baseNavigation = [
  {
    id: "dashboards",
    type: NAV_TYPE_ITEM,
    path: ROUTES.DASHBOARD.ROOT,
    title: "Dashboards",
    transKey: "nav.dashboards.dashboards",
    Icon: DashboardsIcon,
  },
];

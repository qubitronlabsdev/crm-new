import { HomeIcon } from "@heroicons/react/24/outline";
import DashboardsIcon from "assets/dualicons/dashboards.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";
import { ROUTES } from "app/router/routes";

export const dashboards = {
  id: "dashboards",
  type: NAV_TYPE_ROOT,
  path: ROUTES.DASHBOARD.ROOT,
  title: "Dashboards",
  transKey: "nav.dashboards.dashboards",
  Icon: DashboardsIcon,
  childs: [
    {
      id: "dashboards.home",
      path: ROUTES.DASHBOARD.HOME,
      type: NAV_TYPE_ITEM,
      title: "Home",
      transKey: "nav.dashboards.home",
      Icon: HomeIcon,
    },
  ],
};

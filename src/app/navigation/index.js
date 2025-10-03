import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  PauseIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { NAV_TYPE_ITEM, NAV_TYPE_COLLAPSE } from "constants/app.constant";
import { ROUTES } from "app/router/routes";

// New flat navigation structure with expandable dropdowns
export const navigation = [
  {
    id: "dashboard",
    type: NAV_TYPE_ITEM,
    path: ROUTES.DASHBOARD.HOME,
    title: "Dashboard",
    transKey: "nav.dashboard",
    Icon: HomeIcon,
  },
  {
    id: "lead-management",
    type: NAV_TYPE_COLLAPSE,
    title: "Lead Management",
    transKey: "nav.leadManagement",
    Icon: UserGroupIcon,
    childs: [
      {
        id: "leads.all",
        path: ROUTES.LEADS.ALL,
        type: NAV_TYPE_ITEM,
        title: "All Leads",
        transKey: "nav.leads.all",
        Icon: EyeIcon,
      },
      {
        id: "leads.fresh",
        path: ROUTES.LEADS.FRESH,
        type: NAV_TYPE_ITEM,
        title: "Fresh Leads",
        transKey: "nav.leads.fresh",
        Icon: ClockIcon,
      },
      {
        id: "leads.converted",
        path: ROUTES.LEADS.CONVERTED,
        type: NAV_TYPE_ITEM,
        title: "Converted Leads",
        transKey: "nav.leads.converted",
        Icon: CheckCircleIcon,
      },
      {
        id: "leads.postponed",
        path: ROUTES.LEADS.POSTPONED,
        type: NAV_TYPE_ITEM,
        title: "Postponed Leads",
        transKey: "nav.leads.postponed",
        Icon: PauseIcon,
      },
    ],
  },
  {
    id: "quotations-management",
    type: NAV_TYPE_COLLAPSE,
    title: "Quotations",
    transKey: "nav.quotationsManagement",
    Icon: DocumentTextIcon,
    childs: [
      {
        id: "quotations.all",
        path: ROUTES.QUOTATIONS.ALL,
        type: NAV_TYPE_ITEM,
        title: "All Quotations",
        transKey: "nav.quotations.all",
        Icon: EyeIcon,
      },
    ],
  },
  {
    id: "booking",
    type: NAV_TYPE_COLLAPSE,
    title: "Booking",
    transKey: "nav.booking",
    Icon: CalendarDaysIcon,
    childs: [
      {
        id: "bookings.all",
        path: ROUTES.BOOKINGS.ALL,
        type: NAV_TYPE_ITEM,
        title: "All Bookings",
        transKey: "nav.bookings.all",
        Icon: EyeIcon,
      },
      {
        id: "bookings.confirmed",
        path: ROUTES.BOOKINGS.CONFIRMED,
        type: NAV_TYPE_ITEM,
        title: "Confirmed Bookings",
        transKey: "nav.bookings.confirmed",
        Icon: CheckCircleIcon,
      },
      {
        id: "bookings.pending",
        path: ROUTES.BOOKINGS.PENDING,
        type: NAV_TYPE_ITEM,
        title: "Pending Bookings",
        transKey: "nav.bookings.pending",
        Icon: ClockIcon,
      },
      {
        id: "bookings.create",
        path: ROUTES.BOOKINGS.CREATE,
        type: NAV_TYPE_ITEM,
        title: "Create Booking",
        transKey: "nav.bookings.create",
        Icon: PlusIcon,
      },
    ],
  },
];

export { baseNavigation } from "./baseNavigation";

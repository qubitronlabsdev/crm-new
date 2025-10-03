import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  PauseIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { NAV_TYPE_ITEM, NAV_TYPE_COLLAPSE } from "constants/app.constant";

// New flat navigation structure with expandable dropdowns
export const navigation = [
  {
    id: "dashboard",
    type: NAV_TYPE_ITEM,
    path: "/dashboards/home",
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
        path: "/leads/all",
        type: NAV_TYPE_ITEM,
        title: "All Leads",
        transKey: "nav.leads.all",
        Icon: EyeIcon,
      },
      {
        id: "leads.fresh",
        path: "/leads/fresh",
        type: NAV_TYPE_ITEM,
        title: "Fresh Leads",
        transKey: "nav.leads.fresh",
        Icon: ClockIcon,
      },
      {
        id: "leads.converted",
        path: "/leads/converted",
        type: NAV_TYPE_ITEM,
        title: "Converted Leads",
        transKey: "nav.leads.converted",
        Icon: CheckCircleIcon,
      },
      {
        id: "leads.postponed",
        path: "/leads/postponed",
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
        path: "/quotations/all",
        type: NAV_TYPE_ITEM,
        title: "All Quotations",
        transKey: "nav.quotations.all",
        Icon: EyeIcon,
      },

      {
        id: "quotations.approved",
        path: "/quotations/approved",
        type: NAV_TYPE_ITEM,
        title: "Approved Quotations",
        transKey: "nav.quotations.approved",
        Icon: CheckCircleIcon,
      },
      {
        id: "quotations.pending",
        path: "/quotations/pending",
        type: NAV_TYPE_ITEM,
        title: "Pending Quotations",
        transKey: "nav.quotations.pending",
        Icon: ClockIcon,
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
        path: "/bookings/all",
        type: NAV_TYPE_ITEM,
        title: "All Bookings",
        transKey: "nav.bookings.all",
        Icon: EyeIcon,
      },
      {
        id: "bookings.confirmed",
        path: "/bookings/confirmed",
        type: NAV_TYPE_ITEM,
        title: "Confirmed Bookings",
        transKey: "nav.bookings.confirmed",
        Icon: CheckCircleIcon,
      },
      {
        id: "bookings.pending",
        path: "/bookings/pending",
        type: NAV_TYPE_ITEM,
        title: "Pending Bookings",
        transKey: "nav.bookings.pending",
        Icon: ClockIcon,
      },
      {
        id: "bookings.create",
        path: "/bookings/create",
        type: NAV_TYPE_ITEM,
        title: "Create Booking",
        transKey: "nav.bookings.create",
        Icon: PlusIcon,
      },
    ],
  },
];

export { baseNavigation } from "./baseNavigation";

import {
  UserGroupIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  PlusIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import {
  NAV_TYPE_ROOT,
  NAV_TYPE_ITEM,
  NAV_TYPE_COLLAPSE,
} from "constants/app.constant";

const ROOT_LEADS = "/leads";
const ROOT_QUOTATIONS = "/quotations";
const ROOT_BOOKINGS = "/bookings";

const path = (root, item) => `${root}${item}`;

export const crm = {
  id: "crm",
  type: NAV_TYPE_ROOT,
  title: "Travel CRM",
  transKey: "nav.crm.title",
  Icon: UserGroupIcon,
  childs: [
    {
      id: "crm.leads",
      type: NAV_TYPE_COLLAPSE,
      title: "Lead Management",
      transKey: "nav.crm.leads.title",
      Icon: UserGroupIcon,
      childs: [
        {
          id: "crm.leads.all",
          path: path(ROOT_LEADS, "/all"),
          type: NAV_TYPE_ITEM,
          title: "All Leads",
          transKey: "nav.crm.leads.all",
          Icon: EyeIcon,
        },
        {
          id: "crm.leads.fresh",
          path: path(ROOT_LEADS, "/fresh"),
          type: NAV_TYPE_ITEM,
          title: "Fresh Leads",
          transKey: "nav.crm.leads.fresh",
          Icon: ClockIcon,
        },
        {
          id: "crm.leads.converted",
          path: path(ROOT_LEADS, "/converted"),
          type: NAV_TYPE_ITEM,
          title: "Converted Leads",
          transKey: "nav.crm.leads.converted",
          Icon: CheckCircleIcon,
        },
        {
          id: "crm.leads.postponed",
          path: path(ROOT_LEADS, "/postponed"),
          type: NAV_TYPE_ITEM,
          title: "Postponed Leads",
          transKey: "nav.crm.leads.postponed",
          Icon: PauseIcon,
        },
      ],
    },
    {
      id: "crm.quotations",
      type: NAV_TYPE_COLLAPSE,
      title: "Quotations",
      transKey: "nav.crm.quotations.title",
      Icon: DocumentTextIcon,
      childs: [
        {
          id: "crm.quotations.create",
          path: path(ROOT_QUOTATIONS, "/create"),
          type: NAV_TYPE_ITEM,
          title: "Create Quotation",
          transKey: "nav.crm.quotations.create",
          Icon: PlusIcon,
        },
      ],
    },
    {
      id: "crm.bookings",
      type: NAV_TYPE_COLLAPSE,
      title: "Bookings & Operations",
      transKey: "nav.crm.bookings.title",
      Icon: CalendarDaysIcon,
      childs: [
        {
          id: "crm.bookings.index",
          path: ROOT_BOOKINGS,
          type: NAV_TYPE_ITEM,
          title: "All Bookings",
          transKey: "nav.crm.bookings.index",
          Icon: EyeIcon,
        },
      ],
    },
  ],
};

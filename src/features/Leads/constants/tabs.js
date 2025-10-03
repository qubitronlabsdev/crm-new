import {
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import { ROUTES } from "app/router/routes";

const tabs = [
  {
    id: "all",
    name: "All Leads",
    href: ROUTES.LEADS.ALL,
    icon: EyeIcon,
    description: "View all leads regardless of status",
  },
  {
    id: "fresh",
    name: "Fresh Leads",
    href: ROUTES.LEADS.FRESH,
    icon: ClockIcon,
    description: "New leads waiting for processing",
  },
  {
    id: "converted",
    name: "Converted Leads",
    href: ROUTES.LEADS.CONVERTED,
    icon: CheckCircleIcon,
    description: "Leads with quotations assigned",
  },
  {
    id: "postponed",
    name: "Postponed Leads",
    href: ROUTES.LEADS.POSTPONED,
    icon: PauseIcon,
    description: "Leads scheduled for follow-up",
  },
];

export default tabs;

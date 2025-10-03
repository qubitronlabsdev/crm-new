import {
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";

const tabs = [
  {
    id: "all",
    name: "All Leads",
    href: "/leads/all",
    icon: EyeIcon,
    description: "View all leads regardless of status",
  },
  {
    id: "fresh",
    name: "Fresh Leads",
    href: "/leads/fresh",
    icon: ClockIcon,
    description: "New leads waiting for processing",
  },
  {
    id: "converted",
    name: "Converted Leads",
    href: "/leads/converted",
    icon: CheckCircleIcon,
    description: "Leads with quotations assigned",
  },
  {
    id: "postponed",
    name: "Postponed Leads",
    href: "/leads/postponed",
    icon: PauseIcon,
    description: "Leads scheduled for follow-up",
  },
];

export default tabs;

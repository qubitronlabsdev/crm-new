import {
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const tabs = [
  {
    id: "all",
    name: "All Quotations",
    href: "/quotations/all",
    icon: EyeIcon,
    description: "View all quotations",
  },
  {
    id: "approved",
    name: "Apprroved Quotations",
    href: "/quotations/approved",
    icon: CheckCircleIcon,
    description: "Leads with approved quotations",
  },
  {
    id: "pending",
    name: "Pending Quotations",
    href: "/quotations/pending",
    icon: ClockIcon,
    description: "Leads with pending quotations",
  },
];

export default tabs;

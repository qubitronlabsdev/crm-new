import { EyeIcon } from "@heroicons/react/24/outline";
import { ROUTES } from "app/router/routes";

const tabs = [
  {
    id: "all",
    name: "All Quotations",
    href: ROUTES.QUOTATIONS.ALL,
    icon: EyeIcon,
    description: "View all quotations",
  },
];

export default tabs;

// Import Dependencies
import { Link } from "react-router";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import Logo from "assets/appLogo.svg?react";
import LogoType from "assets/logotype.svg?react";
import { Button } from "components/ui";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { ROUTES } from "app/router/routes";

// ----------------------------------------------------------------------

export function Header() {
  const { close } = useSidebarContext();
  return (
    <header className="relative flex h-[61px] shrink-0 items-center justify-between ltr:pr-3 ltr:pl-6 rtl:pr-6 rtl:pl-3">
      <div className="flex items-center justify-start gap-4 pt-3">
        <Link to={ROUTES.ROOT}>
          <Logo className="text-primary-600 dark:text-primary-400 size-10" />
        </Link>
        <LogoType className="dark:text-dark-50 h-5 w-auto text-gray-800" />
      </div>
      <div className="pt-5 xl:hidden">
        <Button
          onClick={close}
          variant="flat"
          isIcon
          className="size-6 rounded-full"
        >
          <ChevronLeftIcon className="size-5 rtl:rotate-180" />
        </Button>
      </div>
    </header>
  );
}

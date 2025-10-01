// Import Dependencies
import { Link } from "react-router";
import clsx from "clsx";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

// Local Imports
import Logo from "assets/appLogo.svg?react";
import { useThemeContext } from "app/contexts/theme/context";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { Profile } from "../../Profile";
import { ScrollShadow } from "components/ui";
import { NAV_TYPE_COLLAPSE, NAV_TYPE_ITEM } from "constants/app.constant";
import { isRouteActive } from "utils/isRouteActive";

// ----------------------------------------------------------------------

export function ExpandableSidebar({
  navigation,
  pathname,
  openDropdowns,
  toggleDropdown,
}) {
  const { cardSkin } = useThemeContext();
  const { isExpanded, toggle, close } = useSidebarContext();
  const { lgAndDown } = useBreakpointsContext();

  const handleNavItemClick = (navItem) => {
    if (navItem.type === NAV_TYPE_COLLAPSE) {
      // If collapsed, expand first then toggle dropdown
      if (!isExpanded) {
        toggle();
        // Small delay to allow sidebar expansion
        setTimeout(() => toggleDropdown(navItem.id), 100);
      } else {
        toggleDropdown(navItem.id);
      }
    }
  };

  const isNavActive = (navItem) => {
    if (navItem.path && isRouteActive(navItem.path, pathname)) {
      return true;
    }
    if (navItem.childs) {
      return navItem.childs.some((child) =>
        isRouteActive(child.path, pathname),
      );
    }
    return false;
  };

  const isChildActive = (child) => {
    return isRouteActive(child.path, pathname);
  };

  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 z-50 flex transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16",
      )}
    >
      <div
        className={clsx(
          "border-gray-150 dark:border-dark-600/80 flex h-full w-full flex-col border-r bg-white",
          cardSkin === "shadow" ? "dark:bg-dark-750" : "dark:bg-dark-900",
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="text-primary-600 dark:text-primary-400 size-8" />
              {isExpanded && (
                <span className="ml-3 text-lg font-semibold text-gray-800 dark:text-white">
                  Travel CRM
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <ScrollShadow className="flex-1 overflow-y-auto">
          <nav className="px-3 py-4">
            <ul className="space-y-2">
              {navigation.map((navItem) => (
                <li key={navItem.id}>
                  {navItem.type === NAV_TYPE_ITEM ? (
                    // Single Navigation Item
                    <Link
                      to={navItem.path}
                      className={clsx(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isNavActive(navItem)
                          ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                          : "dark:hover:bg-dark-700 text-gray-700 hover:bg-gray-100 dark:text-gray-300",
                        !isExpanded && "justify-center",
                      )}
                      onClick={() => lgAndDown && close()}
                    >
                      <navItem.Icon className="h-5 w-5 flex-shrink-0" />
                      {isExpanded && (
                        <span className="ml-3 truncate">{navItem.title}</span>
                      )}
                    </Link>
                  ) : (
                    // Collapsible Navigation Item
                    <div>
                      <button
                        onClick={() => handleNavItemClick(navItem)}
                        className={clsx(
                          "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isNavActive(navItem)
                            ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                            : "dark:hover:bg-dark-700 text-gray-700 hover:bg-gray-100 dark:text-gray-300",
                          !isExpanded && "justify-center",
                        )}
                      >
                        <navItem.Icon className="h-5 w-5 flex-shrink-0" />
                        {isExpanded && (
                          <>
                            <span className="ml-3 flex-1 truncate text-left">
                              {navItem.title}
                            </span>
                            <ChevronRightIcon
                              className={clsx(
                                "h-4 w-4 transition-transform",
                                openDropdowns[navItem.id] && "rotate-90",
                              )}
                            />
                          </>
                        )}
                      </button>

                      {/* Dropdown Menu */}
                      {isExpanded &&
                        openDropdowns[navItem.id] &&
                        navItem.childs && (
                          <ul className="mt-1 ml-6 space-y-1">
                            {navItem.childs.map((child) => (
                              <li key={child.id}>
                                <Link
                                  to={child.path}
                                  className={clsx(
                                    "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
                                    isChildActive(child)
                                      ? "bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400"
                                      : "dark:hover:bg-dark-800 text-gray-600 hover:bg-gray-50 dark:text-gray-400",
                                  )}
                                  onClick={() => lgAndDown && close()}
                                >
                                  <child.Icon className="h-4 w-4 flex-shrink-0" />
                                  <span className="ml-2 truncate">
                                    {child.title}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </ScrollShadow>

        {/* Bottom Section */}
        <div className="dark:border-dark-600 border-t border-gray-200 p-3">
          <div className="space-y-2">
            {/* Profile */}
            <div
              className={clsx(
                "flex items-center",
                !isExpanded && "justify-center",
              )}
            >
              <Profile compact={!isExpanded} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {lgAndDown && isExpanded && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black"
          onClick={close}
        />
      )}
    </div>
  );
}

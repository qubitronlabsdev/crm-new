// Import Dependencies
import { useMemo, useState } from "react";
import { useLocation } from "react-router";

// Local Imports
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { navigation } from "app/navigation";
import { useDidUpdate } from "hooks";
import { isRouteActive } from "utils/isRouteActive";
import { ExpandableSidebar } from "./ExpandableSidebar";

// ----------------------------------------------------------------------

export function Sidebar() {
  const { pathname } = useLocation();
  const { name, lgAndDown } = useBreakpointsContext();
  const { isExpanded, close } = useSidebarContext();

  const [openDropdowns, setOpenDropdowns] = useState({});

  // Find which navigation item should be active based on current path
  const activeNav = useMemo(() => {
    for (const navItem of navigation) {
      if (navItem.path && isRouteActive(navItem.path, pathname)) {
        return navItem.id;
      }
      if (navItem.childs) {
        for (const child of navItem.childs) {
          if (isRouteActive(child.path, pathname)) {
            return {
              parent: navItem.id,
              child: child.id,
            };
          }
        }
      }
    }
    return null;
  }, [pathname]);

  // Open dropdown for active item on path change
  useDidUpdate(() => {
    if (activeNav && typeof activeNav === "object" && activeNav.parent) {
      setOpenDropdowns((prev) => ({
        ...prev,
        [activeNav.parent]: true,
      }));
    }
  }, [activeNav]);

  useDidUpdate(() => {
    if (lgAndDown && isExpanded) close();
  }, [name]);

  const toggleDropdown = (navId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [navId]: !prev[navId],
    }));
  };

  return (
    <ExpandableSidebar
      navigation={navigation}
      pathname={pathname}
      openDropdowns={openDropdowns}
      toggleDropdown={toggleDropdown}
    />
  );
}

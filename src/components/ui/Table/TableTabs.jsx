// Import Dependencies
import { Link, useLocation } from "react-router";

import { clsx } from "clsx";

export function TableTabs({ tabs }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="dark:border-dark-500 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              to={tab.href}
              className={clsx(
                "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "dark:text-dark-200 dark:hover:border-dark-400 dark:hover:text-dark-50 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
              title={tab.description}
            >
              <Icon
                className={clsx(
                  "mr-2 h-5 w-5",
                  isActive
                    ? "text-primary-500 dark:text-primary-400"
                    : "dark:text-dark-300 dark:group-hover:text-dark-200 text-gray-400 group-hover:text-gray-500",
                )}
              />
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

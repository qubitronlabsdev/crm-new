// Import Dependencies
import { Navigate } from "react-router";

// Local Imports
import { AppLayout } from "app/layouts/AppLayout";
import { DynamicLayout } from "app/layouts/DynamicLayout";
import AuthGuard from "middleware/AuthGuard";

// ----------------------------------------------------------------------

const protectedRoutes = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The dynamic layout supports both the main layout and the sideblock.
    {
      Component: DynamicLayout,
      children: [
        {
          index: true,
          element: <Navigate to="/leads/all" />,
        },
        {
          path: "dashboards",
          children: [
            {
              index: true,
              element: <Navigate to="/dashboards/home" />,
            },
            {
              path: "home",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/home")).default,
              }),
            },
          ],
        },
        {
          path: "leads",
          children: [
            {
              index: true,
              element: <Navigate to="/leads/all" />,
            },
            {
              path: "all",
              lazy: async () => ({
                Component: (await import("app/pages/Leads/AllLeads")).default,
              }),
            },
            {
              path: "fresh",
              lazy: async () => ({
                Component: (await import("app/pages/Leads/FreshLeads")).default,
              }),
            },
            {
              path: "converted",
              lazy: async () => ({
                Component: (await import("app/pages/Leads/ConvertedLeads"))
                  .default,
              }),
            },
            {
              path: "postponed",
              lazy: async () => ({
                Component: (await import("app/pages/Leads/PostponedLeads"))
                  .default,
              }),
            },
            {
              path: "create",
              lazy: async () => ({
                Component: (await import("app/pages/Leads/Create")).default,
              }),
            },
            {
              path: ":id/edit",
              lazy: async () => ({
                Component: (await import("app/pages/Leads/Edit")).default,
              }),
            },
            {
              path: ":id",
              lazy: async () => ({
                Component: (await import("app/pages/Leads/Show")).default,
              }),
            },
          ],
        },
        {
          path: "quotations",
          children: [
            {
              index: true,
              element: <Navigate to="/leads/all" />,
            },
            {
              path: "create",
              lazy: async () => ({
                Component: (await import("app/pages/Quotations/Create"))
                  .default,
              }),
            },
            {
              path: "create/:leadId",
              lazy: async () => ({
                Component: (await import("app/pages/Quotations/Create"))
                  .default,
              }),
            },
            {
              path: ":id/edit",
              lazy: async () => ({
                Component: (await import("app/pages/Quotations/Edit")).default,
              }),
            },
            {
              path: ":id",
              lazy: async () => ({
                Component: (await import("app/pages/Quotations/Show")).default,
              }),
            },
          ],
        },
        {
          path: "bookings",
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import("app/pages/Bookings/Index")).default,
              }),
            },
            {
              path: ":id",
              lazy: async () => ({
                Component: (await import("app/pages/Bookings/Show")).default,
              }),
            },
          ],
        },
      ],
    },
    // The app layout supports only the main layout. Avoid using it for other layouts.
    {
      Component: AppLayout,
      children: [
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("app/pages/settings/Layout")).default,
          }),
          children: [
            {
              index: true,
              element: <Navigate to="/settings/general" />,
            },
            {
              path: "general",
              lazy: async () => ({
                Component: (await import("app/pages/settings/sections/General"))
                  .default,
              }),
            },
            {
              path: "appearance",
              lazy: async () => ({
                Component: (
                  await import("app/pages/settings/sections/Appearance")
                ).default,
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { protectedRoutes };

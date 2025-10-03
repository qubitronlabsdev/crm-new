import GhostGuard from "middleware/GhostGuard";
import { ROUTES } from "./routes";

const ghostRoutes = {
  id: "ghost",
  Component: GhostGuard,
  children: [
    {
      path: ROUTES.AUTH.LOGIN.replace("/", ""), // Remove leading slash for nested route
      lazy: async () => ({
        Component: (await import("app/pages/Auth")).default,
      }),
    },
  ],
};

export { ghostRoutes };

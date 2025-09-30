// Import Dependencies
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// ----------------------------------------------------------------------

const useAppStore = create(
  devtools(
    (set) => ({
      // UI State
      sidebarCollapsed: false,
      notifications: [],

      // Actions
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            { id: Date.now(), ...notification },
          ],
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: "app-store",
    },
  ),
);

export { useAppStore };

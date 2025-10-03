/**
 * Centralized route definitions for the Travel CRM application
 *
 * This file contains all route paths used throughout the application.
 * Import and use these constants instead of hardcoding route strings.
 *
 * Usage:
 * import { ROUTES } from 'app/router/routes';
 * navigate(ROUTES.LEADS.ALL);
 * <Link to={ROUTES.QUOTATIONS.CREATE_WITH_LEAD_ID('123')} />
 */

export const ROUTES = {
  // Root
  ROOT: "/",

  // Authentication
  AUTH: {
    LOGIN: "/login",
  },

  // Dashboard
  DASHBOARD: {
    ROOT: "/dashboards",
    HOME: "/dashboards/home",
  },

  // Leads Management
  LEADS: {
    ROOT: "/leads",
    ALL: "/leads/all",
    FRESH: "/leads/fresh",
    CONVERTED: "/leads/converted",
    POSTPONED: "/leads/postponed",
    CREATE: "/leads/create",
    EDIT: (id) => `/leads/edit/${id}`,
    SHOW: (id) => `/leads/${id}`,
    // Alternative for when you have the ID as a string
    EDIT_WITH_ID: (id) => `/leads/${id}/edit`, // Alternative format used in some places
  },

  // Quotations Management
  QUOTATIONS: {
    ROOT: "/quotations",
    ALL: "/quotations/all",
    CREATE: "/quotations/create",
    CREATE_WITH_LEAD_ID: (leadId) => `/quotations/create?leadId=${leadId}`,
    EDIT: (id) => `/quotations/edit/${id}`,
    SHOW: (id) => `/quotations/${id}`,
  },

  // Bookings Management
  BOOKINGS: {
    ROOT: "/bookings",
    ALL: "/bookings/all",
    CONFIRMED: "/bookings/confirmed",
    PENDING: "/bookings/pending",
    CREATE: "/bookings/create",
    SHOW: (id) => `/bookings/${id}`,
  },

  // Settings
  SETTINGS: {
    ROOT: "/settings",
    GENERAL: "/settings/general",
    APPEARANCE: "/settings/appearance",
  },
};

// Helper functions for generating routes with parameters
export const generateRoute = {
  // Lead routes
  leadEdit: (id) => ROUTES.LEADS.EDIT(id),
  leadShow: (id) => ROUTES.LEADS.SHOW(id),
  leadEditAlt: (id) => ROUTES.LEADS.EDIT_WITH_ID(id),

  // Quotation routes
  quotationCreate: (leadId) => ROUTES.QUOTATIONS.CREATE_WITH_LEAD_ID(leadId),
  quotationEdit: (id) => ROUTES.QUOTATIONS.EDIT(id),
  quotationShow: (id) => ROUTES.QUOTATIONS.SHOW(id),

  // Booking routes
  bookingShow: (id) => ROUTES.BOOKINGS.SHOW(id),
};

// Route groups for navigation purposes
export const ROUTE_GROUPS = {
  DASHBOARD: [ROUTES.DASHBOARD.HOME],
  LEADS: [
    ROUTES.LEADS.ALL,
    ROUTES.LEADS.FRESH,
    ROUTES.LEADS.CONVERTED,
    ROUTES.LEADS.POSTPONED,
  ],
  QUOTATIONS: [ROUTES.QUOTATIONS.ALL],
  BOOKINGS: [
    ROUTES.BOOKINGS.ALL,
    ROUTES.BOOKINGS.CONFIRMED,
    ROUTES.BOOKINGS.PENDING,
    ROUTES.BOOKINGS.CREATE,
  ],
  SETTINGS: [ROUTES.SETTINGS.GENERAL, ROUTES.SETTINGS.APPEARANCE],
};

// Default redirects
export const DEFAULT_REDIRECTS = {
  ROOT_TO_LEADS: ROUTES.LEADS.ALL,
  DASHBOARD_TO_HOME: ROUTES.DASHBOARD.HOME,
  LEADS_TO_ALL: ROUTES.LEADS.ALL,
  SETTINGS_TO_GENERAL: ROUTES.SETTINGS.GENERAL,
  QUOTATIONS_TO_INDEX: ROUTES.QUOTATIONS.ROOT,
};

// Export individual route constants for direct import (backwards compatibility)
export const { ROOT, AUTH, DASHBOARD, LEADS, QUOTATIONS, BOOKINGS, SETTINGS } =
  ROUTES;

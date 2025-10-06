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

  // Dashboard (now just root)
  DASHBOARD: {
    ROOT: "/",
    HOME: "/",
  },

  // Leads Management
  LEADS: {
    ROOT: "/leads",
    ALL: "/leads/all",
    FRESH: "/leads/fresh",
    CONVERTED: "/leads/converted",
    POSTPONED: "/leads/postponed",
    CREATE: "/leads/create",
    CREATE_QUICK: "/leads/create-quick",
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

  // Employee Management
  EMPLOYEES: {
    ROOT: "/employees/all",
    ALL: "/employees/all",
    CREATE: "/employees/create",
    EDIT: (id) => `/employees/${id}/edit`,
    SHOW: (id) => `/employees/${id}`,
  },

  // Itineraries Management
  ITINERARIES: {
    ROOT: "/travel/itineraries",
    ALL: "/travel/itineraries",
    CREATE: "/travel/itineraries/create",
    EDIT: (id) => `/travel/itineraries/${id}/edit`,
    SHOW: (id) => `/travel/itineraries/${id}`,
  },

  // Travel Management (Legacy - keeping for backward compatibility)
  TRAVEL: {
    ROOT: "/travel",
    ITINERARIES: "/travel/itineraries",
    HOTEL_VOUCHERS: "/travel/hotel-vouchers",
    CUSTOMERS: "/travel/customers",
    UPCOMING_TRIPS: "/travel/upcoming-trips",
    ON_TRIPS: "/travel/on-trips",
    PAYMENT: "/travel/payment",
  },

  // Reports & Settings
  REPORTS_SETTINGS: {
    ROOT: "/reports-settings",
    REPORTS: "/reports-settings/reports",
    ANALYTICS: "/reports-settings/analytics",
    SETTINGS: "/reports-settings/settings",
  },

  // Settings (Legacy - keeping for backward compatibility)
  SETTINGS: {
    ROOT: "/settings",
    GENERAL: "/settings/general",
    APPEARANCE: "/settings/appearance",
    BILLING: "/settings/billing",
    NOTIFICATIONS: "/settings/notifications",
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

  // Employee routes
  employeeEdit: (id) => ROUTES.EMPLOYEES.EDIT(id),
  employeeShow: (id) => ROUTES.EMPLOYEES.SHOW(id),

  // Itinerary routes
  itineraryEdit: (id) => ROUTES.ITINERARIES.EDIT(id),
  itineraryShow: (id) => ROUTES.ITINERARIES.SHOW(id),
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
  EMPLOYEES: [ROUTES.EMPLOYEES.ALL],
  ITINERARIES: [ROUTES.ITINERARIES.ALL],
  TRAVEL: [
    ROUTES.TRAVEL.ITINERARIES,
    ROUTES.TRAVEL.HOTEL_VOUCHERS,
    ROUTES.TRAVEL.CUSTOMERS,
    ROUTES.TRAVEL.UPCOMING_TRIPS,
    ROUTES.TRAVEL.ON_TRIPS,
    ROUTES.TRAVEL.PAYMENT,
  ],
  REPORTS_SETTINGS: [
    ROUTES.REPORTS_SETTINGS.REPORTS,
    ROUTES.REPORTS_SETTINGS.ANALYTICS,
    ROUTES.REPORTS_SETTINGS.SETTINGS,
  ],
  SETTINGS: [ROUTES.SETTINGS.GENERAL, ROUTES.SETTINGS.APPEARANCE],
};

// Default redirects
export const DEFAULT_REDIRECTS = {
  ROOT_TO_DASHBOARD: ROUTES.DASHBOARD.HOME,
  LEADS_TO_ALL: ROUTES.LEADS.ALL,
  SETTINGS_TO_GENERAL: ROUTES.SETTINGS.GENERAL,
  QUOTATIONS_TO_INDEX: ROUTES.QUOTATIONS.ROOT,
};

// Export individual route constants for direct import (backwards compatibility)
export const {
  ROOT,
  AUTH,
  DASHBOARD,
  LEADS,
  QUOTATIONS,
  BOOKINGS,
  EMPLOYEES,
  ITINERARIES,
  TRAVEL,
  REPORTS_SETTINGS,
  SETTINGS,
} = ROUTES;

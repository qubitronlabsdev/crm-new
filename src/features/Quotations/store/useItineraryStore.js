// Import Dependencies
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// ----------------------------------------------------------------------

const useItineraryStore = create(
  devtools(
    (set, get) => ({
      // State
      quotation: null,
      days: [],
      markup: 20, // percentage
      currency: "USD",

      // Computed values
      getTotalNetCost: () => {
        const { days } = get();
        return days.reduce((total, day) => {
          return (
            total +
            day.items.reduce((dayTotal, item) => dayTotal + (item.cost || 0), 0)
          );
        }, 0);
      },

      getTotalWithMarkup: () => {
        const { getTotalNetCost, markup } = get();
        const netCost = getTotalNetCost();
        return netCost + (netCost * markup) / 100;
      },

      // Actions
      setQuotation: (quotation) => set({ quotation }),

      setMarkup: (markup) => set({ markup }),

      setCurrency: (currency) => set({ currency }),

      addDay: () => {
        const { days } = get();
        const newDay = {
          id: Date.now(),
          dayNumber: days.length + 1,
          title: `Day ${days.length + 1}`,
          description: "",
          items: [],
        };
        set({ days: [...days, newDay] });
      },

      updateDay: (dayId, updates) => {
        const { days } = get();
        set({
          days: days.map((day) =>
            day.id === dayId ? { ...day, ...updates } : day,
          ),
        });
      },

      removeDay: (dayId) => {
        const { days } = get();
        const filteredDays = days.filter((day) => day.id !== dayId);
        // Renumber days
        const renumberedDays = filteredDays.map((day, index) => ({
          ...day,
          dayNumber: index + 1,
          title: day.title.includes("Day ") ? `Day ${index + 1}` : day.title,
        }));
        set({ days: renumberedDays });
      },

      addItem: (dayId, item) => {
        const { days } = get();
        set({
          days: days.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  items: [...day.items, { id: Date.now(), ...item }],
                }
              : day,
          ),
        });
      },

      updateItem: (dayId, itemId, updates) => {
        const { days } = get();
        set({
          days: days.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  items: day.items.map((item) =>
                    item.id === itemId ? { ...item, ...updates } : item,
                  ),
                }
              : day,
          ),
        });
      },

      removeItem: (dayId, itemId) => {
        const { days } = get();
        set({
          days: days.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  items: day.items.filter((item) => item.id !== itemId),
                }
              : day,
          ),
        });
      },

      loadItinerary: (itineraryData) => {
        set({
          quotation: itineraryData.quotation || null,
          days: itineraryData.days || [],
          markup: itineraryData.markup || 20,
          currency: itineraryData.currency || "USD",
        });
      },

      clearItinerary: () => {
        set({
          quotation: null,
          days: [],
          markup: 20,
          currency: "USD",
        });
      },

      exportItinerary: () => {
        const {
          quotation,
          days,
          markup,
          currency,
          getTotalNetCost,
          getTotalWithMarkup,
        } = get();
        return {
          quotation,
          days,
          markup,
          currency,
          totalNetCost: getTotalNetCost(),
          totalWithMarkup: getTotalWithMarkup(),
          generatedAt: new Date().toISOString(),
        };
      },
    }),
    {
      name: "itinerary-store",
    },
  ),
);

export { useItineraryStore };

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

      // Computed values - removed cost-related functions since items only have title and description

      // Actions
      setQuotation: (quotation) => set({ quotation }),

      setMarkup: (markup) => set({ markup }),

      setCurrency: (currency) => set({ currency }),

      addDay: () => {
        const { days } = get();
        const newDay = {
          id: Date.now(),
          title: `Day ${days.length + 1}`,
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
        // Update day titles to maintain sequential numbering
        const renumberedDays = filteredDays.map((day, index) => ({
          ...day,
          title: day.title.includes("Day ") ? `Day ${index + 1}` : day.title,
        }));
        set({ days: renumberedDays });
      },

      // new logic to add number of days directly to the ItneraryBuilder component

      setDaysCount: (count) => {
        const { days } = get();
        const currentCount = days.length;
        const targetCount = Math.max(0, Number(count) || 0);

        if (targetCount === currentCount) {
          return; // No change needed
        }

        if (targetCount > currentCount) {
          // Add more days
          const newDays = [];
          for (let i = currentCount + 1; i <= targetCount; i++) {
            newDays.push({
              id: Date.now() + i,
              title: `Day ${i}`,
              items: [],
            });
          }
          set({ days: [...days, ...newDays] });
        } else {
          // Remove excess days
          const updatedDays = days.slice(0, targetCount);
          set({ days: updatedDays });
        }
      },

      addItem: (dayId, item) => {
        const { days } = get();
        if (!item || typeof item !== "object") return;

        const newItem = {
          id: Date.now(),
          title: item.title || "",
          description: item.description || "",
        };

        set({
          days: days.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  items: [...(day.items || []), newItem],
                }
              : day,
          ),
        });
      },

      updateItem: (dayId, itemId, updates) => {
        const { days } = get();
        if (!updates || typeof updates !== "object") return;

        const sanitizedUpdates = {
          title: updates.title || "",
          description: updates.description || "",
        };

        set({
          days: days.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  items: (day.items || []).map((item) =>
                    item.id === itemId
                      ? { ...item, ...sanitizedUpdates }
                      : item,
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
        try {
          if (!itineraryData || typeof itineraryData !== "object") {
            console.warn("Invalid itinerary data provided to loadItinerary");
            return;
          }

          // Safely extract and validate data
          const quotation = itineraryData.quotation || null;
          const days = Array.isArray(itineraryData.days)
            ? itineraryData.days.map((day, index) => ({
                id: day.id || Date.now() + Math.random(),
                title: day.title || `Day ${index + 1}`,
                items: Array.isArray(day.items)
                  ? day.items.map((item) => ({
                      id: item.id || Date.now() + Math.random(),
                      title: item.title || "",
                      description: item.description || "",
                    }))
                  : [],
              }))
            : [];
          const markup = Number(itineraryData.markup) || 20;
          const currency = itineraryData.currency || "USD";

          set({
            quotation,
            days,
            markup,
            currency,
          });
        } catch (error) {
          console.error("Error loading itinerary:", error);
          // Reset to safe defaults on error
          set({
            quotation: null,
            days: [],
            markup: 20,
            currency: "USD",
          });
        }
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
        const { quotation, days, markup, currency } = get();
        return {
          quotation,
          days,
          markup,
          currency,
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

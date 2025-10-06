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
        if (!days || !Array.isArray(days)) return 0;

        return days.reduce((total, day) => {
          if (!day || !Array.isArray(day.items)) return total;

          return (
            total +
            day.items.reduce((dayTotal, item) => {
              const itemCost = Number(item?.cost) || 0;
              return dayTotal + itemCost;
            }, 0)
          );
        }, 0);
      },

      getTotalWithMarkup: () => {
        const { getTotalNetCost, markup } = get();
        const netCost = getTotalNetCost();
        const markupValue = Number(markup) || 0;
        return netCost + (netCost * markupValue) / 100;
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
              dayNumber: i,
              title: `Day ${i}`,
              description: "",
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
          type: item.type || "other",
          title: item.title || "",
          description: item.description || "",
          cost: Number(item.cost) || 0,
          time: item.time || "",
          location: item.location || "",
          notes: item.notes || "",
          ...item,
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
          ...updates,
          cost: Number(updates.cost) || 0,
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
            ? itineraryData.days.map((day) => ({
                id: day.id || Date.now() + Math.random(),
                dayNumber: day.dayNumber || 1,
                title: day.title || `Day ${day.dayNumber || 1}`,
                description: day.description || "",
                items: Array.isArray(day.items)
                  ? day.items.map((item) => ({
                      id: item.id || Date.now() + Math.random(),
                      type: item.type || "other",
                      title: item.title || "",
                      description: item.description || "",
                      cost: Number(item.cost) || 0,
                      time: item.time || "",
                      location: item.location || "",
                      notes: item.notes || "",
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

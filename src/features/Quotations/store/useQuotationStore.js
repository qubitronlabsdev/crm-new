// Import Dependencies
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// ----------------------------------------------------------------------

const useQuotationStore = create(
  devtools(
    (set, get) => ({
      // Basic Details (Step 1)
      basicDetails: {
        quoteId: "",
        version: "1.0",
        title: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        validUntil: "",
        description: "",
      },

      // Travel Requirements (Step 2)
      travelRequirements: {
        destination: "",
        startDate: "",
        endDate: "",
        duration: 0,
        numberOfTravelers: 1,
        adults: 1,
        children: 0,
        infants: 0,
        travelType: "leisure", // leisure, business, adventure, family
        budgetRange: "",
        specialRequirements: "",
        accommodationType: "hotel", // hotel, resort, hostel, apartment
        roomType: "standard", // standard, deluxe, suite
        mealPlan: "breakfast", // breakfast, half-board, full-board, all-inclusive
        transportPreference: "flight", // flight, train, bus, car
      },

      // Itinerary (Step 3) - Using existing itinerary store structure
      itinerary: {
        days: [],
        hotels: [],
        transportation: [],
        activities: [],
      },

      // Pricing & Terms (Step 4)
      pricingTerms: {
        costBreakdown: {
          landPackage: 0,
          flights: 0,
          hotels: 0,
          transportation: 0,
          activities: 0,
          taxes: 0,
          markup: 20,
        },
        totalCost: 0,
        currency: "USD",
        paymentTerms: {
          advancePayment: 25, // percentage
          finalPayment: 75, // percentage
          advanceDueDate: "",
          finalDueDate: "",
        },
        inclusions: [],
        exclusions: [],
        cancellationPolicy: "",
        termsAndConditions: "",
      },

      // Current step
      currentStep: 0,

      // Actions
      setBasicDetails: (details) =>
        set((state) => ({
          basicDetails: { ...state.basicDetails, ...details },
        })),

      setTravelRequirements: (requirements) =>
        set((state) => ({
          travelRequirements: { ...state.travelRequirements, ...requirements },
        })),

      setItinerary: (itinerary) =>
        set((state) => ({
          itinerary: { ...state.itinerary, ...itinerary },
        })),

      setPricingTerms: (terms) =>
        set((state) => ({
          pricingTerms: { ...state.pricingTerms, ...terms },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      // Generate Quote ID
      generateQuoteId: () => {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        const quoteId = `QT-${timestamp}-${random}`;

        set((state) => ({
          basicDetails: { ...state.basicDetails, quoteId },
        }));

        return quoteId;
      },

      // Calculate total cost
      calculateTotalCost: () => {
        const { costBreakdown } = get().pricingTerms;
        const total =
          costBreakdown.landPackage +
          costBreakdown.flights +
          costBreakdown.hotels +
          costBreakdown.transportation +
          costBreakdown.activities +
          costBreakdown.taxes;

        const totalWithMarkup = total + (total * costBreakdown.markup) / 100;

        set((state) => ({
          pricingTerms: {
            ...state.pricingTerms,
            totalCost: totalWithMarkup,
          },
        }));

        return totalWithMarkup;
      },

      // Validate current step
      validateStep: (stepIndex) => {
        const state = get();

        switch (stepIndex) {
          case 0: // Basic Details
            return (
              state.basicDetails.title &&
              state.basicDetails.customerName &&
              state.basicDetails.customerEmail &&
              state.basicDetails.validUntil
            );

          case 1: // Travel Requirements
            return (
              state.travelRequirements.destination &&
              state.travelRequirements.startDate &&
              state.travelRequirements.endDate &&
              state.travelRequirements.numberOfTravelers > 0
            );

          case 2: // Itinerary
            return state.itinerary.days.length > 0;

          case 3: // Pricing & Terms
            return (
              state.pricingTerms.totalCost > 0 &&
              state.pricingTerms.inclusions.length > 0 &&
              state.pricingTerms.exclusions.length > 0
            );

          default:
            return false;
        }
      },

      // Export complete quotation data
      exportQuotation: () => {
        const state = get();
        return {
          ...state.basicDetails,
          ...state.travelRequirements,
          ...state.itinerary,
          ...state.pricingTerms,
          createdAt: new Date().toISOString(),
          status: "draft",
        };
      },

      // Reset store
      resetQuotation: () =>
        set({
          basicDetails: {
            quoteId: "",
            version: "1.0",
            title: "",
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            validUntil: "",
            description: "",
          },
          travelRequirements: {
            destination: "",
            startDate: "",
            endDate: "",
            duration: 0,
            numberOfTravelers: 1,
            adults: 1,
            children: 0,
            infants: 0,
            travelType: "leisure",
            budgetRange: "",
            specialRequirements: "",
            accommodationType: "hotel",
            roomType: "standard",
            mealPlan: "breakfast",
            transportPreference: "flight",
          },
          itinerary: {
            days: [],
            hotels: [],
            transportation: [],
            activities: [],
          },
          pricingTerms: {
            costBreakdown: {
              landPackage: 0,
              flights: 0,
              hotels: 0,
              transportation: 0,
              activities: 0,
              taxes: 0,
              markup: 20,
            },
            totalCost: 0,
            currency: "USD",
            paymentTerms: {
              advancePayment: 25,
              finalPayment: 75,
              advanceDueDate: "",
              finalDueDate: "",
            },
            inclusions: [],
            exclusions: [],
            cancellationPolicy: "",
            termsAndConditions: "",
          },
          currentStep: 0,
        }),
    }),
    {
      name: "quotation-store",
    },
  ),
);

export { useQuotationStore };

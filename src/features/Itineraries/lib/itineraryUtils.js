// Itinerary management utilities

// Mock API functions
export const itineraryApi = {
  // Get all itineraries
  getItineraries: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock response
    return {
      data: [
        {
          id: 1,
          title: "Romantic Paris Getaway",
          description:
            "A romantic 7-day trip to Paris with luxury accommodations",
          customer_name: "John & Jane Smith",
          customer_email: "john.smith@email.com",
          destination: "Paris, France",
          start_date: "2024-02-14",
          end_date: "2024-02-21",
          duration_days: 7,
          total_cost: 3500,
          status: "confirmed",
          priority: "high",
          agent_assigned: "jane_doe",
          departure_city: "New York",
          accommodation_type: "hotel",
          transportation_mode: "flight",
          special_requirements: "Anniversary celebration, room with view",
          notes: "VIP customer, ensure excellent service",
          created_at: "2024-01-15",
          updated_at: "2024-01-15",
        },
        // Add more mock itineraries as needed
      ],
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 1,
      },
    };
  },

  // Get itinerary by ID
  getItineraryById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      id: parseInt(id),
      title: "Romantic Paris Getaway",
      description: "A romantic 7-day trip to Paris with luxury accommodations",
      customer_name: "John & Jane Smith",
      customer_email: "john.smith@email.com",
      destination: "Paris, France",
      start_date: "2024-02-14",
      end_date: "2024-02-21",
      duration_days: 7,
      total_cost: 3500,
      status: "confirmed",
      priority: "high",
      agent_assigned: "jane_doe",
      departure_city: "New York",
      accommodation_type: "hotel",
      transportation_mode: "flight",
      special_requirements: "Anniversary celebration, room with view",
      notes: "VIP customer, ensure excellent service",
      created_at: "2024-01-15",
      updated_at: "2024-01-15",
    };
  },

  // Create new itinerary
  createItinerary: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Creating itinerary:", data);
    return {
      id: Date.now(),
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  },

  // Update itinerary
  updateItinerary: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`Updating itinerary ${id}:`, data);
    return {
      id: parseInt(id),
      ...data,
      updated_at: new Date().toISOString(),
    };
  },

  // Delete itinerary
  deleteItinerary: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(`Deleting itinerary ${id}`);
    return { success: true };
  },
};

// Transform itinerary data for form
export const transformItineraryToFormData = (itinerary) => {
  if (!itinerary) return null;

  return {
    title: itinerary.title || "",
    description: itinerary.description || "",
    customer_name: itinerary.customer_name || "",
    customer_email: itinerary.customer_email || "",
    destination: itinerary.destination || "",
    start_date: itinerary.start_date || "",
    end_date: itinerary.end_date || "",
    duration_days: itinerary.duration_days || 1,
    total_cost: itinerary.total_cost || "",
    status: itinerary.status || "draft",
    priority: itinerary.priority || "medium",
    agent_assigned: itinerary.agent_assigned || "",
    departure_city: itinerary.departure_city || "",
    accommodation_type: itinerary.accommodation_type || "",
    transportation_mode: itinerary.transportation_mode || "",
    special_requirements: itinerary.special_requirements || "",
    notes: itinerary.notes || "",
  };
};

// Get itinerary by ID from localStorage (for demo)
export const getItineraryById = (id) => {
  const itineraries = JSON.parse(localStorage.getItem("itineraries") || "[]");
  return itineraries.find((itinerary) => itinerary.id === parseInt(id));
};

// Save itinerary to localStorage (for demo)
export const saveItinerary = (itinerary) => {
  const itineraries = JSON.parse(localStorage.getItem("itineraries") || "[]");

  if (itinerary.id) {
    // Update existing
    const index = itineraries.findIndex((item) => item.id === itinerary.id);
    if (index !== -1) {
      itineraries[index] = {
        ...itinerary,
        updated_at: new Date().toISOString(),
      };
    }
  } else {
    // Create new
    const newItinerary = {
      ...itinerary,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    itineraries.push(newItinerary);
  }

  localStorage.setItem("itineraries", JSON.stringify(itineraries));
  return itinerary;
};

// Calculate duration between dates
export const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return 1;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays || 1;
};

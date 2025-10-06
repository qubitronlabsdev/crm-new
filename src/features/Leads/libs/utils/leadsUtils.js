// Utility functions for managing leads data in localStorage

// Get all leads from localStorage
export const getLeadsFromStorage = () => {
  try {
    const savedLeads = localStorage.getItem("leadsData");
    if (savedLeads) {
      return JSON.parse(savedLeads);
    }
    return null;
  } catch (error) {
    console.error("Error getting leads from storage:", error);
    return null;
  }
};

// Save leads to localStorage
export const saveLeadsToStorage = (leadsData) => {
  try {
    localStorage.setItem("leadsData", JSON.stringify(leadsData));
    return true;
  } catch (error) {
    console.error("Error saving leads to storage:", error);
    return false;
  }
};

// Add a new lead to the existing leads data
export const addLeadToStorage = (newLeadData) => {
  try {
    const existingLeads = getLeadsFromStorage();

    if (!existingLeads) {
      // If no existing data, create new structure
      const newLeadsData = {
        data: [newLeadData],
        links: {
          first: "/?page=1",
          last: "/?page=1",
          prev: null,
          next: null,
        },
        meta: {
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: 15,
          to: 1,
          total: 1,
        },
      };
      saveLeadsToStorage(newLeadsData);
      return newLeadsData;
    }

    // Generate new ID (highest existing ID + 1)
    const maxId = Math.max(...existingLeads.data.map((lead) => lead.id), 0);
    const newLead = {
      ...newLeadData,
      id: maxId + 1,
      created_at: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    };

    // Add new lead to the beginning of the array (most recent first)
    const updatedLeads = {
      ...existingLeads,
      data: [newLead, ...existingLeads.data],
      meta: {
        ...existingLeads.meta,
        total: existingLeads.data.length + 1,
        to: existingLeads.data.length + 1,
      },
    };

    saveLeadsToStorage(updatedLeads);
    return updatedLeads;
  } catch (error) {
    console.error("Error adding lead to storage:", error);
    return null;
  }
};

// Get a specific lead by ID from localStorage
export const getLeadById = (leadId) => {
  try {
    const leadsData = getLeadsFromStorage();
    console.log("getLeadById - leads data:", leadsData);
    console.log(
      "getLeadById - searching for ID:",
      leadId,
      "type:",
      typeof leadId,
    );

    if (leadsData && leadsData.data) {
      const lead = leadsData.data.find((lead) => {
        console.log(
          "Comparing lead.id:",
          lead.id,
          "with leadId:",
          leadId,
          "match:",
          lead.id == leadId,
        );
        return lead.id == leadId; // Use == to handle string/number comparison
      });
      console.log("getLeadById - found lead:", lead);
      return lead || null;
    }
    return null;
  } catch (error) {
    console.error("Error getting lead by ID:", error);
    return null;
  }
};

// Transform form data to lead format
export const transformFormDataToLead = (formData) => {
  return {
    customer_name: formData.name || "",
    customer_email: formData.email || "",
    customer_phone: formData.phone || "",
    destination: formData.destination || "",
    status: formData.status || "fresh",
    priority: formData.priority || "medium",
    budget: formData.estimated_value || 0,
    travel_dates: formData.travel_date || "",
    // travel_time: formData.travel_time || "",
    assigned_agent: formData.agent_assignment || "unassigned",
    lead_source: formData.lead_source || "",
    days: formData.days || 1,
    adults: formData.adults || 1,
    children: formData.children || 0,
    children_age: formData.children_age || "",
    departure_city: formData.departure_city || "",
    expected_close_date: formData.expected_close_date || "",
    travel_preferences: formData.travel_preferences || "",
    notes: formData.notes || "",
  };
};

// Transform lead data back to form format
export const transformLeadToFormData = (leadData) => {
  return {
    id: leadData.id,
    name: leadData.customer_name || "",
    email: leadData.customer_email || "",
    phone: leadData.customer_phone || "",
    agent_assignment: leadData.assigned_agent || "",
    travel_date: leadData.travel_dates || "",
    // travel_time: leadData.travel_time || "",
    status: leadData.status || "fresh",
    priority: leadData.priority || "medium",
    lead_source: leadData.lead_source || "",
    days: leadData.days || 1,
    adults: leadData.adults || 1,
    children: leadData.children || 0,
    children_age: leadData.children_age || "",
    departure_city: leadData.departure_city || "",
    destination: leadData.destination || "",
    estimated_value: leadData.budget || "",
    expected_close_date: leadData.expected_close_date || "",
    travel_preferences: leadData.travel_preferences || "",
    notes: leadData.notes || "",
  };
};

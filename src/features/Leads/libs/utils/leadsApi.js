// Mock Leads API Service
// This simulates the backend API for leads management

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
const mockLeadsData = [
  {
    id: 1,
    customer_name: "John Smith",
    customer_phone: "+1 (555) 123-4567",
    customer_email: "john.smith@email.com",
    destination: "Paris, France",
    lead_status: "fresh",
    travel_date: "2024-06-15",
    source: "Website",
    agent_assigned: "Sarah Wilson",
    created_agent: "Admin",
    priority: "medium",
    budget: 5000,
    group_size: 2,
    lead_source: "website",
    notes:
      "Interested in a romantic getaway for anniversary. Prefers luxury accommodations.",
    created_at: "2024-01-15T10:30:00.000Z",
    updated_at: "2024-01-15T10:30:00.000Z",
  },
  {
    id: 2,
    customer_name: "Emily Johnson",
    customer_phone: "+1 (555) 234-5678",
    customer_email: "emily.johnson@email.com",
    destination: "Tokyo, Japan",
    lead_status: "converted",
    travel_date: "2024-07-10",
    source: "Email",
    agent_assigned: "Mike Chen",
    created_agent: "Admin",
    priority: "high",
    budget: 8000,
    group_size: 4,
    lead_source: "email",
    notes:
      "Business trip with colleagues. Needs assistance with visa requirements.",
    created_at: "2024-01-14T09:15:00.000Z",
    updated_at: "2024-01-16T14:20:00.000Z",
  },
  {
    id: 3,
    customer_name: "Robert Davis",
    customer_phone: "+1 (555) 345-6789",
    customer_email: "robert.davis@email.com",
    destination: "London, UK",
    lead_status: "postponed",
    travel_date: "2024-05-20",
    source: "Phone",
    agent_assigned: "Jessica Brown",
    created_agent: "Admin",
    priority: "low",
    budget: 3500,
    group_size: 1,
    lead_source: "phone",
    notes: "Solo traveler, postponed due to work commitments.",
    created_at: "2024-01-13T16:45:00.000Z",
    updated_at: "2024-01-14T11:30:00.000Z",
  },
  {
    id: 4,
    customer_name: "Alice Brown",
    customer_phone: "+1 (555) 456-7890",
    customer_email: "alice.brown@email.com",
    destination: "Rome, Italy",
    lead_status: "fresh",
    travel_date: "2024-08-10",
    source: "Social Media",
    agent_assigned: "Sarah Wilson",
    created_agent: "Sarah Wilson",
    priority: "urgent",
    budget: 6000,
    group_size: 3,
    lead_source: "social_media",
    notes:
      "Family vacation with children. Interested in family-friendly activities.",
    created_at: "2024-01-16T13:20:00.000Z",
    updated_at: "2024-01-16T13:20:00.000Z",
  },
  {
    id: 5,
    customer_name: "David Wilson",
    customer_phone: "+1 (555) 567-8901",
    customer_email: "david.wilson@email.com",
    destination: "Barcelona, Spain",
    lead_status: "fresh",
    travel_date: "2024-09-05",
    source: "Email",
    agent_assigned: "Mike Chen",
    created_agent: "Jessica Brown",
    priority: "medium",
    budget: 4500,
    group_size: 2,
    lead_source: "email",
    notes: "Honeymoon trip. Looking for romantic experiences and fine dining.",
    created_at: "2024-01-17T08:10:00.000Z",
    updated_at: "2024-01-17T08:10:00.000Z",
  },
];

// Utility functions
const applyFilters = (data, filters) => {
  return data.filter((lead) => {
    // Filter by lead_source
    if (filters.lead_source && lead.lead_source !== filters.lead_source)
      return false;

    // Filter by agent_assigned
    if (
      filters.agent_assigned &&
      lead.agent_assigned !== filters.agent_assigned
    )
      return false;

    // Filter by destination
    if (
      filters.destination &&
      !lead.destination
        .toLowerCase()
        .includes(filters.destination.toLowerCase())
    )
      return false;

    // Filter by lead_status
    if (filters.lead_status && lead.lead_status !== filters.lead_status)
      return false;

    return true;
  });
};

const applySort = (data, sort) => {
  return [...data].sort((a, b) => {
    let aValue = a[sort.field];
    let bValue = b[sort.field];

    // Handle date sorting
    if (
      sort.field === "created_at" ||
      sort.field === "updated_at" ||
      sort.field === "travel_date"
    ) {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    // Handle priority sorting
    if (sort.field === "priority") {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      aValue = priorityOrder[aValue] || 0;
      bValue = priorityOrder[bValue] || 0;
    }

    // Compare values
    if (aValue < bValue) return sort.order === "asc" ? -1 : 1;
    if (aValue > bValue) return sort.order === "asc" ? 1 : -1;
    return 0;
  });
};

// API Functions
export const leadsApi = {
  // Get all leads with filters and sorting
  async getLeads(params = {}) {
    await delay(500); // Simulate network delay

    const {
      page = 1,
      per_page = 10,
      filters = {},
      sort = { field: "created_at", order: "desc" },
    } = params;

    let filteredData = applyFilters(mockLeadsData, filters);
    let sortedData = applySort(filteredData, sort);

    // Pagination
    const total = sortedData.length;
    const start = (page - 1) * per_page;
    const end = start + per_page;
    const paginatedData = sortedData.slice(start, end);

    return {
      data: paginatedData,
      meta: {
        current_page: page,
        from: start + 1,
        last_page: Math.ceil(total / per_page),
        per_page: per_page,
        to: Math.min(end, total),
        total: total,
      },
      links: {
        first: `/?page=1`,
        last: `/?page=${Math.ceil(total / per_page)}`,
        prev: page > 1 ? `/?page=${page - 1}` : null,
        next: page < Math.ceil(total / per_page) ? `/?page=${page + 1}` : null,
      },
    };
  },

  // Get leads by status
  async getLeadsByStatus(status, params = {}) {
    return this.getLeads({
      ...params,
      filters: { ...params.filters, lead_status: status },
    });
  },

  // Get single lead
  async getLead(id) {
    await delay(300);
    const lead = mockLeadsData.find((lead) => lead.id === parseInt(id));
    if (!lead) {
      throw new Error("Lead not found");
    }
    return lead;
  },

  // Create new lead
  async createLead(data) {
    await delay(800);
    const newLead = {
      id: mockLeadsData.length + 1,
      ...data,
      lead_status: "fresh", // Default status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockLeadsData.push(newLead);
    return newLead;
  },

  // Update lead
  async updateLead(id, data) {
    await delay(600);
    const index = mockLeadsData.findIndex((lead) => lead.id === parseInt(id));
    if (index === -1) {
      throw new Error("Lead not found");
    }

    mockLeadsData[index] = {
      ...mockLeadsData[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    return mockLeadsData[index];
  },

  // Delete lead
  async deleteLead(id) {
    await delay(400);
    const index = mockLeadsData.findIndex((lead) => lead.id === parseInt(id));
    if (index === -1) {
      throw new Error("Lead not found");
    }

    const deletedLead = mockLeadsData.splice(index, 1)[0];
    return deletedLead;
  },

  // Get lead statistics
  async getLeadStats() {
    await delay(200);
    const total = mockLeadsData.length;
    const fresh = mockLeadsData.filter(
      (lead) => lead.lead_status === "fresh",
    ).length;
    const converted = mockLeadsData.filter(
      (lead) => lead.lead_status === "converted",
    ).length;
    const postponed = mockLeadsData.filter(
      (lead) => lead.lead_status === "postponed",
    ).length;

    return {
      total,
      fresh,
      converted,
      postponed,
    };
  },
};

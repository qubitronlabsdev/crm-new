// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeftIcon,
  DocumentArrowDownIcon,
  PaperAirplaneIcon,
  PencilIcon,
  ShoppingCartIcon,
  EyeIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon as AirplaneIcon,
  StarIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  MapPinIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card, Select } from "components/ui";
import { Page } from "components/shared/Page";
import { ROUTES } from "app/router/routes";

// ----------------------------------------------------------------------
const getItemTypeIcon = (type) => {
  const iconClass = "h-6 w-6";

  switch (type) {
    case "hotel":
      return <BuildingOfficeIcon className={iconClass} />;
    case "flight":
      return <AirplaneIcon className={iconClass} />;
    case "activity":
      return <StarIcon className={iconClass} />;
    case "transport":
      return <TruckIcon className={iconClass} />;
    case "meal":
      return <ClipboardDocumentListIcon className={iconClass} />;
    default:
      return <ClipboardDocumentListIcon className={iconClass} />;
  }
};

// Mock data with all schema fields
const mockQuotation = {
  id: 1,
  title: "Paris Romantic Getaway",
  description:
    "A beautiful 5-day romantic trip to Paris with luxury accommodations and exclusive experiences",
  customer_name: "John Smith",
  customer_email: "john.smith@email.com",
  valid_until: "2024-03-15",
  status: "sent",
  version: 1,
  created_at: "2024-01-15",

  // Travel Details
  travel_date: "2024-02-14",
  travel_time: "09:00 AM",
  expected_close_date: "2024-02-01",
  departure_city: "New York",
  destination: "Paris, France",
  days: 5,
  nights: 4,
  adults: 2,
  children: 0,
  children_age: null,
  budget: 3000,
  special_requests:
    "Anniversary celebration, prefer quiet rooms, dietary restrictions: vegetarian options",

  // Hotels & Transportation
  hotel_rating: "5",
  room_type: "suite",
  meal_plan: "Bed & Breakfast",
  transportation_mode: "flight",
  transportation_charges: [
    { description: "Round-trip flights", amount: 1200 },
    { description: "Airport transfers", amount: 120 },
    { description: "Local transportation", amount: 200 },
  ],

  // Cost & Pricing
  base_package_price: 2800,
  taxes_services_charges: 18,
  total_package_price: 3304,
  per_person_price: 1652,
  payment_terms: "50_50",
  pricing_notes:
    "Early bird discount applied. Prices subject to currency fluctuation.",

  // Inclusions & Exclusions
  inclusions: [
    "Accommodation as per itinerary",
    "Daily breakfast at hotel",
    "Airport transfers",
    "City tour with professional guide",
    "Entry tickets to Eiffel Tower",
    "Seine River cruise",
    "Travel insurance",
  ],
  exclusions: [
    "International flights (quoted separately)",
    "Lunch and dinner (except where mentioned)",
    "Personal expenses and shopping",
    "Optional activities not mentioned in itinerary",
    "Visa fees",
    "Tips and gratuities",
    "Any services not specifically mentioned in inclusions",
  ],
  cancellation_policy:
    "Free cancellation up to 30 days before travel. 50% refund for cancellations 15-30 days before travel. No refund for cancellations within 15 days of travel.",
  terms_conditions:
    "All bookings are subject to availability. Prices are per person based on double occupancy. Single supplement charges apply for solo travelers. The company reserves the right to modify the itinerary due to unforeseen circumstances.",

  // Template
  template_selection: "template_2",

  // Itinerary Details
  itinerary_days: [
    {
      id: 1,
      dayNumber: 1,
      title: "Day 1: Arrival in Paris",
      description: "Welcome to the City of Light",
      items: [
        {
          id: 1,
          type: "flight",
          title: "Flight to Paris",
          description: "Economy class flight with meal service",
          cost: 800,
          time: "10:00 AM",
          location: "Charles de Gaulle Airport",
          notes: "Includes checked baggage",
        },
        {
          id: 2,
          type: "transport",
          title: "Airport Transfer",
          description: "Private transfer to hotel",
          cost: 60,
          time: "2:00 PM",
          location: "CDG to Hotel",
          notes: "Luxury sedan",
        },
        {
          id: 3,
          type: "hotel",
          title: "Hotel Check-in",
          description: "Le Meurice - Superior Room",
          cost: 450,
          time: "3:00 PM",
          location: "Le Meurice Hotel",
          notes: "City view, king bed, complimentary WiFi",
        },
        {
          id: 4,
          type: "meal",
          title: "Welcome Dinner",
          description: "3-course dinner at hotel restaurant",
          cost: 120,
          time: "7:00 PM",
          location: "Le Dali Restaurant",
          notes: "Wine pairing included",
        },
      ],
    },
    {
      id: 2,
      dayNumber: 2,
      title: "Day 2: Classic Paris",
      description: "Explore iconic Parisian landmarks",
      items: [
        {
          id: 5,
          type: "activity",
          title: "Eiffel Tower Visit",
          description: "Skip-the-line tickets to summit",
          cost: 80,
          time: "9:00 AM",
          location: "Eiffel Tower",
          notes: "Audio guide included",
        },
        {
          id: 6,
          type: "activity",
          title: "Seine River Cruise",
          description: "1-hour scenic cruise",
          cost: 40,
          time: "2:00 PM",
          location: "Seine River",
          notes: "Commentary in multiple languages",
        },
        {
          id: 7,
          type: "meal",
          title: "Romantic Dinner",
          description: "Michelin-starred restaurant",
          cost: 200,
          time: "7:30 PM",
          location: "Le Grand Véfour",
          notes: "7-course tasting menu",
        },
      ],
    },
  ],
};

const versions = [
  { value: 1, label: "Version 1 (Current)" },
  { value: 2, label: "Version 2 (Draft)" },
];

// Helper function to format payment terms
const formatPaymentTerms = (terms) => {
  const termLabels = {
    full_advance: "Full payment required in advance",
    "50_50": "50% advance payment, 50% balance due before travel",
    "30_70": "30% advance payment, 70% balance due before travel",
    installments: "Payment in installments as agreed",
    on_confirmation: "Payment due on booking confirmation",
  };
  return termLabels[terms] || terms;
};

// ----------------------------------------------------------------------

export default function ShowQuotation() {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: InformationCircleIcon },
    { id: "itinerary", label: "Itinerary", icon: CalendarDaysIcon },
    { id: "pricing", label: "Pricing", icon: CurrencyDollarIcon },
    { id: "terms", label: "Terms", icon: DocumentTextIcon },
  ];

  useEffect(() => {
    // In real app, quotation data would come from Inertia.js props
    setQuotation(mockQuotation);
  }, [id]);

  const handleDownloadPDF = () => {
    console.log("Downloading PDF for quotation:", id);
    // In real app: window.open(`/quotations/${id}/pdf`, '_blank')
  };

  const handleSendToCustomer = () => {
    console.log("Sending quotation to customer:", id);
    // In real app: router.post(`/quotations/${id}/send`)
  };

  const handleConvertToBooking = () => {
    console.log("Converting to booking:", id);
    // In real app: router.post(`/quotations/${id}/convert-to-booking`)
  };

  if (!quotation) {
    return (
      <Page title="Quotation Details - Travel CRM">
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </Page>
    );
  }

  return (
    <Page title={`${quotation.title} - Travel CRM`}>
      <div className="transition-content w-full space-y-6 px-(--margin-x) py-5 lg:py-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button
              component={Link}
              to={ROUTES.QUOTATIONS.ROOT}
              variant="soft"
              color="neutral"
              isIcon
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div>
              <div className="mt-2 flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Quotation #{quotation.id}
                </h1>
                <Badge color="success" variant="soft">
                  {quotation.status}
                </Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {quotation.customer_name} • Valid until{" "}
                {new Date(quotation.valid_until).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(Number(e.target.value))}
              data={versions}
              className="w-40"
            />
            <Button onClick={handleDownloadPDF} variant="soft" color="info">
              <DocumentArrowDownIcon className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
            <Button
              onClick={handleSendToCustomer}
              variant="soft"
              color="primary"
            >
              <PaperAirplaneIcon className="mr-2 h-5 w-5" />
              Send to Customer
            </Button>
            <Button
              component={Link}
              to={`${ROUTES.QUOTATIONS.EDIT(quotation.id)}`}
              variant="soft"
              color="warning"
            >
              <PencilIcon className="mr-2 h-5 w-5" />
              Revise
            </Button>
            <Button onClick={handleConvertToBooking} color="success">
              <ShoppingCartIcon className="mr-2 h-5 w-5" />
              Convert to Booking
            </Button>
          </div>
        </div>

        {/* Quotation Summary Card */}
        <Card className="p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left: Basic Info */}
            <div className="text-center lg:text-left">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                {quotation.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {quotation.description}
              </p>
              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <strong>Destination:</strong> {quotation.destination}
                </p>
                <p>
                  <strong>Duration:</strong> {quotation.days} Days /{" "}
                  {quotation.nights} Nights
                </p>
                <p>
                  <strong>Travelers:</strong> {quotation.adults} Adults{" "}
                  {quotation.children > 0 && `+ ${quotation.children} Children`}
                </p>
              </div>
            </div>

            {/* Center: Key Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-primary-600 dark:text-primary-400 text-xl font-bold">
                  {quotation.days}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Days
                </div>
              </div>
              <div>
                <div className="text-success-600 dark:text-success-400 text-xl font-bold">
                  {quotation.itinerary_days.reduce(
                    (total, day) => total + day.items.length,
                    0,
                  )}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Activities
                </div>
              </div>
              <div>
                <div className="text-warning-600 dark:text-warning-400 text-xl font-bold">
                  ₹{quotation.total_package_price.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Total Price
                </div>
              </div>
            </div>

            {/* Right: Price Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Base Price:
                </span>
                <span>₹{quotation.base_package_price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Taxes ({quotation.taxes_services_charges}%):
                </span>
                <span>
                  ₹
                  {(
                    (quotation.base_package_price *
                      quotation.taxes_services_charges) /
                    100
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold">
                <span>Total:</span>
                <span className="text-primary-600 dark:text-primary-400">
                  ₹{quotation.total_package_price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  Per Person:
                </span>
                <span>₹{quotation.per_person_price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabbed Content */}
        <div>
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium ${
                      activeTab === tab.id
                        ? "border-primary-500 text-primary-600 dark:text-primary-400"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Travel Details */}
                <Card className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Travel Details
                  </h3>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Travel Date:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(quotation.travel_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Travel Time:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {quotation.travel_time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Departure:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {quotation.departure_city}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Budget:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ₹{quotation.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Expected Close:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(
                          quotation.expected_close_date,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {quotation.special_requests && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                        Special Requests:
                      </h4>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        {quotation.special_requests}
                      </p>
                    </div>
                  )}
                </Card>

                {/* Accommodation & Transportation */}
                <Card className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Accommodation & Transportation
                  </h3>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Hotel Rating:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {quotation.hotel_rating} Star
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Room Type:
                      </span>
                      <span className="text-gray-900 capitalize dark:text-white">
                        {quotation.room_type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Meal Plan:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {quotation.meal_plan}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Transportation:
                      </span>
                      <span className="text-gray-900 capitalize dark:text-white">
                        {quotation.transportation_mode}
                      </span>
                    </div>
                  </div>
                  {quotation.transportation_charges &&
                    quotation.transportation_charges.length > 0 && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                          Transportation Breakdown:
                        </h4>
                        <div className="space-y-2">
                          {quotation.transportation_charges.map(
                            (charge, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-base"
                              >
                                <span className="text-gray-600 dark:text-gray-400">
                                  {charge.description}:
                                </span>
                                <span className="text-gray-900 dark:text-white">
                                  ₹{charge.amount.toLocaleString()}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                </Card>

                {/* Inclusions & Exclusions */}
                <Card className="p-6 lg:col-span-2">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Package Inclusions & Exclusions
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Inclusions */}
                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                      <h4 className="mb-3 flex items-center gap-2 font-medium text-green-800 dark:text-green-300">
                        <CheckCircleIcon className="h-4 w-4" />
                        Inclusions ({quotation.inclusions.length} items)
                      </h4>
                      <ul className="space-y-1 text-sm text-green-700 dark:text-green-200">
                        {quotation.inclusions.slice(0, 5).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                        {quotation.inclusions.length > 5 && (
                          <li className="text-xs text-green-600 dark:text-green-300">
                            +{quotation.inclusions.length - 5} more items...
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Exclusions */}
                    <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                      <h4 className="mb-3 flex items-center gap-2 font-medium text-red-800 dark:text-red-300">
                        <XCircleIcon className="h-4 w-4" />
                        Exclusions ({quotation.exclusions.length} items)
                      </h4>
                      <ul className="space-y-1 text-sm text-red-700 dark:text-red-200">
                        {quotation.exclusions.slice(0, 5).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                        {quotation.exclusions.length > 5 && (
                          <li className="text-xs text-red-600 dark:text-red-300">
                            +{quotation.exclusions.length - 5} more items...
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Itinerary Tab */}
            {activeTab === "itinerary" && (
              <div className="space-y-6">
                {quotation.itinerary_days.map((day) => (
                  <Card key={day.id} className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="bg-primary-100 dark:bg-primary-900 flex h-10 w-10 items-center justify-center rounded-full">
                        <span className="text-primary-600 dark:text-primary-400 font-semibold">
                          {day.dayNumber}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {day.title}
                        </h3>
                        {day.description && (
                          <p className="text-gray-600 dark:text-gray-400">
                            {day.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {day.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                        >
                          <div className="text-xl">
                            {getItemTypeIcon(item.type)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between">
                              <div className="min-w-0 flex-1">
                                <h4 className="truncate font-medium text-gray-900 dark:text-white">
                                  {item.title}
                                </h4>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  {item.description}
                                </p>
                                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                  {item.time && (
                                    <div className="flex items-center gap-1">
                                      <ClockIcon className="h-3 w-3" />
                                      {item.time}
                                    </div>
                                  )}
                                  {item.location && (
                                    <div className="flex items-center gap-1">
                                      <MapPinIcon className="h-3 w-3" />
                                      <span className="truncate">
                                        {item.location}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                                ₹{item.cost.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Detailed Price Breakdown
                  </h3>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Base Package Price:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ₹{quotation.base_package_price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Taxes & Service Charges (
                        {quotation.taxes_services_charges}%):
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ₹
                        {(
                          (quotation.base_package_price *
                            quotation.taxes_services_charges) /
                          100
                        ).toLocaleString()}
                      </span>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-900 dark:text-white">
                        Total Package Price:
                      </span>
                      <span className="text-primary-600 dark:text-primary-400">
                        ₹{quotation.total_package_price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Per Person Price:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ₹{quotation.per_person_price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {quotation.pricing_notes && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                        Pricing Notes:
                      </h4>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        {quotation.pricing_notes}
                      </p>
                    </div>
                  )}
                </Card>

                <Card className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Quotation Information
                  </h3>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Customer:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {quotation.customer_name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Email:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {quotation.customer_email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Version:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {quotation.version}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Template:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {quotation.template_selection}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Created:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(quotation.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Valid Until:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(quotation.valid_until).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
                      Quick Actions
                    </h4>
                    <div className="space-y-2">
                      <Button
                        onClick={() => console.log("Preview quotation")}
                        variant="soft"
                        color="info"
                        className="w-full justify-start"
                      >
                        <EyeIcon className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        onClick={() => console.log("Duplicate quotation")}
                        variant="soft"
                        color="secondary"
                        className="w-full justify-start"
                      >
                        <ClipboardDocumentListIcon className="mr-2 h-4 w-4" />
                        Duplicate
                      </Button>
                      <Button
                        onClick={() => console.log("Send reminder")}
                        variant="soft"
                        color="warning"
                        className="w-full justify-start"
                      >
                        <EnvelopeIcon className="mr-2 h-4 w-4" />
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Terms Tab */}
            {activeTab === "terms" && (
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Terms & Conditions
                </h3>
                <div className="space-y-4 text-base text-gray-600 dark:text-gray-400">
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Payment Terms:
                    </strong>
                    <p className="mt-1">
                      {formatPaymentTerms(quotation.payment_terms)}
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Cancellation Policy:
                    </strong>
                    <p className="mt-1">{quotation.cancellation_policy}</p>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Terms & Conditions:
                    </strong>
                    <p className="mt-1">{quotation.terms_conditions}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}

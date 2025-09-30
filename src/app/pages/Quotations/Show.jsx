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
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card, Select } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Quotations", href: "/quotations" },
  { label: "Quotation Details" },
];

const getItemTypeIcon = (type) => {
  switch (type) {
    case "hotel":
      return "🏨";
    case "flight":
      return "✈️";
    case "activity":
      return "🎯";
    case "transport":
      return "🚗";
    case "meal":
      return "🍽️";
    default:
      return "📋";
  }
};

// Mock data
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
  days: [
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
  markup: 20,
  currency: "USD",
  totalNetCost: 1750,
  totalWithMarkup: 2100,
  payment_terms: "50% deposit required, balance due 30 days before travel",
  cancellation_policy: "Free cancellation up to 14 days before travel",
};

const versions = [
  { value: 1, label: "Version 1 (Current)" },
  { value: 2, label: "Version 2 (Draft)" },
];

// ----------------------------------------------------------------------

export default function ShowQuotation() {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(1);

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button
              component={Link}
              to="/quotations"
              variant="soft"
              color="neutral"
              isIcon
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div>
              <Breadcrumbs items={breadcrumbItems} />
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
              to={`/quotations/${quotation.id}/edit`}
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Quotation Header */}
            <Card className="p-6">
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {quotation.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {quotation.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
                <div>
                  <div className="text-primary-600 dark:text-primary-400 text-2xl font-bold">
                    {quotation.days.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Days
                  </div>
                </div>
                <div>
                  <div className="text-success-600 dark:text-success-400 text-2xl font-bold">
                    {quotation.days.reduce(
                      (total, day) => total + day.items.length,
                      0,
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Activities
                  </div>
                </div>
                <div>
                  <div className="text-warning-600 dark:text-warning-400 text-2xl font-bold">
                    ${quotation.totalWithMarkup.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Price
                  </div>
                </div>
              </div>
            </Card>

            {/* Itinerary Details */}
            {quotation.days.map((day) => (
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

                <div className="space-y-4">
                  {day.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                    >
                      <div className="text-2xl">
                        {getItemTypeIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {item.description}
                            </p>
                            {item.time && (
                              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                🕐 {item.time}
                                {item.location && ` • 📍 ${item.location}`}
                              </div>
                            )}
                            {item.notes && (
                              <div className="mt-1 text-xs text-gray-500 italic dark:text-gray-400">
                                {item.notes}
                              </div>
                            )}
                          </div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            ${item.cost.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {/* Terms and Conditions */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Terms & Conditions
              </h3>
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <strong className="text-gray-900 dark:text-white">
                    Payment Terms:
                  </strong>
                  <p>{quotation.payment_terms}</p>
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white">
                    Cancellation Policy:
                  </strong>
                  <p>{quotation.cancellation_policy}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Price Breakdown
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Net Cost:
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    ${quotation.totalNetCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Markup ({quotation.markup}%):
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    $
                    {(
                      (quotation.totalNetCost * quotation.markup) /
                      100
                    ).toLocaleString()}
                  </span>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    ${quotation.totalWithMarkup.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            {/* Quotation Details */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Quotation Details
              </h3>
              <div className="space-y-3 text-sm">
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
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Quick Actions
              </h3>
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
                  📋 Duplicate
                </Button>
                <Button
                  onClick={() => console.log("Send reminder")}
                  variant="soft"
                  color="warning"
                  className="w-full justify-start"
                >
                  📧 Send Reminder
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
}

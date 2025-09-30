// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentArrowUpIcon,
  XCircleIcon,
  CreditCardIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card, Input } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { Upload } from "components/ui/Form/Upload";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Bookings", href: "/bookings" },
  { label: "Booking Details" },
];

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "neutral";
  }
};

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return CheckCircleIcon;
    case "pending":
      return ClockIcon;
    case "cancelled":
      return XCircleIcon;
    default:
      return ClockIcon;
  }
};

// Mock data
const mockBooking = {
  id: 1,
  booking_number: "BK001",
  customer_name: "John Smith",
  customer_email: "john.smith@email.com",
  customer_phone: "+1 (555) 123-4567",
  destination: "Paris, France",
  travel_dates: "2024-06-15 to 2024-06-25",
  total_amount: 2100,
  payment_status: "partial",
  booking_status: "confirmed",
  created_at: "2024-01-15",
  itinerary: [
    {
      id: 1,
      type: "flight",
      title: "Flight to Paris",
      description: "Economy class flight",
      cost: 800,
      date: "2024-06-15",
      time: "10:00 AM",
      status: "confirmed",
      confirmation_number: "AF123456",
      notes: "Check-in 2 hours before departure",
    },
    {
      id: 2,
      type: "hotel",
      title: "Hotel Le Meurice",
      description: "Superior room with city view",
      cost: 450,
      date: "2024-06-15",
      time: "3:00 PM",
      status: "confirmed",
      confirmation_number: "HTL789012",
      notes: "Late check-in arranged",
    },
    {
      id: 3,
      type: "activity",
      title: "Eiffel Tower Visit",
      description: "Skip-the-line tickets",
      cost: 80,
      date: "2024-06-16",
      time: "9:00 AM",
      status: "pending",
      confirmation_number: "",
      notes: "",
    },
    {
      id: 4,
      type: "transport",
      title: "Airport Transfer",
      description: "Private car service",
      cost: 60,
      date: "2024-06-25",
      time: "2:00 PM",
      status: "pending",
      confirmation_number: "",
      notes: "",
    },
  ],
  documents: [
    {
      id: 1,
      name: "Flight Confirmation.pdf",
      type: "ticket",
      uploaded_at: "2024-01-16",
    },
    {
      id: 2,
      name: "Hotel Voucher.pdf",
      type: "voucher",
      uploaded_at: "2024-01-16",
    },
  ],
  invoices: [
    {
      id: 1,
      invoice_number: "INV001",
      amount: 1050,
      status: "paid",
      due_date: "2024-02-15",
      paid_date: "2024-02-10",
    },
    {
      id: 2,
      invoice_number: "INV002",
      amount: 1050,
      status: "pending",
      due_date: "2024-06-01",
      paid_date: null,
    },
  ],
};

const tabs = [
  { id: "overview", label: "Overview", icon: CalendarDaysIcon },
  { id: "operations", label: "Operations", icon: ListBulletIcon },
  { id: "documents", label: "Documents", icon: DocumentTextIcon },
  { id: "invoicing", label: "Invoicing", icon: CreditCardIcon },
];

// ----------------------------------------------------------------------

export default function ShowBooking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // In real app, booking data would come from Inertia.js props
    setBooking(mockBooking);
  }, [id]);

  const handleUpdateItemStatus = (itemId, status, confirmationNumber = "") => {
    setBooking((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((item) =>
        item.id === itemId
          ? { ...item, status, confirmation_number: confirmationNumber }
          : item,
      ),
    }));
  };

  const handleUploadDocument = (files) => {
    console.log("Uploading documents:", files);
    // In real app: handle file upload
  };

  if (!booking) {
    return (
      <Page title="Booking Details - Travel CRM">
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </Page>
    );
  }

  return (
    <Page title={`Booking ${booking.booking_number} - Travel CRM`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button
              component={Link}
              to="/bookings"
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
                  Booking {booking.booking_number}
                </h1>
                <Badge
                  color={getStatusColor(booking.booking_status)}
                  className="capitalize"
                >
                  {booking.booking_status}
                </Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {booking.customer_name} • {booking.destination}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-b-2 px-1 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? "border-primary-500 text-primary-600 dark:text-primary-400"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Trip Summary
                  </h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Destination
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {booking.destination}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Travel Dates
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {booking.travel_dates}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Total Amount
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        ${booking.total_amount.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Payment Status
                      </div>
                      <Badge
                        color={getStatusColor(booking.payment_status)}
                        className="capitalize"
                      >
                        {booking.payment_status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <Card className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Customer Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Name
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {booking.customer_name}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Email
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {booking.customer_email}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Phone
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {booking.customer_phone}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Operations Tab */}
          {activeTab === "operations" && (
            <Card className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                Operations Checklist
              </h2>
              <div className="space-y-4">
                {booking.itinerary.map((item) => {
                  const StatusIcon = getStatusIcon(item.status);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                    >
                      <div className="flex-shrink-0">
                        <StatusIcon
                          className={`h-6 w-6 ${
                            item.status === "confirmed"
                              ? "text-success-500"
                              : item.status === "pending"
                                ? "text-warning-500"
                                : "text-error-500"
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.description}
                            </p>
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {item.date} at {item.time} • ${item.cost}
                            </div>
                          </div>
                          <Badge
                            color={getStatusColor(item.status)}
                            className="capitalize"
                          >
                            {item.status}
                          </Badge>
                        </div>

                        {item.status === "pending" && (
                          <div className="mt-3 flex items-center gap-2">
                            <Input
                              placeholder="Confirmation number"
                              className="text-sm"
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && e.target.value) {
                                  handleUpdateItemStatus(
                                    item.id,
                                    "confirmed",
                                    e.target.value,
                                  );
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              color="success"
                              onClick={() => {
                                const input = document.querySelector(
                                  `input[placeholder="Confirmation number"]`,
                                );
                                if (input && input.value) {
                                  handleUpdateItemStatus(
                                    item.id,
                                    "confirmed",
                                    input.value,
                                  );
                                }
                              }}
                            >
                              Confirm
                            </Button>
                          </div>
                        )}

                        {item.status === "confirmed" &&
                          item.confirmation_number && (
                            <div className="text-success-600 dark:text-success-400 mt-2 text-sm">
                              Confirmation: {item.confirmation_number}
                            </div>
                          )}

                        {item.notes && (
                          <div className="mt-2 text-xs text-gray-500 italic dark:text-gray-400">
                            {item.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Upload Documents
                </h2>
                <Upload
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleUploadDocument}
                >
                  {({ onClick }) => (
                    <div
                      onClick={onClick}
                      className="hover:border-primary-400 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors dark:border-gray-600"
                    >
                      <DocumentArrowUpIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Click to upload documents or drag and drop
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                        PDF, DOC, DOCX, JPG, PNG files
                      </p>
                    </div>
                  )}
                </Upload>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Uploaded Documents
                </h3>
                <div className="space-y-3">
                  {booking.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {doc.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Uploaded on{" "}
                            {new Date(doc.uploaded_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="soft" color="info">
                          Download
                        </Button>
                        <Button size="sm" variant="soft" color="error">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Invoicing Tab */}
          {activeTab === "invoicing" && (
            <Card className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Invoices & Payments
                </h2>
                <Button color="primary">Generate Invoice</Button>
              </div>

              <div className="space-y-4">
                {booking.invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {invoice.invoice_number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Amount: ${invoice.amount.toLocaleString()} • Due:{" "}
                        {new Date(invoice.due_date).toLocaleDateString()}
                        {invoice.paid_date && (
                          <>
                            {" "}
                            • Paid:{" "}
                            {new Date(invoice.paid_date).toLocaleDateString()}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        color={
                          invoice.status === "paid" ? "success" : "warning"
                        }
                        className="capitalize"
                      >
                        {invoice.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="soft" color="info">
                          View
                        </Button>
                        {invoice.status === "pending" && (
                          <Button size="sm" color="success">
                            Mark Paid
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </Page>
  );
}

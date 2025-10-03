// Import Dependencies
import { useState } from "react";
import { Link } from "react-router";
import {
  EyeIcon,
  PencilIcon,
  DocumentArrowDownIcon,
  PaperAirplaneIcon,
  CalendarIcon,
  UserIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import {
  Badge,
  Button,
  Card,
  Table,
  THead,
  TBody,
  Th,
  Tr,
  Td,
} from "components/ui";
import { getStatusBadgeColor } from "features/Quotations/lib/utils";
import { getPriorityBadgeColor } from "features/Leads/libs/utils";

// ----------------------------------------------------------------------

export default function QuotationsTable({
  quotations,
  title,
  emptyStateIcon,
  emptyStateTitle,
  emptyStateDescription,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sort function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const sortedQuotations = [...quotations].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days until expiry
  const getDaysUntilExpiry = (validUntil) => {
    const today = new Date();
    const expiryDate = new Date(validUntil);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle actions
  const handleDownloadPDF = (id) => {
    console.log("Downloading PDF for quotation:", id);
  };

  const handleSendReminder = (id) => {
    console.log("Sending reminder for quotation:", id);
  };

  if (quotations.length === 0) {
    return (
      <Card className="p-12 text-center">
        {emptyStateIcon}
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {emptyStateTitle}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {emptyStateDescription}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentArrowDownIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total {title}
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {quotations.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Value
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                $
                {quotations
                  .reduce((sum, q) => sum + q.totalCost, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                High Priority
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {quotations.filter((q) => q.priority === "high").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Avg. Days
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {quotations.length > 0
                  ? Math.round(
                      quotations.reduce((sum, q) => sum + q.days, 0) /
                        quotations.length,
                    )
                  : 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quotations Table */}
      <Card className="">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {quotations.length}{" "}
            {quotations.length === 1 ? "quotation" : "quotations"} found
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table hoverable className="min-w-full">
            <THead className="text-left">
              <Tr>
                <Th>
                  <button onClick={() => handleSort("quoteId")}>
                    <span>Quote ID</span>
                  </button>
                </Th>
                <Th>Customer Details</Th>
                <Th>Destination</Th>
                <Th>
                  <button onClick={() => handleSort("totalCost")}>
                    <span>Total Cost</span>
                  </button>
                </Th>
                <Th>Duration</Th>
                <Th>Status</Th>
                <Th>Priority</Th>
                <Th>Valid Until</Th>
                <Th>Actions</Th>
              </Tr>
            </THead>
            <TBody>
              {sortedQuotations.map((quotation) => {
                const daysUntilExpiry = getDaysUntilExpiry(
                  quotation.validUntil,
                );
                const isExpiringSoon =
                  daysUntilExpiry <= 7 && daysUntilExpiry >= 0;
                const isExpired = daysUntilExpiry < 0;

                return (
                  <Tr
                    key={quotation.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Td>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {quotation.quoteId}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {quotation.title}
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {quotation.customerName}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {quotation.customerEmail}
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <span className="text-gray-900 dark:text-white">
                        {quotation.destination}
                      </span>
                    </Td>
                    <Td>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${quotation.totalCost.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {quotation.currency}
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-white">
                          {quotation.days} days
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {quotation.nights} nights
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <Badge
                        color={getStatusBadgeColor(quotation.status)}
                        variant="soft"
                        className="capitalize"
                      >
                        {quotation.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge
                        color={getPriorityBadgeColor(quotation.priority)}
                        variant="soft"
                        className="capitalize"
                      >
                        {quotation.priority}
                      </Badge>
                    </Td>
                    <Td>
                      <div className="flex flex-col">
                        <span
                          className={`text-sm ${
                            isExpired
                              ? "font-medium text-red-600 dark:text-red-400"
                              : isExpiringSoon
                                ? "font-medium text-orange-600 dark:text-orange-400"
                                : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {formatDate(quotation.validUntil)}
                        </span>
                        {isExpired ? (
                          <span className="text-xs text-red-500">Expired</span>
                        ) : isExpiringSoon ? (
                          <span className="text-xs text-orange-500">
                            {daysUntilExpiry} days left
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {daysUntilExpiry} days left
                          </span>
                        )}
                      </div>
                    </Td>
                    <Td>
                      <div className="flex items-center space-x-2">
                        <Button
                          component={Link}
                          to={`/quotations/${quotation.id}`}
                          variant="soft"
                          color="info"
                          size="sm"
                          isIcon
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>

                        <Button
                          component={Link}
                          to={`/quotations/edit/${quotation.id}`}
                          variant="soft"
                          color="secondary"
                          size="sm"
                          isIcon
                          title="Edit Quotation"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>

                        <Button
                          onClick={() => handleDownloadPDF(quotation.id)}
                          variant="soft"
                          color="primary"
                          size="sm"
                          isIcon
                          title="Download PDF"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                        </Button>

                        {quotation.status === "pending" && (
                          <Button
                            onClick={() => handleSendReminder(quotation.id)}
                            variant="soft"
                            color="warning"
                            size="sm"
                            isIcon
                            title="Send Reminder"
                          >
                            <PaperAirplaneIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </TBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

// Import Dependencies
import { Link } from "react-router";
import { PlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card } from "components/ui";
import { Page } from "components/shared/Page";

// ----------------------------------------------------------------------

// Mock quotations data
const mockQuotations = [
  {
    id: 1,
    quoteId: "QT-240001-ABC",
    title: "Paris Romantic Getaway",
    customerName: "John Smith",
    destination: "Paris, France",
    totalCost: 3500,
    currency: "USD",
    status: "draft",
    createdAt: "2024-10-01",
    validUntil: "2024-10-31",
  },
  {
    id: 2,
    quoteId: "QT-240002-DEF",
    title: "Tokyo Adventure Tour",
    customerName: "Sarah Johnson",
    destination: "Tokyo, Japan",
    totalCost: 4200,
    currency: "USD",
    status: "sent",
    createdAt: "2024-09-28",
    validUntil: "2024-10-28",
  },
];

// ----------------------------------------------------------------------

export default function QuotationsIndex() {
  return (
    <Page title="Quotations - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Quotations Management
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Manage travel quotations and proposals
              </p>
            </div>
            <Button
              component={Link}
              to="/quotations/create"
              color="primary"
              className="shrink-0"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Create Quotation
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Quotations
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {mockQuotations.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Draft
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {mockQuotations.filter((q) => q.status === "draft").length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Sent
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {mockQuotations.filter((q) => q.status === "sent").length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Value
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    $
                    {mockQuotations
                      .reduce((sum, q) => sum + q.totalCost, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Quotations List */}
          <Card className="overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Quotations
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Quote ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Total Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Valid Until
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {mockQuotations.map((quotation) => (
                    <tr
                      key={quotation.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
                        {quotation.quoteId}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                        {quotation.title}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                        {quotation.customerName}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                        {quotation.destination}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                        {quotation.currency}{" "}
                        {quotation.totalCost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            quotation.status === "draft"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                              : quotation.status === "sent"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          }`}
                        >
                          {quotation.status.charAt(0).toUpperCase() +
                            quotation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                        {new Date(quotation.validUntil).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Button
                            component={Link}
                            to={`/quotations/${quotation.id}`}
                            variant="soft"
                            color="primary"
                            size="sm"
                          >
                            View
                          </Button>
                          <Button
                            component={Link}
                            to={`/quotations/edit/${quotation.id}`}
                            variant="soft"
                            color="warning"
                            size="sm"
                          >
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Empty State */}
          {mockQuotations.length === 0 && (
            <Card className="p-12 text-center">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No quotations found
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Get started by creating your first quotation
              </p>
              <Button
                component={Link}
                to="/quotations/create"
                color="primary"
                className="mt-4"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Create Quotation
              </Button>
            </Card>
          )}
        </div>
      </div>
    </Page>
  );
}

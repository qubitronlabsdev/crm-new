// Import Dependencies
import { Link } from "react-router";
import {
  PlusIcon,
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
// Local Imports
import { Button, Card, Badge } from "components/ui";
import { Page } from "components/shared/Page";
import { TableTabs } from "components/ui/Table/TableTabs";
import tabs from "features/Quotations/consts/tabs";
import { mockQuotationsData } from "features/Quotations/data/mockQuotations";
import { getStatusBadgeColor } from "features/Quotations/lib/utils";


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

          {/* Lead Navigation Tabs */}
          <TableTabs tabs={tabs} />

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
                  {mockQuotationsData.map((quotation) => (
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
                        <Badge
                          color={getStatusBadgeColor(quotation.status)}
                          variant="soft"
                          className="capitalize"
                        >
                          {quotation.status}
                        </Badge>
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
                            isIcon
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            component={Link}
                            to={`/quotations/edit/${quotation.id}`}
                            variant="soft"
                            color="warning"
                            size="sm"
                            isIcon
                          >
                            <PencilIcon className="h-4 w-4" />
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
          {mockQuotationsData.length === 0 && (
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

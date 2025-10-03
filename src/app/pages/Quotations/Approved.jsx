// Import Dependencies
import { Link } from "react-router";
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { title: "Dashboard", path: "/" },
  { title: "Quotations", path: "/quotations" },
  { title: "Approved Quotations" },
];

// ----------------------------------------------------------------------

export default function ApprovedQuotations() {
  return (
    <Page title="Approved Quotations - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Approved Quotations
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Quotations approved by customers
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

          {/* Empty State */}
          <Card className="p-12 text-center">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No approved quotations
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Approved quotations will appear here
            </p>
          </Card>
        </div>
      </div>
    </Page>
  );
}

// Import Dependencies
import { Link } from "react-router";
import { ClockIcon, PlusIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import QuotationsTable from "components/shared/QuotationsTable";
import { getPendingQuotations } from "features/Quotations/data/mockQuotations";
import { TableTabs } from "components/ui/Table/TableTabs";
import tabs from "features/Quotations/consts/tabs";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { title: "Dashboard", path: "/" },
  { title: "Quotations", path: "/quotations" },
  { title: "Pending Quotations" },
];

// ----------------------------------------------------------------------

export default function PendingQuotations() {
  const pendingQuotations = getPendingQuotations();

  return (
    <Page title="Pending Quotations - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Pending Quotations
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Quotations awaiting customer response - clients taking time to
                approve
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

          <TableTabs tabs={tabs} />

          {/* Quotations Table */}
          <QuotationsTable
            quotations={pendingQuotations}
            title="Pending Quotations"
            emptyStateIcon={
              <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
            }
            emptyStateTitle="No pending quotations"
            emptyStateDescription="Quotations sent to customers that are awaiting response will appear here"
          />
        </div>
      </div>
    </Page>
  );
}

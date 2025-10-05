// Import Dependencies
import { useSearchParams } from "react-router";

// Local Imports
import { Page } from "components/shared/Page";
import { QuotationStepper } from "features/Quotations/components/QuotationStepper";

// ----------------------------------------------------------------------

export default function CreateQuotation() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get("leadId");

  return (
    <Page title="Create Quotation - Travel CRM">
      <QuotationStepper leadId={leadId} />
    </Page>
  );
}

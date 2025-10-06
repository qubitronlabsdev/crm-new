// Import Dependencies
import { useParams } from "react-router";

// Local Imports
import { Page } from "components/shared/Page";
import { QuotationStepper } from "features/Quotations/components/QuotationStepper";

// ----------------------------------------------------------------------

export default function EditQuotation() {
  const { id } = useParams();

  return (
    <Page title={`Edit Quotation #${id} - Travel CRM`}>
      <QuotationStepper quotationId={id} isEditMode={true} />
    </Page>
  );
}

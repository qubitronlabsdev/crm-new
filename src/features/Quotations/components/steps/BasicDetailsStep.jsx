// Import Dependencies
import { useEffect } from "react";

// Local Imports
import { Card, Input, Textarea, Button } from "components/ui";
import { useQuotationStore } from "../../store/useQuotationStore";

// ----------------------------------------------------------------------

export function BasicDetailsStep() {
  const { basicDetails, setBasicDetails, generateQuoteId } =
    useQuotationStore();

  // Generate quote ID on component mount if not already generated
  useEffect(() => {
    if (!basicDetails.quoteId) {
      generateQuoteId();
    }
  }, [basicDetails.quoteId, generateQuoteId]);

  const handleInputChange = (field, value) => {
    setBasicDetails({ [field]: value });
  };

  // Calculate default valid until date (30 days from now)
  const getDefaultValidUntil = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  // Set default valid until if not set
  useEffect(() => {
    if (!basicDetails.validUntil) {
      setBasicDetails({ validUntil: getDefaultValidUntil() });
    }
  }, [basicDetails.validUntil, setBasicDetails]);

  return (
    <div className="space-y-6">
      {/* Quote ID & Version */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Quote Identification
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Quote ID
            </label>
            <div className="flex items-center gap-2">
              <Input
                value={basicDetails.quoteId}
                readOnly
                className="flex-1 bg-gray-50 dark:bg-gray-800"
              />
              <Button
                onClick={generateQuoteId}
                variant="outlined"
                color="neutral"
                size="sm"
              >
                Regenerate
              </Button>
            </div>
          </div>
          <Input
            label="Version"
            value={basicDetails.version}
            onChange={(e) => handleInputChange("version", e.target.value)}
            placeholder="1.0"
          />
        </div>
      </Card>

      {/* Customer Information */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Customer Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Customer Name *"
            value={basicDetails.customerName}
            onChange={(e) => handleInputChange("customerName", e.target.value)}
            placeholder="Enter full name"
            required
          />
          <Input
            label="Email Address *"
            type="email"
            value={basicDetails.customerEmail}
            onChange={(e) => handleInputChange("customerEmail", e.target.value)}
            placeholder="customer@example.com"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={basicDetails.customerPhone}
            onChange={(e) => handleInputChange("customerPhone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
          <Input
            label="Valid Until *"
            type="date"
            value={basicDetails.validUntil}
            onChange={(e) => handleInputChange("validUntil", e.target.value)}
            required
          />
        </div>
      </Card>

      {/* Quotation Details */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Quotation Details
        </h3>
        <div className="space-y-4">
          <Input
            label="Quotation Title *"
            value={basicDetails.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="e.g., Paris Romantic Getaway - 7 Days"
            required
          />
          <Textarea
            label="Description"
            value={basicDetails.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Brief overview of the travel package and what makes it special"
            rows={4}
          />
        </div>
      </Card>

      {/* Customer Requirements Summary */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Quick Summary
        </h3>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Quote ID:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {basicDetails.quoteId || "Generating..."}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Customer:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {basicDetails.customerName || "Not specified"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Valid Until:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {basicDetails.validUntil
                  ? new Date(basicDetails.validUntil).toLocaleDateString()
                  : "Not set"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Version:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {basicDetails.version}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

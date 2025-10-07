// Import Dependencies
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  BuildingOfficeIcon,
  TruckIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import {
  Card,
  Input,
  Select,
  Button,
  Textarea,
  Checkbox,
  Badge,
  Box,
} from "components/ui";
import { ItineraryBuilder } from "../ItineraryBuilder";

// ----------------------------------------------------------------------

// Hotel Details Component
function HotelDetails({ quotationData, setQuotationData, hotels, setHotels }) {
  const totalNights = quotationData.nights || 0;
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const assignedNights = hotels.flatMap((h) => h.nights || []);
  const allNights = Array.from({ length: totalNights }, (_, i) =>
    (i + 1).toString(),
  );

  // Function to convert number to ordinal (1st, 2nd, 3rd, etc.)
  const getOrdinal = (num) => {
    const number = parseInt(num);
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = number % 100;
    return (
      number +
      (suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0])
    );
  };

  const addHotel = () => {
    if (assignedNights.length >= totalNights) return;
    setHotels([
      ...hotels,
      {
        nights: [],
        hotelName: "",
        city: "",
        category: "",
        roomType: "",
        comment: "",
      },
    ]);
    setOpenDropdowns([...openDropdowns, false]);
  };

  const removeHotel = (index) => {
    if (hotels.length > 1) {
      const updatedHotels = [...hotels];
      updatedHotels.splice(index, 1);
      setHotels(updatedHotels);

      const updatedDropdowns = [...openDropdowns];
      updatedDropdowns.splice(index, 1);
      setOpenDropdowns(updatedDropdowns);
    }
  };

  const updateHotel = (index, field, value) => {
    const updatedHotels = [...hotels];
    updatedHotels[index][field] = value;
    setHotels(updatedHotels);
  };

  const toggleNight = (hotelIndex, night) => {
    const updatedHotels = [...hotels];
    const hotel = updatedHotels[hotelIndex];

    if (!hotel.nights) hotel.nights = [];

    if (hotel.nights.includes(night)) {
      hotel.nights = hotel.nights.filter((n) => n !== night);
    } else {
      hotel.nights.push(night);
    }

    setHotels(updatedHotels);
  };

  const getAvailableNightsForHotel = (index) => {
    const usedByOthers = hotels
      .filter((_, i) => i !== index)
      .flatMap((h) => h.nights || []);
    return allNights.filter((n) => !usedByOthers.includes(n));
  };

  const toggleDropdown = (index) => {
    const updated = [...openDropdowns];
    updated[index] = !updated[index];
    setOpenDropdowns(updated);
  };

  // Function to format selected nights display
  const formatSelectedNights = (nights) => {
    if (!nights || nights.length === 0) return "Select nights";
    const ordinalNights = nights.map((night) => getOrdinal(night));
    return `Night(s): ${ordinalNights.join(", ")}`;
  };

  return (
    <Card className="mb-6 p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="mb-2 sm:mb-0">
          <h4 className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-white">
            <BuildingOfficeIcon className="text-primary-500 h-5 w-5" />
            Hotel Details
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Configure accommodation preferences for each night
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          {/* Add Another Hotel button in header */}
          {!quotationData.hotelsNotIncluded && (
            <Button
              onClick={addHotel}
              disabled={assignedNights.length >= totalNights}
              color="primary"
              size="sm"
              className="flex items-center gap-2"
            >
              <PlusIcon className="h-4 w-4" />
              Add Another Hotel
            </Button>
          )}
          <Checkbox
            label="Hotels not included"
            checked={quotationData.hotelsNotIncluded}
            onChange={(e) =>
              setQuotationData({
                ...quotationData,
                hotelsNotIncluded: e.target.checked,
              })
            }
          />
        </div>
      </div>

      {/* Hotels */}
      {!quotationData.hotelsNotIncluded &&
        hotels.map((hotel, index) => {
          const availableNights = getAvailableNightsForHotel(index);

          return (
            <div
              key={index}
              className="mb-6 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700/50 dark:bg-gray-900"
            >
              {/* Inputs grid (including nights dropdown) */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                {/* Nights Selector */}
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nights
                  </label>
                  <div
                    onClick={() => toggleDropdown(index)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 hover:border-blue-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-blue-400"
                  >
                    <span>{formatSelectedNights(hotel.nights)}</span>
                    {openDropdowns[index] ? (
                      <FaChevronUp className="text-gray-400" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </div>

                  {openDropdowns[index] && (
                    <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-700">
                      {availableNights.map((night) => (
                        <label
                          key={night}
                          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                        >
                          <input
                            type="checkbox"
                            checked={hotel.nights?.includes(night)}
                            onChange={() => toggleNight(index, night)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900"
                          />
                          {getOrdinal(night)}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hotel Name */}
                <div>
                  <Input
                    label="Hotel Name"
                    placeholder="e.g. Taj"
                    value={hotel.hotelName}
                    onChange={(e) =>
                      updateHotel(index, "hotelName", e.target.value)
                    }
                  />
                </div>

                {/* City */}
                <div>
                  <Input
                    label="City"
                    placeholder="e.g. Noida"
                    value={hotel.city}
                    onChange={(e) => updateHotel(index, "city", e.target.value)}
                  />
                </div>

                {/* Category */}
                <div>
                  <Select
                    label="Category"
                    value={hotel.category}
                    onChange={(e) =>
                      updateHotel(index, "category", e.target.value)
                    }
                    data={[
                      { value: "", label: "Select Category" },
                      { value: "3-star", label: "3 Star" },
                      { value: "4-star", label: "4 Star" },
                      { value: "5-star", label: "5 Star" },
                    ]}
                  />
                </div>

                {/* Room Type */}
                <div>
                  <Select
                    label="Room Type (optional)"
                    value={hotel.roomType}
                    onChange={(e) =>
                      updateHotel(index, "roomType", e.target.value)
                    }
                    data={[
                      { value: "", label: "Select" },
                      { value: "single", label: "Single" },
                      { value: "double", label: "Double" },
                      { value: "suite", label: "Suite" },
                    ]}
                  />
                </div>
              </div>

              {/* Comment box */}
              <div>
                <Textarea
                  label="Comments (Optional)"
                  placeholder="Any Additional Information..."
                  value={hotel.comment}
                  onChange={(e) =>
                    updateHotel(index, "comment", e.target.value)
                  }
                  rows={3}
                />
              </div>

              {/* Remove button */}
              {hotels.length > 1 && (
                <Button
                  onClick={() => removeHotel(index)}
                  color="primary"
                  variant="soft"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <TrashIcon className="h-4 w-4" />
                  Remove Hotel
                </Button>
              )}
            </div>
          );
        })}
    </Card>
  );
}

// Transportation Details Component
function TransportationDetails({ transportationData, setTransportationData }) {
  const updateTransportationField = (field, value) => {
    console.log(`Updating transportation field: ${field} = ${value}`);
    const newData = {
      ...transportationData,
      [field]: value,
    };
    console.log("New transportation data:", newData);
    setTransportationData(newData);
  };

  const transportationTypes = [
    {
      key: "flight",
      label: "Flight Details",
      placeholder: "Enter flight details, timings, and arrangements...",
    },
    {
      key: "cab",
      label: "Cab Details",
      placeholder: "Enter cab/taxi details, routes, and arrangements...",
    },
    {
      key: "bus",
      label: "Bus Details",
      placeholder: "Enter bus details, routes, and arrangements...",
    },
    {
      key: "train",
      label: "Train Details",
      placeholder: "Enter train details, routes, and arrangements...",
    },
  ];

  return (
    <Card className="mb-6 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h4 className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-white">
            <TruckIcon className="text-primary-500 h-5 w-5" />
            Transportation Details
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Configure transportation arrangements for your travel package
          </p>
        </div>
      </div>

      {/* Debug transportation data */}
      {/* <div className="mb-4 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Transportation Debug: {JSON.stringify(transportationData, null, 2)}
        </p>
      </div> */}

      {/* Transportation Types */}
      <div className="space-y-6">
        {transportationTypes.map(({ key, label, placeholder }) => (
          <div
            key={key}
            className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
          >
            {/* Transportation Type Header */}
            <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <h5 className="text-md mb-2 font-medium text-gray-900 sm:mb-0 dark:text-white">
                {label}
              </h5>
              <Checkbox
                label="Not included"
                checked={transportationData[`${key}NotIncluded`] || false}
                onChange={(e) => {
                  console.log(
                    `Checkbox ${key}NotIncluded changed to:`,
                    e.target.checked,
                  );
                  updateTransportationField(
                    `${key}NotIncluded`,
                    e.target.checked,
                  );
                }}
              />
            </div>

            {/* Transportation Description Field - only show if not excluded */}
            {!transportationData[`${key}NotIncluded`] && (
              <div>
                <Textarea
                  label="Description"
                  placeholder={placeholder}
                  value={transportationData[key] || ""}
                  onChange={(e) => {
                    // console.log(`Textarea ${key} changed to:`, e.target.value);
                    updateTransportationField(key, e.target.value);
                  }}
                  rows={3}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

// Main Component
export function HotelsTransportationStep({ watch, setValue, errors }) {
  // Watch form values directly instead of using local state
  const watchedHotels = watch("hotels") || [
    {
      nights: [],
      hotelName: "",
      city: "",
      category: "",
      roomType: "",
      comment: "",
    },
  ];

  const watchedTransportation = watch("transportation") || {
    flight: "",
    flightNotIncluded: false,
    cab: "",
    cabNotIncluded: false,
    bus: "",
    busNotIncluded: false,
    train: "",
    trainNotIncluded: false,
  };

  const watchedHotelsNotIncluded = watch("hotelsNotIncluded") || false;

  // Watch values for summary
  const days = watch("days") || 1;
  const nights = watch("nights") || 1;

  // Initialize form values if not already set
  useEffect(() => {
    const hotels = watch("hotels");
    const transportation = watch("transportation");
    const hotelsNotIncluded = watch("hotelsNotIncluded");

    // Only set values if they don't exist at all
    if (!hotels) {
      setValue("hotels", [
        {
          nights: [],
          hotelName: "",
          city: "",
          category: "",
          roomType: "",
          comment: "",
        },
      ]);
    }

    if (!transportation) {
      setValue("transportation", {
        flight: "",
        flightNotIncluded: false,
        cab: "",
        cabNotIncluded: false,
        bus: "",
        busNotIncluded: false,
        train: "",
        trainNotIncluded: false,
      });
    }

    if (hotelsNotIncluded === undefined) {
      setValue("hotelsNotIncluded", false);
    }
  }, [setValue, watch]);

  // Helper functions to update form values
  const updateHotels = (newHotels) => {
    setValue("hotels", newHotels);
  };

  const updateTransportation = (newTransportation) => {
    setValue("transportation", newTransportation);
  };

  const updateHotelsNotIncluded = (value) => {
    setValue("hotelsNotIncluded", value);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Step 2: Hotels & Transportation
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Configure hotel accommodations and transportation details for your
            travel package.
          </p>
        </div>

        {/* Display validation errors */}
        {errors && Object.keys(errors).length > 0 && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h4 className="text-sm font-medium text-red-800 dark:text-red-300">
              Please check the following fields:
            </h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700 dark:text-red-400">
              {errors.hotelsNotIncluded && (
                <li>{errors.hotelsNotIncluded.message}</li>
              )}
              {errors.hotels && typeof errors.hotels.message === "string" && (
                <li>{errors.hotels.message}</li>
              )}
              {errors.hotels &&
                Array.isArray(errors.hotels) &&
                errors.hotels.map(
                  (hotelError, index) =>
                    hotelError && (
                      <div key={index}>
                        {hotelError.nights && (
                          <li>
                            Hotel {index + 1}: {hotelError.nights.message}
                          </li>
                        )}
                        {hotelError.hotelName && (
                          <li>
                            Hotel {index + 1}: {hotelError.hotelName.message}
                          </li>
                        )}
                        {hotelError.city && (
                          <li>
                            Hotel {index + 1}: {hotelError.city.message}
                          </li>
                        )}
                        {hotelError.category && (
                          <li>
                            Hotel {index + 1}: {hotelError.category.message}
                          </li>
                        )}
                      </div>
                    ),
                )}
              {errors.transportation && (
                <li>Transportation: {errors.transportation.message}</li>
              )}
            </ul>
          </div>
        )}
      </Card>

      {/* Hotel Details Section */}
      <HotelDetails
        quotationData={{
          nights: nights,
          hotelsNotIncluded: watchedHotelsNotIncluded,
        }}
        setQuotationData={(data) => {
          if (data.hotelsNotIncluded !== undefined) {
            updateHotelsNotIncluded(data.hotelsNotIncluded);
          }
        }}
        hotels={watchedHotels}
        setHotels={updateHotels}
      />

      {/* Transportation Details Section */}
      <TransportationDetails
        transportationData={watchedTransportation}
        setTransportationData={updateTransportation}
      />

      {/* Itinerary Builder */}
      <Card className="p-6">
        <h4 className="text-md mb-4 font-semibold text-gray-900 dark:text-white">
          Day-wise Itinerary Builder
        </h4>
        <ItineraryBuilder numberOfDays={watch("days")} />
      </Card>

      {/* Summary */}
      <Card className="p-6">
        <div className="mb-4 border-b border-gray-200 pb-3 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Hotels & Transportation Summary
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Review your selections before proceeding to the next step
          </p>
        </div>

        {/* Debug information - remove in production
        <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h5 className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Debug Info:
          </h5>
          <pre className="mt-2 text-xs text-blue-700 dark:text-blue-400">
            hotelsNotIncluded: {JSON.stringify(watchedHotelsNotIncluded)}
            {"\n"}hotels: {JSON.stringify(watchedHotels, null, 2)}
            {"\n"}transportation:{" "}
            {JSON.stringify(watchedTransportation, null, 2)}
            {"\n"}errors: {JSON.stringify(errors, null, 2)}
          </pre>
          <button
            type="button"
            onClick={() => {
              console.log("=== FORM DEBUG INFO ===");
              console.log("hotelsNotIncluded:", watchedHotelsNotIncluded);
              console.log("hotels:", watchedHotels);
              console.log("transportation:", watchedTransportation);
              console.log("errors:", errors);
              console.log("All form values:", watch());
            }}
            className="mt-2 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            Log Debug Info to Console
          </button>
        </div> */}

        <Box className="rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-900">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Travel Duration */}
            <div className="space-y-3">
              <h5 className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                📅 Travel Duration
              </h5>
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Duration:
                  </span>
                  <Badge variant="soft" color="primary">
                    {days} days, {nights} nights
                  </Badge>
                </div>
              </div>
            </div>

            {/* Hotel Information - Only show if hotels are included */}
            {!watchedHotelsNotIncluded && (
              <div className="space-y-3">
                <h5 className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  🏨 Hotel Information
                </h5>
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Hotels:
                    </span>
                    <Badge variant="soft" color="success">
                      {`${watchedHotels.length} hotel(s)`}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Transportation Information - Only show included transportation types */}
            {((!watchedTransportation.flightNotIncluded &&
              watchedTransportation.flight) ||
              (!watchedTransportation.cabNotIncluded &&
                watchedTransportation.cab) ||
              (!watchedTransportation.busNotIncluded &&
                watchedTransportation.bus) ||
              (!watchedTransportation.trainNotIncluded &&
                watchedTransportation.train)) && (
              <div className="md:col-span-2">
                <h5 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  🚗 Transportation Information
                </h5>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {/* Flight - Only show if not excluded and has content */}
                  {!watchedTransportation.flightNotIncluded &&
                    watchedTransportation.flight && (
                      <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Flight:
                          </span>
                          <Badge variant="soft" color="success">
                            Included
                          </Badge>
                        </div>
                      </div>
                    )}

                  {/* Cab - Only show if not excluded and has content */}
                  {!watchedTransportation.cabNotIncluded &&
                    watchedTransportation.cab && (
                      <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Cab:
                          </span>
                          <Badge variant="soft" color="success">
                            Included
                          </Badge>
                        </div>
                      </div>
                    )}

                  {/* Bus - Only show if not excluded and has content */}
                  {!watchedTransportation.busNotIncluded &&
                    watchedTransportation.bus && (
                      <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Bus:
                          </span>
                          <Badge variant="soft" color="success">
                            Included
                          </Badge>
                        </div>
                      </div>
                    )}

                  {/* Train - Only show if not excluded and has content */}
                  {!watchedTransportation.trainNotIncluded &&
                    watchedTransportation.train && (
                      <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Train:
                          </span>
                          <Badge variant="soft" color="success">
                            Included
                          </Badge>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        </Box>
      </Card>
    </div>
  );
}

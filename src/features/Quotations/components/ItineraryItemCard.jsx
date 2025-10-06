// Import Dependencies
import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  // ClockIcon,
  // MapPinIcon,
  Bars3Icon,
  BuildingOfficeIcon,
  PaperAirplaneIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

// Local Imports
import {
  Button,
  Card,
  // Badge
} from "components/ui";

// ----------------------------------------------------------------------

// const getItemTypeColor = (type) => {
//   switch (type) {
//     case "hotel":
//       return "info";
//     case "flight":
//       return "primary";
//     case "activity":
//       return "success";
//     case "transport":
//       return "warning";
//     case "meal":
//       return "secondary";
//     default:
//       return "neutral";
//   }
// };

const getItemTypeIcon = (type) => {
  const iconProps = { className: "h-5 w-5" };

  switch (type) {
    case "hotel":
      return <BuildingOfficeIcon {...iconProps} />;
    case "flight":
      return <PaperAirplaneIcon {...iconProps} />;
    case "activity":
      return <ChartBarIcon {...iconProps} />;
    case "transport":
      return <TruckIcon {...iconProps} />;
    case "meal":
      return <SparklesIcon {...iconProps} />;
    default:
      return <ClipboardDocumentListIcon {...iconProps} />;
  }
};

// ----------------------------------------------------------------------

export function ItineraryItemCard({
  item,
  onEdit,
  onDelete,
  isDragging = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={clsx(
        "p-4 transition-all duration-200",
        isDragging && "scale-105 rotate-2 opacity-50",
        isHovered && !isDragging && "shadow-md",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        {/* Visual Handle */}
        <div className="flex-shrink-0 rounded p-1">
          <Bars3Icon className="h-4 w-4 text-gray-400" />
        </div>

        {/* Item Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <div className="text-gray-600 dark:text-gray-400">
                {getItemTypeIcon(item.type)}
              </div>
              <div className="min-w-0">
                <h4 className="truncate font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                {/* <div className="mt-1 flex items-center gap-2">
                  <Badge
                    color={getItemTypeColor(item.type)}
                    variant="soft"
                    className="text-xs capitalize"
                  >
                    {item.type}
                  </Badge>
                  {item.time && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <ClockIcon className="h-3 w-3" />
                      {item.time}
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          )}

          {/* Location */}
          {/* {item.location && (
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <MapPinIcon className="h-3 w-3" />
              {item.location}
            </div>
          )} */}

          {/* Notes */}
          {/* {item.notes && (
            <div className="mt-2 text-xs text-gray-500 italic dark:text-gray-400">
              {item.notes}
            </div>
          )} */}
        </div>

        {/* Actions */}
        <div
          className={clsx(
            "flex items-center gap-1 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <Button
            onClick={() => onEdit(item)}
            variant="soft"
            color="warning"
            size="sm"
            isIcon
          >
            <PencilIcon className="h-3 w-3" />
          </Button>
          <Button
            onClick={() => onDelete(item.id)}
            variant="soft"
            color="error"
            size="sm"
            isIcon
          >
            <TrashIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

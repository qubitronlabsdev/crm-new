const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "fresh":
      return "info";
    case "quoting":
      return "primary";
    case "contacting":
      return "info";
    case "customizing":
      return "warning";
    case "finalizing":
      return "primary";
    case "converted":
      return "success";
    case "trip_completed":
      return "success";
    case "postponed":
      return "warning";
    case "lost":
      return "error";
    default:
      return "neutral";
  }
};

// Priority badge colors
const getPriorityBadgeColor = (priority) => {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "neutral";
  }
};

export { getStatusColor, getPriorityBadgeColor };

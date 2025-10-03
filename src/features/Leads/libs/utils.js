const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "fresh":
      return "info";
    case "converted":
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

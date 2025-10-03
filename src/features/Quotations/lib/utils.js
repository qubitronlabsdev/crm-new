// Status badge colors
const getStatusBadgeColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "approved":
      return "success";
    case "rejected":
      return "error";
    case "draft":
      return "neutral";
    default:
      return "neutral";
  }
};
export { getStatusBadgeColor };

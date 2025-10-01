// Import Dependencies
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

// Local Imports
import { Button } from "components/ui";
import { Table, THead, TBody, Tr, Th, Td } from "components/ui/Table";

// ----------------------------------------------------------------------

export function DataTable({
  data = [],
  columns = [],
  pagination = null,
  className,
  // New props for custom filtering and sorting
  filters = {},
  sorting = null,
  onPaginationChange,
  loading = false,
}) {
  const [internalSorting, setInternalSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Filter data based on custom filters prop
  const filteredData = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) {
      return data;
    }

    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === "") return true;

        // Handle different filter types
        switch (key) {
          case "lead_source":
            return item.lead_source === value || item.source === value;
          case "agent_assigned":
            return item.agent_assigned === value;
          case "destination":
            return item.destination
              ?.toLowerCase()
              .includes(value.toLowerCase());
          default:
            return item[key] === value;
        }
      });
    });
  }, [data, filters]);

  // Sort data based on custom sorting prop
  const sortedData = useMemo(() => {
    if (!sorting || !sorting.field) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const { field, order } = sorting;
      let aValue = a[field];
      let bValue = b[field];

      // Handle different data types
      if (field.includes("date") || field.includes("_at")) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (field === "priority") {
        // Define priority order for sorting
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[aValue] || 0;
        bValue = priorityOrder[bValue] || 0;
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return order === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sorting]);

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: internalSorting,
      globalFilter,
      pagination: {
        pageIndex: pagination?.pageIndex || 0,
        pageSize: pagination?.pageSize || 10,
      },
    },
    onSortingChange: setInternalSorting,
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: !!onPaginationChange, // Enable manual pagination if callback provided
    pageCount:
      pagination?.pageCount ||
      Math.ceil(sortedData.length / (pagination?.pageSize || 10)),
  });

  // Handle pagination change
  const handlePreviousPage = () => {
    if (onPaginationChange && pagination) {
      onPaginationChange({
        ...pagination,
        pageIndex: Math.max(0, pagination.pageIndex - 1),
      });
    } else {
      table.previousPage();
    }
  };

  const handleNextPage = () => {
    if (onPaginationChange && pagination) {
      onPaginationChange({
        ...pagination,
        pageIndex: pagination.pageIndex + 1,
      });
    } else {
      table.nextPage();
    }
  };

  // Calculate pagination info
  const paginationInfo = useMemo(() => {
    if (onPaginationChange && pagination) {
      // Manual pagination
      const start = pagination.pageIndex * pagination.pageSize + 1;
      const end = Math.min(
        (pagination.pageIndex + 1) * pagination.pageSize,
        sortedData.length,
      );
      return {
        start,
        end,
        total: sortedData.length,
        currentPage: pagination.pageIndex + 1,
        totalPages:
          pagination.pageCount ||
          Math.ceil(sortedData.length / pagination.pageSize),
        canPrevious: pagination.pageIndex > 0,
        canNext:
          pagination.pageIndex <
          (pagination.pageCount ||
            Math.ceil(sortedData.length / pagination.pageSize)) -
            1,
      };
    } else {
      // Table internal pagination
      const start =
        table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize +
        1;
      const end = Math.min(
        (table.getState().pagination.pageIndex + 1) *
          table.getState().pagination.pageSize,
        table.getFilteredRowModel().rows.length,
      );
      return {
        start,
        end,
        total: table.getFilteredRowModel().rows.length,
        currentPage: table.getState().pagination.pageIndex + 1,
        totalPages: table.getPageCount(),
        canPrevious: table.getCanPreviousPage(),
        canNext: table.getCanNextPage(),
      };
    }
  }, [table, pagination, onPaginationChange, sortedData.length]);

  return (
    <div className={clsx("space-y-4", className)}>
      {loading && (
        <div className="flex justify-center py-8">
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      )}

      {!loading && (
        <>
          <div className="overflow-x-auto">
            <Table hoverable className="w-full">
              <THead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th
                        key={header.id}
                        className={clsx(
                          "cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider uppercase select-none",
                          header.column.getCanSort() &&
                            "dark:hover:bg-dark-700 hover:bg-gray-50",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center gap-2">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          {header.column.getCanSort() && (
                            <div className="flex flex-col">
                              {header.column.getIsSorted() === "asc" ? (
                                <ChevronUpIcon className="h-4 w-4" />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <ChevronDownIcon className="h-4 w-4" />
                              ) : (
                                <div className="h-4 w-4 opacity-50">
                                  <ChevronUpIcon className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </THead>
              <TBody>
                {table.getRowModel().rows.map((row) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))}
                {table.getRowModel().rows.length === 0 && (
                  <Tr>
                    <Td
                      colSpan={columns.length}
                      className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      No data available
                    </Td>
                  </Tr>
                )}
              </TBody>
            </Table>
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Showing {paginationInfo.start} to {paginationInfo.end} of{" "}
                  {paginationInfo.total} results
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={!paginationInfo.canPrevious}
                  isIcon
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {paginationInfo.currentPage} of{" "}
                  {paginationInfo.totalPages}
                </span>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={!paginationInfo.canNext}
                  isIcon
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

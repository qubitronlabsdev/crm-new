// Import Dependencies
import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card, Input } from "components/ui";
import { useItineraryStore } from "../store/useItineraryStore";
import { ItineraryItemCard } from "./ItineraryItemCard";
import { ItineraryItemForm } from "./ItineraryItemForm";

// ----------------------------------------------------------------------

export function ItineraryBuilder() {
  const {
    days,
    addDay,
    updateDay,
    removeDay,
    addItem,
    updateItem,
    removeItem,
  } = useItineraryStore();

  const [isItemFormOpen, setIsItemFormOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editingDayId, setEditingDayId] = useState(null);
  const [dayTitle, setDayTitle] = useState("");

  const handleAddItem = (dayId) => {
    setSelectedDay(dayId);
    setEditingItem(null);
    setIsItemFormOpen(true);
  };

  const handleEditItem = (dayId, item) => {
    setSelectedDay(dayId);
    setEditingItem(item);
    setIsItemFormOpen(true);
  };

  const handleSubmitItem = async (data) => {
    try {
      if (editingItem) {
        updateItem(selectedDay, editingItem.id, data);
      } else {
        addItem(selectedDay, data);
      }
      setIsItemFormOpen(false);
      setSelectedDay(null);
      setEditingItem(null);
    } catch (error) {
      console.error("Error handling item submission:", error);
    }
  };

  const handleEditDayTitle = (dayId, currentTitle) => {
    setEditingDayId(dayId);
    setDayTitle(currentTitle);
  };

  const handleSaveDayTitle = (dayId) => {
    updateDay(dayId, { title: dayTitle });
    setEditingDayId(null);
    setDayTitle("");
  };

  const handleCancelEditTitle = () => {
    setEditingDayId(null);
    setDayTitle("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Itinerary Builder
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create a detailed day-by-day travel plan
          </p>
        </div>
        <Button onClick={addDay} color="primary">
          <PlusIcon className="mr-2 h-5 w-5" />
          Add Day
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Itinerary Days */}
        <div className="space-y-6 lg:col-span-4">
          {days.map((day) => (
            <Card key={day.id} className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CalendarDaysIcon className="text-primary-600 dark:text-primary-400 h-6 w-6" />
                  {editingDayId === day.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={dayTitle}
                        onChange={(e) => setDayTitle(e.target.value)}
                        className="text-lg font-semibold"
                        autoFocus
                      />
                      <Button
                        onClick={() => handleSaveDayTitle(day.id)}
                        color="success"
                        size="sm"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleCancelEditTitle}
                        color="neutral"
                        variant="soft"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {day.title}
                      </h3>
                      <Button
                        onClick={() => handleEditDayTitle(day.id, day.title)}
                        variant="soft"
                        color="neutral"
                        size="sm"
                        isIcon
                      >
                        <PencilIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleAddItem(day.id)}
                    color="success"
                    size="sm"
                  >
                    <PlusIcon className="mr-1 h-4 w-4" />
                    Add Item
                  </Button>
                  <Button
                    onClick={() => removeDay(day.id)}
                    color="error"
                    variant="soft"
                    size="sm"
                    isIcon
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Day Items */}
              <div className="min-h-[100px] space-y-3">
                {day.items.length === 0 ? (
                  <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                    No items added yet. Click &quot;Add Item&quot; to get
                    started.
                  </div>
                ) : (
                  day.items.map((item) => (
                    <ItineraryItemCard
                      key={item.id}
                      item={item}
                      onEdit={(item) => handleEditItem(day.id, item)}
                      onDelete={(itemId) => removeItem(day.id, itemId)}
                    />
                  ))
                )}
              </div>
            </Card>
          ))}

          {days.length === 0 && (
            <Card className="p-12 text-center">
              <CalendarDaysIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                No days added yet
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Start building your itinerary by adding your first day
              </p>
              <Button onClick={addDay} color="primary">
                <PlusIcon className="mr-2 h-5 w-5" />
                Add First Day
              </Button>
            </Card>
          )}
        </div>

        {/* Cost Summary Sidebar */}
        {/* <div className="lg:col-span-1">
          <Card className="sticky top-6 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Cost Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Net Cost:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {(getTotalNetCost() || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Markup:
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={markup || 0}
                  onChange={(e) => setMarkup(Number(e.target.value) || 0)}
                  className="w-16 text-center"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  %
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Markup Amount:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₹
                  {(
                    ((getTotalNetCost() || 0) * (markup || 0)) /
                    100
                  ).toLocaleString()}
                </span>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">
                  Total Price:
                </span>
                <span className="text-primary-600 dark:text-primary-400">
                  ₹{(getTotalWithMarkup() || 0).toLocaleString()}
                </span>
              </div>

              <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                {days.length} {days.length === 1 ? "day" : "days"} •{" "}
                {days.reduce((total, day) => total + day.items.length, 0)} items
              </div>
            </div>
          </Card>
        </div> */}
      </div>

      {/* Item Form Modal */}
      <ItineraryItemForm
        isOpen={isItemFormOpen}
        onClose={() => setIsItemFormOpen(false)}
        onSubmit={handleSubmitItem}
        item={editingItem}
      />
    </div>
  );
}

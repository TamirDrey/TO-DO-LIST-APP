import { toast } from "react-toastify";

export const checkTitle = (title: string): boolean => {
  if (!title) {
    toast.error("Title is required.");
    return false;
  }
  if (title.trim().length < 3) {
    toast.error("Title must be at least 3 characters.");
    return false;
  }
  return true;
};

export const checkDescription = (description: string): boolean => {
  if (description && description.trim().length < 5) {
    toast.error("Description must be at least 5 characters if provided.");
    return false;
  }
  return true;
};

export const checkPriority = (priority: string): boolean => {
  const allowedPriorities = ["low", "medium", "high"];
  if (!priority) {
    toast.error("Priority is required.");
    return false;
  }
  if (!allowedPriorities.includes(priority.toLowerCase())) {
    toast.error("Priority must be 'low', 'medium', or 'high'.");
    return false;
  }
  return true;
};

export const checkDeadline = (deadline: string): boolean => {
  if (!deadline) {
    toast.error("Deadline is required.");
    return false;
  }
  const currentDate = new Date();
  const selectedDate = new Date(deadline);

  if (isNaN(selectedDate.getTime())) {
    toast.error("Deadline must be a valid date.");
    return false;
  }

  if (selectedDate < currentDate) {
    toast.error("Deadline must be in the future.");
    return false;
  }
  return true;
};

// Combined Validation for the Task Object
export const validateTask = (task: {
  title: string;
  description?: string;
  priority: string;
  deadline: string;
}): boolean => {
  const isTitleValid = checkTitle(task.title);
  const isDescriptionValid = checkDescription(task.description || "");
  const isPriorityValid = checkPriority(task.priority);
  const isDueDateValid = checkDeadline(task.deadline);

  // Return true only if all validations pass
  return isTitleValid && isDescriptionValid && isPriorityValid && isDueDateValid;
};

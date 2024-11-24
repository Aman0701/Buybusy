import { toast } from 'react-toastify'; // Importing the toast function from react-toastify library for displaying notifications

/**
 * Function to display a toast notification.
 * @param {string} message - The message to be displayed in the toast.
 * @param {string} [type="success"] - The type of toast notification (e.g., success, error, info, warning).
 */
export const showToast = (message, type = "success") => {
  // Calling the toast function with the message and type to display the notification
  toast(message, { type });
};
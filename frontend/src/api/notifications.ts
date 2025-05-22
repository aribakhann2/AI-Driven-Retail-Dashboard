// src/api/notifications.ts

import axios from "axios";

export const getNotifications = async () => {
  try {
    console.log("Fetching notifications...");
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/notifications/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // assuming response is an array of notifications
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    alert("Could not fetch notifications. Please try again.");
    return [];
  }
};

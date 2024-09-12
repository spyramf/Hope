import React from "react";
import { View, Text } from "react-native";

// Utility function to format the date as DD/MM/YYYY
const getFormattedDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const DateExample = () => {
  // Get today's date
  const today = new Date();
  const todayDate = getFormattedDate(today);

  // Calculate the date 15 years later
  const futureDate = new Date(today);
  futureDate.setFullYear(today.getFullYear() + 15);
  const futureDateFormatted = getFormattedDate(futureDate);


};

export default DateExample;

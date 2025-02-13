import React, { createContext, useContext, useState } from "react";

type DateContextType = {
  selectedDate: {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    period: "AM" | "PM";
  };
  setSelectedDate: (date: DateContextType["selectedDate"]) => void;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedDate, setSelectedDate] = useState({
    year: 2024,
    month: 1,
    day: 24, // Default to current day in CALENDAR_DATA
    hours: 9,
    minutes: 0,
    period: "AM" as const,
  });

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
};

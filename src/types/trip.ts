
export type TripPreferences = {
  departureLocation: string;
  destination: string;
  budget: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  travelers: number;
  interests: string[];
  additionalNotes: string;
};

export interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  duration: string;
  type: "attraction" | "food" | "transport" | "accommodation";
  image?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  activities: Activity[];
}

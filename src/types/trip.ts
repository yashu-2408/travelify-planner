
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
  price?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ItineraryDay {
  dayNumber: number;
  activities: Activity[];
  weather?: {
    condition: string;
    temperature: string;
    icon: string;
  };
}

export interface HotelRecommendation {
  name: string;
  location: string;
  priceRange: string;
  rating: number;
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface TravelTip {
  title: string;
  description: string;
  category: "safety" | "packing" | "local" | "budget" | "transport";
}

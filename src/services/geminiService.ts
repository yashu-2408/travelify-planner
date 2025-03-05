
import { TripPreferences } from "@/types/trip";

// This is the interface for our API response
export interface GeminiItineraryResponse {
  days: {
    dayNumber: number;
    activities: {
      id: string;
      time: string;
      title: string;
      location: string;
      description: string;
      duration: string;
      type: "attraction" | "food" | "transport" | "accommodation";
      image?: string;
      price?: string;
    }[];
    weather?: {
      condition: string;
      temperature: string;
      icon: string;
    };
  }[];
  hotelRecommendations?: {
    name: string;
    location: string;
    priceRange: string;
    rating: number;
    description: string;
  }[];
  travelTips?: {
    title: string;
    description: string;
    category: "safety" | "packing" | "local" | "budget" | "transport";
  }[];
}

// This function will be used to generate the itinerary using Gemini API
export async function generateItinerary(preferences: TripPreferences): Promise<GeminiItineraryResponse> {
  // Add the provided API key to localStorage if not already there
  const providedApiKey = "AIzaSyC8a1FlixthgQ9neQZkX6aeeaL0AFctrbQ";
  
  // Always store the API key to ensure it's available
  localStorage.setItem("geminiApiKey", providedApiKey);
  
  // Now use the stored API key
  const apiKey = localStorage.getItem("geminiApiKey");
  
  // Validate that we have an API key
  if (!apiKey) {
    console.error("No Gemini API key found in localStorage.");
    throw new Error("No Gemini API key found. Please add your API key in the settings.");
  }

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Create a detailed travel itinerary for a trip from ${preferences.departureLocation || 'home'} to ${preferences.destination}. 
                Trip details:
                - Start date: ${preferences.startDate ? new Date(preferences.startDate).toLocaleDateString() : 'Not specified'}
                - End date: ${preferences.endDate ? new Date(preferences.endDate).toLocaleDateString() : 'Not specified'}
                - Number of travelers: ${preferences.travelers}
                - Budget: ₹${preferences.budget.toLocaleString('en-IN')} per person
                - Interests: ${preferences.interests.join(', ')}
                ${preferences.additionalNotes ? `- Additional notes: ${preferences.additionalNotes}` : ''}
                
                Please provide a daily itinerary with specific details about each activity including:
                - Time of day
                - Title of activity
                - Location (be specific with real places)
                - Description
                - Duration
                - Type (attraction, food, transport, or accommodation)
                - Approximate price (when applicable)
                
                For each day, also include weather information (temperature, condition, and weather icon name).
                
                Additionally, provide:
                1. 3-5 hotel recommendations with name, location, price range, rating (1-5), and brief description
                2. 5-8 travel tips specific to the destination (categorized as safety, packing, local, budget, or transport)
                
                Format the response as a JSON object with days, activities, weather, hotel recommendations, and travel tips. Do not include any explanation, only the JSON object.
                The JSON format should be:
                {
                  "days": [
                    {
                      "dayNumber": 1,
                      "activities": [
                        {
                          "id": "1",
                          "time": "09:00 AM",
                          "title": "Activity title",
                          "location": "Specific location name",
                          "description": "Detailed description of the activity",
                          "duration": "2 hours",
                          "type": "attraction" (or "food", "transport", "accommodation"),
                          "price": "₹X,XXX" (optional)
                        },
                        ...more activities
                      ],
                      "weather": {
                        "condition": "Sunny",
                        "temperature": "32°C",
                        "icon": "sun"
                      }
                    },
                    ...more days
                  ],
                  "hotelRecommendations": [
                    {
                      "name": "Hotel name",
                      "location": "Hotel location",
                      "priceRange": "₹X,XXX - ₹Y,YYY per night",
                      "rating": 4.5,
                      "description": "Brief hotel description"
                    },
                    ...more hotels
                  ],
                  "travelTips": [
                    {
                      "title": "Tip title",
                      "description": "Detailed tip description",
                      "category": "safety" (or "packing", "local", "budget", "transport")
                    },
                    ...more tips
                  ]
                }`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
          topP: 0.95,
          topK: 40
        }
      }),
    });

    const data = await response.json();
    
    // Check if there's an error in the response
    if (data.error) {
      console.error("Gemini API error:", data.error);
      throw new Error(`Gemini API error: ${data.error.message || "Unknown error"}`);
    }
    
    // Extract the JSON from the response text
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Find the JSON object in the text response
    let jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from Gemini response");
    }
    
    // Parse the JSON object
    try {
      const itineraryData = JSON.parse(jsonMatch[0]);
      return itineraryData;
    } catch (jsonError) {
      console.error("Error parsing JSON from Gemini response:", jsonError);
      throw new Error("Failed to parse the generated itinerary data");
    }
  } catch (error) {
    console.error("Error generating itinerary with Gemini:", error);
    throw error;
  }
}

// Helper function to check if the API key is set
export function isGeminiApiKeySet(): boolean {
  const apiKey = localStorage.getItem("geminiApiKey");
  return !!apiKey && apiKey.trim() !== "";
}

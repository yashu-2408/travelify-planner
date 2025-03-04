
import { GeminiItineraryResponse } from "@/services/geminiService";

// Mock itinerary data for Goa to Agra trip
export const mockItinerary: GeminiItineraryResponse = {
  days: [
    {
      dayNumber: 1,
      activities: [
        {
          id: "1.1",
          time: "08:00 AM",
          title: "Breakfast in Goa",
          location: "Hotel Restaurant, Goa",
          description: "Enjoy a relaxed breakfast before departure. Weather: Warm, sunny, approximately 32°C (90°F).",
          duration: "1 hour",
          type: "food"
        },
        {
          id: "1.2",
          time: "10:00 AM",
          title: "Travel to Goa International Airport",
          location: "Goa International Airport (GOI)",
          description: "Check-in and prepare for your flight to Delhi.",
          duration: "2 hours",
          type: "transport"
        },
        {
          id: "1.3",
          time: "01:00 PM",
          title: "Flight from Goa to Delhi",
          location: "Goa International Airport (GOI) to Delhi Airport (DEL)",
          description: "Flight journey from Goa to Delhi.",
          duration: "2.5 hours",
          type: "transport"
        },
        {
          id: "1.4",
          time: "04:30 PM",
          title: "Travel from Delhi to Agra",
          location: "Delhi to Agra by train or car",
          description: "Journey from Delhi to Agra via train or pre-booked private car.",
          duration: "3 hours",
          type: "transport"
        },
        {
          id: "1.5",
          time: "07:30 PM",
          title: "Check into hotel in Agra",
          location: "Your Agra Hotel",
          description: "Check-in and settle into your accommodation in Agra.",
          duration: "1 hour",
          type: "accommodation"
        },
        {
          id: "1.6",
          time: "08:30 PM",
          title: "Dinner in Agra",
          location: "Hotel Restaurant or Nearby Local Restaurant",
          description: "Enjoy dinner at your hotel or a nearby restaurant. Weather: Pleasant, approximately 20°C (68°F).",
          duration: "1.5 hours",
          type: "food"
        }
      ]
    },
    {
      dayNumber: 2,
      activities: [
        {
          id: "2.1",
          time: "05:30 AM",
          title: "Taj Mahal at Sunrise",
          location: "Taj Mahal, Agra",
          description: "Visit the iconic Taj Mahal during sunrise for breathtaking views. Weather: Cool, approximately 15°C (59°F), gradually warming. Note: Entry fees are higher for foreign tourists.",
          duration: "2.5 hours",
          type: "attraction",
          image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3"
        },
        {
          id: "2.2",
          time: "08:30 AM",
          title: "Breakfast at Hotel",
          location: "Your Agra Hotel",
          description: "Return to your hotel for breakfast after the Taj Mahal visit.",
          duration: "1 hour",
          type: "food"
        },
        {
          id: "2.3",
          time: "11:00 AM",
          title: "Explore Agra Fort",
          location: "Agra Fort, Agra",
          description: "Explore the historic Agra Fort, a UNESCO World Heritage site. Weather: Warm, approximately 30°C (86°F). Note: Different entry fees for foreign and domestic tourists.",
          duration: "3 hours",
          type: "attraction",
          image: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
        },
        {
          id: "2.4",
          time: "03:00 PM",
          title: "Lunch at Local Restaurant",
          location: "Local Restaurant near Agra Fort",
          description: "Try authentic local cuisine for lunch.",
          duration: "1.5 hours",
          type: "food"
        },
        {
          id: "2.5",
          time: "05:30 PM",
          title: "Mehtab Bagh Sunset View",
          location: "Mehtab Bagh, Agra",
          description: "Visit Mehtab Bagh for a stunning sunset view of the Taj Mahal across the river. Weather: Pleasant, approximately 25°C (77°F).",
          duration: "1.5 hours",
          type: "attraction",
          image: "https://images.unsplash.com/photo-1598324789736-4861f89564a0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
        },
        {
          id: "2.6",
          time: "08:00 PM",
          title: "Dinner at Local Restaurant",
          location: "Popular Restaurant in Agra",
          description: "Enjoy dinner at a well-known local restaurant featuring regional specialties.",
          duration: "2 hours",
          type: "food"
        }
      ]
    },
    {
      dayNumber: 3,
      activities: [
        {
          id: "3.1",
          time: "08:00 AM",
          title: "Breakfast at Hotel",
          location: "Your Agra Hotel",
          description: "Start your day with breakfast at your hotel.",
          duration: "1 hour",
          type: "food"
        },
        {
          id: "3.2",
          time: "09:30 AM",
          title: "Day Trip to Fatehpur Sikri",
          location: "Fatehpur Sikri, near Agra",
          description: "Explore the historic city of Fatehpur Sikri, a UNESCO World Heritage site. Weather: Warm, approximately 30°C (86°F). Note: Entry fee differences apply for foreign and domestic tourists.",
          duration: "4 hours",
          type: "attraction",
          image: "https://images.unsplash.com/photo-1625126587661-b54d810479d4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
        },
        {
          id: "3.3",
          time: "02:00 PM",
          title: "Lunch at Fatehpur Sikri",
          location: "Restaurant near Fatehpur Sikri",
          description: "Enjoy lunch near the historic site before returning to Agra.",
          duration: "1.5 hours",
          type: "food"
        },
        {
          id: "3.4",
          time: "04:30 PM",
          title: "Explore Sadar Bazaar",
          location: "Sadar Bazaar, Agra",
          description: "Shop at Sadar Bazaar, a popular local market. Note: Bargaining is common and expected.",
          duration: "2.5 hours",
          type: "attraction"
        },
        {
          id: "3.5",
          time: "08:00 PM",
          title: "Cultural Show and Dinner",
          location: "Cultural Venue in Agra",
          description: "Experience a cultural show featuring traditional music and dance, followed by a traditional dinner.",
          duration: "3 hours",
          type: "food"
        }
      ]
    },
    {
      dayNumber: 4,
      activities: [
        {
          id: "4.1",
          time: "08:30 AM",
          title: "Breakfast at Hotel",
          location: "Your Agra Hotel",
          description: "Enjoy breakfast at your hotel.",
          duration: "1 hour",
          type: "food"
        },
        {
          id: "4.2",
          time: "10:00 AM",
          title: "Visit Itmad-ud-Daulah's Tomb",
          location: "Itmad-ud-Daulah's Tomb, Agra",
          description: "Visit the exquisite 'Baby Taj', known for its intricate marble work. Weather: Warm, approximately 30°C (86°F). Note: Entry fee differences apply.",
          duration: "2 hours",
          type: "attraction",
          image: "https://images.unsplash.com/photo-1596308889088-6ed6abe61d3f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3"
        },
        {
          id: "4.3",
          time: "12:30 PM",
          title: "Lunch at Local Restaurant",
          location: "Restaurant in Agra",
          description: "Enjoy lunch at a local restaurant.",
          duration: "1.5 hours",
          type: "food"
        },
        {
          id: "4.4",
          time: "02:30 PM",
          title: "Relaxation Time or Optional Sightseeing",
          location: "Your Agra Hotel or Optional Attractions",
          description: "Time to relax at your hotel or explore additional sights in Agra based on your preference.",
          duration: "3 hours",
          type: "attraction"
        },
        {
          id: "4.5",
          time: "06:00 PM",
          title: "Shopping for Souvenirs",
          location: "Local Markets in Agra",
          description: "Time for shopping for souvenirs or local handicrafts. Agra is known for marble crafts and leather goods.",
          duration: "2 hours",
          type: "attraction"
        },
        {
          id: "4.6",
          time: "08:30 PM",
          title: "Dinner at Hotel or Restaurant",
          location: "Your Hotel or Local Restaurant",
          description: "Enjoy dinner at your hotel or try another local restaurant.",
          duration: "1.5 hours",
          type: "food"
        }
      ]
    },
    {
      dayNumber: 5,
      activities: [
        {
          id: "5.1",
          time: "08:00 AM",
          title: "Relaxed Breakfast",
          location: "Your Agra Hotel",
          description: "Enjoy a relaxed breakfast at your hotel before departing for Delhi.",
          duration: "1.5 hours",
          type: "food"
        },
        {
          id: "5.2",
          time: "10:00 AM",
          title: "Check-out and Prepare for Travel",
          location: "Your Agra Hotel",
          description: "Check out from your Agra hotel and prepare for your journey to Delhi.",
          duration: "1 hour",
          type: "accommodation"
        },
        {
          id: "5.3",
          time: "11:30 AM",
          title: "Travel from Agra to Delhi",
          location: "Agra to Delhi by train or car",
          description: "Journey from Agra to Delhi via train or private car.",
          duration: "3 hours",
          type: "transport"
        },
        {
          id: "5.4",
          time: "03:00 PM",
          title: "Check into Delhi Hotel",
          location: "Your Delhi Hotel",
          description: "Arrive in Delhi and check into your hotel.",
          duration: "1.5 hours",
          type: "accommodation"
        },
        {
          id: "5.5",
          time: "05:00 PM",
          title: "Explore Local Market",
          location: "Local Market in Delhi",
          description: "Visit a nearby local market in Delhi to experience the vibrant city life.",
          duration: "2 hours",
          type: "attraction"
        },
        {
          id: "5.6",
          time: "08:00 PM",
          title: "Dinner in Delhi",
          location: "Restaurant in Delhi",
          description: "Enjoy dinner at a restaurant in Delhi, sampling the local cuisine.",
          duration: "2 hours",
          type: "food"
        }
      ]
    },
    {
      dayNumber: 6,
      activities: [
        {
          id: "6.1",
          time: "07:30 AM",
          title: "Breakfast at Hotel",
          location: "Your Delhi Hotel",
          description: "Start your day with breakfast at your hotel.",
          duration: "1 hour",
          type: "food"
        },
        {
          id: "6.2",
          time: "09:00 AM",
          title: "Visit Red Fort",
          location: "Red Fort, Delhi",
          description: "Explore the historic Red Fort, a UNESCO World Heritage site. Weather: Warm, approximately 30°C (86°F). Note: Entry fee differences apply.",
          duration: "2.5 hours",
          type: "attraction",
          image: "https://images.unsplash.com/photo-1565018054866-968e244671af?q=80&w=1515&auto=format&fit=crop&ixlib=rb-4.0.3"
        },
        {
          id: "6.3",
          time: "12:00 PM",
          title: "Visit Jama Masjid",
          location: "Jama Masjid, Delhi",
          description: "Visit one of India's largest mosques, Jama Masjid.",
          duration: "1.5 hours",
          type: "attraction",
          image: "https://images.unsplash.com/photo-1629307881376-de84c32da591?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
        },
        {
          id: "6.4",
          time: "01:30 PM",
          title: "Lunch in Old Delhi",
          location: "Restaurant in Old Delhi",
          description: "Enjoy lunch at a famous restaurant in Old Delhi, known for its authentic flavors.",
          duration: "1.5 hours",
          type: "food"
        },
        {
          id: "6.5",
          time: "03:30 PM",
          title: "Visit Qutub Minar",
          location: "Qutub Minar, Delhi",
          description: "Explore Qutub Minar, a UNESCO World Heritage site and one of Delhi's most iconic monuments.",
          duration: "2 hours",
          type: "attraction",
          image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3"
        },
        {
          id: "6.6",
          time: "06:00 PM",
          title: "Visit India Gate",
          location: "India Gate, Delhi",
          description: "Visit India Gate, a war memorial located in the heart of New Delhi.",
          duration: "1 hour",
          type: "attraction",
          image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
        },
        {
          id: "6.7",
          time: "07:30 PM",
          title: "Explore Connaught Place or Dilli Haat",
          location: "Connaught Place or Dilli Haat, Delhi",
          description: "Explore either Connaught Place (a commercial hub) or Dilli Haat (a craft bazaar), depending on your interest.",
          duration: "2 hours",
          type: "attraction"
        },
        {
          id: "6.8",
          time: "09:30 PM",
          title: "Dinner in Delhi",
          location: "Restaurant in Delhi",
          description: "Enjoy dinner at a restaurant in Delhi.",
          duration: "1.5 hours",
          type: "food"
        }
      ]
    },
    {
      dayNumber: 7,
      activities: [
        {
          id: "7.1",
          time: "08:00 AM",
          title: "Final Indian Breakfast",
          location: "Your Delhi Hotel",
          description: "Enjoy your final Indian breakfast at the hotel.",
          duration: "1.5 hours",
          type: "food"
        },
        {
          id: "7.2",
          time: "10:00 AM",
          title: "Last-Minute Shopping",
          location: "Nearby Market in Delhi",
          description: "Time for any last-minute shopping, depending on your flight time.",
          duration: "2 hours",
          type: "attraction"
        },
        {
          id: "7.3",
          time: "12:30 PM",
          title: "Check-out and Prepare for Departure",
          location: "Your Delhi Hotel",
          description: "Check out from your hotel and prepare for your journey to the airport.",
          duration: "1 hour",
          type: "accommodation"
        },
        {
          id: "7.4",
          time: "02:00 PM",
          title: "Travel to Delhi International Airport",
          location: "Delhi Hotel to Delhi International Airport (DEL)",
          description: "Journey to Delhi International Airport for your departure flight. Weather: Check the forecast for your destination.",
          duration: "1.5 hours",
          type: "transport"
        }
      ]
    }
  ]
};

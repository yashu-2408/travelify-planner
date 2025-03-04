
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ItineraryDay, Activity } from "@/components/trip/ItineraryDay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";
import { Download, Share2, Edit, Save } from "lucide-react";

// Sample data types
type TripPreferences = {
  destination: string;
  budget: number;
  startDate: string; // We'll need to parse this
  endDate: string; // We'll need to parse this
  travelers: number;
  interests: string[];
  additionalNotes: string;
};

// Sample mock data for the itinerary
const mockActivities: Record<number, Activity[]> = {
  1: [
    {
      id: "1",
      time: "09:00 AM",
      title: "Café Breakfast",
      location: "Le Petit Café",
      description: "Start your day with a traditional breakfast at this charming local café.",
      duration: "1 hour",
      type: "food",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: "2",
      time: "10:30 AM",
      title: "City Tour",
      location: "Downtown",
      description: "Explore the iconic landmarks of the city with our guided walking tour.",
      duration: "3 hours",
      type: "attraction",
      image: "https://images.unsplash.com/photo-1519112232436-9923c6ba3d26?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: "3",
      time: "01:30 PM",
      title: "Lunch at River View",
      location: "River View Restaurant",
      description: "Enjoy a delicious lunch with beautiful views of the river.",
      duration: "1.5 hours",
      type: "food",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: "4",
      time: "03:30 PM",
      title: "Museum Visit",
      location: "National Museum",
      description: "Discover the rich history and culture at the renowned National Museum.",
      duration: "2 hours",
      type: "attraction",
      image: "https://images.unsplash.com/photo-1565060169580-255af2f1f640?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: "5",
      time: "07:00 PM",
      title: "Dinner & Entertainment",
      location: "Downtown Square",
      description: "Savor local cuisine followed by street performances at the central square.",
      duration: "2.5 hours",
      type: "food",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: "6",
      time: "10:00 PM",
      title: "Check-in at Hotel",
      location: "Grand Plaza Hotel",
      description: "Rest for the night at your comfortable accommodation.",
      duration: "Overnight",
      type: "accommodation",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ],
  2: [
    {
      id: "7",
      time: "08:30 AM",
      title: "Breakfast",
      location: "Hotel Restaurant",
      description: "Enjoy a complimentary breakfast at your hotel.",
      duration: "45 minutes",
      type: "food"
    },
    {
      id: "8",
      time: "09:30 AM",
      title: "Nature Park Excursion",
      location: "Urban Nature Park",
      description: "Immerse yourself in nature with a visit to the beautiful urban park.",
      duration: "2.5 hours",
      type: "attraction",
      image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: "9",
      time: "12:30 PM",
      title: "Picnic Lunch",
      location: "Park Gardens",
      description: "A delightful picnic lunch prepared with local ingredients.",
      duration: "1 hour",
      type: "food",
      image: "https://images.unsplash.com/photo-1559734840-f9509ee5677f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ]
};

export default function Itinerary() {
  const [preferences, setPreferences] = useState<TripPreferences | null>(null);
  const [days, setDays] = useState<number[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this data would come from an API or global state
    const storedPrefs = localStorage.getItem("tripPreferences");
    
    if (!storedPrefs) {
      navigate("/planner");
      toast({
        title: "No itinerary found",
        description: "Please create a new trip plan first.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const parsedPrefs = JSON.parse(storedPrefs);
      setPreferences(parsedPrefs);
      
      // Generate days array based on trip duration
      const startDate = new Date(parsedPrefs.startDate);
      const endDate = new Date(parsedPrefs.endDate);
      const tripDays = differenceInDays(endDate, startDate) + 1;
      setDays(Array.from({ length: tripDays }, (_, i) => i + 1));
    } catch (error) {
      console.error("Error parsing preferences:", error);
      navigate("/planner");
    }
  }, [navigate, toast]);
  
  const handleSave = () => {
    toast({
      title: "Itinerary Saved",
      description: "Your travel plan has been saved successfully.",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A shareable link has been copied to your clipboard.",
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Downloading Itinerary",
      description: "Your itinerary is being prepared for download.",
    });
  };
  
  if (!preferences) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Loading your itinerary...</h2>
          <p className="text-muted-foreground">Please wait while we prepare your travel plan.</p>
        </div>
      </div>
    );
  }
  
  const startDate = new Date(preferences.startDate);
  const endDate = new Date(preferences.endDate);
  
  return (
    <div className="container px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Your {preferences.destination} Itinerary
          </h1>
          <p className="text-muted-foreground">
            {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")} • {preferences.travelers} {preferences.travelers === 1 ? 'traveler' : 'travelers'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button size="sm" onClick={() => navigate("/planner")}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Plan
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="itinerary" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="itinerary">Day by Day</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="itinerary" className="space-y-8 animate-fade-in">
          {days.map((day) => (
            <ItineraryDay
              key={day}
              dayNumber={day}
              date={format(
                new Date(startDate.getTime() + (day - 1) * 24 * 60 * 60 * 1000),
                "EEEE, MMMM d, yyyy"
              )}
              activities={mockActivities[day] || []}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="overview" className="space-y-8 animate-fade-in">
          <div className="bg-muted/30 border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Trip Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Destination</h4>
                <p>{preferences.destination}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Dates</h4>
                <p>
                  {format(startDate, "MMMM d")} - {format(endDate, "MMMM d, yyyy")}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Duration</h4>
                <p>{days.length} days</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Travelers</h4>
                <p>{preferences.travelers} {preferences.travelers === 1 ? 'person' : 'people'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Budget</h4>
                <p>${preferences.budget} per person</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Interests</h4>
                <div className="flex flex-wrap gap-1">
                  {preferences.interests.map((interest) => (
                    <span key={interest} className="bg-muted px-2 py-1 text-xs rounded">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              {preferences.additionalNotes && (
                <div className="col-span-2">
                  <h4 className="font-medium mb-2">Additional Notes</h4>
                  <p className="text-muted-foreground">{preferences.additionalNotes}</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="map" className="animate-fade-in">
          <div className="bg-muted/30 border border-border rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Trip Map</h3>
            <p className="text-muted-foreground mb-6">
              Interactive map will be available in a future update.
            </p>
            <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Map view for {preferences.destination}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ItineraryDay, Activity } from "@/components/trip/ItineraryDay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";
import { Download, Share2, Edit, Save, Hotel, Lightbulb, Star, AlertTriangle, Package, Wallet, MapPin } from "lucide-react";
import { TripPreferences, ItineraryDay as ItineraryDayType, HotelRecommendation, TravelTip } from "@/types/trip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Itinerary() {
  const [preferences, setPreferences] = useState<TripPreferences | null>(null);
  const [itineraryData, setItineraryData] = useState<ItineraryDayType[] | null>(null);
  const [hotelRecommendations, setHotelRecommendations] = useState<HotelRecommendation[] | null>(null);
  const [travelTips, setTravelTips] = useState<TravelTip[] | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const storedPrefs = localStorage.getItem("tripPreferences");
    const storedItinerary = localStorage.getItem("tripItinerary");
    
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
      
      if (parsedPrefs.startDate) {
        parsedPrefs.startDate = new Date(parsedPrefs.startDate);
      }
      if (parsedPrefs.endDate) {
        parsedPrefs.endDate = new Date(parsedPrefs.endDate);
      }
      
      if (storedItinerary) {
        const parsedItinerary = JSON.parse(storedItinerary);
        setItineraryData(parsedItinerary.days);
        setHotelRecommendations(parsedItinerary.hotelRecommendations || null);
        setTravelTips(parsedItinerary.travelTips || null);
      }
    } catch (error) {
      console.error("Error parsing data:", error);
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
  
  const getTipIcon = (category: string) => {
    switch (category) {
      case "safety": return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "packing": return <Package className="h-5 w-5 text-blue-500" />;
      case "local": return <MapPin className="h-5 w-5 text-green-500" />;
      case "budget": return <Wallet className="h-5 w-5 text-purple-500" />;
      case "transport": return <Share2 className="h-5 w-5 text-indigo-500" />;
      default: return <Lightbulb className="h-5 w-5 text-amber-500" />;
    }
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
  
  const startDate = preferences.startDate;
  const endDate = preferences.endDate;
  
  if (!startDate || !endDate) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Invalid itinerary data</h2>
          <p className="text-muted-foreground mb-4">Your trip dates are missing. Please create a new itinerary.</p>
          <Button onClick={() => navigate("/planner")}>Create New Itinerary</Button>
        </div>
      </div>
    );
  }

  const tripDays = differenceInDays(endDate, startDate) + 1;
  
  return (
    <div className="container px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {preferences.departureLocation ? `${preferences.departureLocation} to ` : ''}
            {preferences.destination} Itinerary
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
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="tips">Travel Tips</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="itinerary" className="space-y-8 animate-fade-in">
          {itineraryData ? (
            itineraryData.map((day) => (
              <ItineraryDay
                key={day.dayNumber}
                dayNumber={day.dayNumber}
                date={format(
                  new Date(startDate.getTime() + (day.dayNumber - 1) * 24 * 60 * 60 * 1000),
                  "EEEE, MMMM d, yyyy"
                )}
                activities={day.activities}
                weather={day.weather}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No itinerary data available.</p>
              <Button onClick={() => navigate("/planner")}>Regenerate Itinerary</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="hotels" className="space-y-8 animate-fade-in">
          <SectionHeading
            title="Recommended Hotels"
            description="Curated accommodation options for your stay"
          />
          
          {hotelRecommendations && hotelRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotelRecommendations.map((hotel, index) => (
                <Card key={index} className="overflow-hidden border border-border h-full flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl font-semibold">{hotel.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {hotel.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center bg-muted/50 px-2 py-1 rounded-md">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 mr-1" />
                      <span className="text-sm font-medium">{hotel.rating.toFixed(1)}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm mb-4">{hotel.description}</p>
                    <Badge variant="outline" className="font-normal bg-muted/50">
                      {hotel.priceRange}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No hotel recommendations available.</p>
              <Button onClick={() => navigate("/planner")}>Regenerate Itinerary</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="tips" className="space-y-8 animate-fade-in">
          <SectionHeading
            title="Travel Tips"
            description="Helpful advice for your trip to make it more enjoyable"
          />
          
          {travelTips && travelTips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {travelTips.map((tip, index) => (
                <Card key={index} className="overflow-hidden border border-border">
                  <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                    <div className="mr-4 mt-1">{getTipIcon(tip.category)}</div>
                    <div>
                      <CardTitle className="text-lg font-semibold">{tip.title}</CardTitle>
                      <Badge variant="outline" className="mt-1 capitalize">
                        {tip.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No travel tips available.</p>
              <Button onClick={() => navigate("/planner")}>Regenerate Itinerary</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="overview" className="space-y-8 animate-fade-in">
          <div className="bg-muted/30 border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Trip Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {preferences.departureLocation && (
                <div>
                  <h4 className="font-medium mb-2">Departure</h4>
                  <p>{preferences.departureLocation}</p>
                </div>
              )}
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
                <p>{tripDays} days</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Travelers</h4>
                <p>{preferences.travelers} {preferences.travelers === 1 ? 'person' : 'people'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Budget</h4>
                <p>₹{preferences.budget.toLocaleString('en-IN')} per person</p>
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, AlertCircle } from "lucide-react";
import { TripPreferences } from "@/types/trip";
import { generateItinerary, isGeminiApiKeySet } from "@/services/geminiService";
import { Link } from "react-router-dom";
import { LocationSelector } from "./LocationSelector";

const initialPreferences: TripPreferences = {
  departureLocation: "",
  destination: "",
  budget: 50000,
  startDate: undefined,
  endDate: undefined,
  travelers: 1,
  interests: [],
  additionalNotes: "",
};

const interestOptions = [
  "Nature",
  "Culture",
  "Food",
  "Adventure",
  "Relaxation",
  "Shopping",
  "History",
  "Nightlife",
  "Family-friendly",
  "Photography",
];

export function TripPlannerForm() {
  const [preferences, setPreferences] = useState<TripPreferences>(initialPreferences);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("geminiApiKey")) {
      localStorage.setItem("geminiApiKey", "AIzaSyC8a1FlixthgQ9neQZkX6aeeaL0AFctrbQ");
    }
    
    const checkApiKey = () => {
      const keyIsSet = isGeminiApiKeySet();
      setApiKeyMissing(!keyIsSet);
    };
    
    checkApiKey();
    
    window.addEventListener('storage', checkApiKey);
    window.addEventListener('focus', checkApiKey);
    
    return () => {
      window.removeEventListener('storage', checkApiKey);
      window.removeEventListener('focus', checkApiKey);
    };
  }, []);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };
  
  const handleLocationChange = (field: "departureLocation" | "destination", value: string, coordinates?: { lat: number; lng: number }) => {
    setPreferences({ 
      ...preferences, 
      [field]: value,
      [field === "departureLocation" ? "departureCoordinates" : "destinationCoordinates"]: coordinates
    });
  };
  
  const toggleInterest = (interest: string) => {
    if (preferences.interests.includes(interest)) {
      setPreferences({
        ...preferences,
        interests: preferences.interests.filter((i) => i !== interest),
      });
    } else {
      setPreferences({
        ...preferences,
        interests: [...preferences.interests, interest],
      });
    }
  };
  
  const handleDateChange = (date: Date | undefined, field: "startDate" | "endDate") => {
    setPreferences({ ...preferences, [field]: date });
  };
  
  const handleNext = () => {
    if (step === 1 && !preferences.departureLocation) {
      toast({
        title: "Departure location required",
        description: "Please enter a departure location for your trip.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 1 && !preferences.destination) {
      toast({
        title: "Destination required",
        description: "Please enter a destination for your trip.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && (!preferences.startDate || !preferences.endDate)) {
      toast({
        title: "Dates required",
        description: "Please select both start and end dates for your trip.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(step + 1);
  };
  
  const handlePrevious = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isGeminiApiKeySet()) {
      setApiKeyMissing(true);
      toast({
        title: "API Key Required",
        description: "Please add your Gemini API key in settings before generating an itinerary.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setApiKeyMissing(false);
    
    try {
      const itineraryData = await generateItinerary(preferences);
      
      localStorage.setItem("tripPreferences", JSON.stringify(preferences));
      localStorage.setItem("tripItinerary", JSON.stringify(itineraryData));
      
      toast({
        title: "Itinerary generated!",
        description: "Your personalized travel plan is ready.",
      });
      
      navigate("/itinerary");
    } catch (error) {
      console.error("Error generating itinerary:", error);
      toast({
        title: "Error generating itinerary",
        description: error instanceof Error ? error.message : "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200",
                step === s
                  ? "border-travel-600 bg-travel-600 text-white"
                  : step > s
                  ? "border-travel-600 bg-travel-50 text-travel-600"
                  : "border-gray-300 bg-gray-50 text-gray-400"
              )}
            >
              {s}
              {s < 4 && (
                <div
                  className={cn(
                    "absolute top-1/2 w-full h-[2px] left-full -translate-y-1/2",
                    step > s ? "bg-travel-600" : "bg-gray-300"
                  )}
                  style={{ width: "calc(100% - 2rem)" }}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground px-1">
          <span>Departure Location</span>
          <span>Dates</span>
          <span>Preferences</span>
          <span>Details</span>
        </div>
      </div>

      <Card className="w-full bg-card/50 backdrop-blur-sm border border-border">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Where are you traveling?"}
            {step === 2 && "When are you traveling?"}
            {step === 3 && "What do you enjoy?"}
            {step === 4 && "Any special requests?"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Enter your departure location and destination."}
            {step === 2 && "Select your travel dates."}
            {step === 3 && "Tell us about your interests and budget."}
            {step === 4 && "Add any additional details for your trip."}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="departureLocation">
                  Departure Location
                </Label>
                <LocationSelector
                  value={preferences.departureLocation}
                  onChange={(value, coordinates) => handleLocationChange("departureLocation", value, coordinates)}
                  placeholder="City, country, or region"
                  type="departure"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">
                  Destination
                </Label>
                <LocationSelector
                  value={preferences.destination}
                  onChange={(value, coordinates) => handleLocationChange("destination", value, coordinates)}
                  placeholder="City, country, or region" 
                  type="destination"
                />
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !preferences.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {preferences.startDate ? (
                          format(preferences.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={preferences.startDate}
                        onSelect={(date) => handleDateChange(date, "startDate")}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !preferences.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {preferences.endDate ? (
                          format(preferences.endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={preferences.endDate}
                        onSelect={(date) => handleDateChange(date, "endDate")}
                        initialFocus
                        disabled={(date) => 
                          date < new Date() || 
                          (preferences.startDate && date < preferences.startDate)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers</Label>
                <Select 
                  value={preferences.travelers.toString()} 
                  onValueChange={(value) => 
                    setPreferences({ ...preferences, travelers: parseInt(value) })
                  }
                >
                  <SelectTrigger id="travelers">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "person" : "people"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <Label>Interests (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {interestOptions.map((interest) => (
                    <Button
                      key={interest}
                      type="button"
                      variant={preferences.interests.includes(interest) ? "default" : "outline"}
                      onClick={() => toggleInterest(interest)}
                      className="justify-start"
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="budget">Budget (per person)</Label>
                  <span className="text-sm font-medium">
                    ₹{preferences.budget.toLocaleString('en-IN')}
                  </span>
                </div>
                <Slider
                  id="budget"
                  min={5000}
                  max={500000}
                  step={5000}
                  defaultValue={[preferences.budget]}
                  onValueChange={(value) => 
                    setPreferences({ ...preferences, budget: value[0] })
                  }
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹5,000</span>
                  <span>₹5,00,000+</span>
                </div>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="additionalNotes">
                  Additional Notes or Special Requests
                </Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Tell us anything else that might help plan your perfect trip..."
                  value={preferences.additionalNotes}
                  onChange={handleInputChange}
                  rows={5}
                />
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 border-t p-6">
          {apiKeyMissing && (
            <div className="w-full p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start space-x-3 text-amber-800">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Gemini API key required</p>
                <p className="text-sm">You need to add your Gemini API key in settings before generating an itinerary.</p>
                <Button variant="link" className="h-auto p-0 text-amber-800 underline" asChild>
                  <Link to="/settings">Go to Settings</Link>
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex justify-between w-full">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 4 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={loading} className="px-8">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Itinerary"
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

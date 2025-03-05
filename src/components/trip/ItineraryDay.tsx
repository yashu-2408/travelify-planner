
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Utensils, 
  Ticket, 
  Hotel, 
  ChevronDown, 
  ChevronUp,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Coins
} from "lucide-react";
import { cn } from "@/lib/utils";

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
}

interface Weather {
  condition: string;
  temperature: string;
  icon: string;
}

interface ItineraryDayProps {
  dayNumber: number;
  date: string;
  activities: Activity[];
  weather?: Weather;
}

export function ItineraryDay({ dayNumber, date, activities, weather }: ItineraryDayProps) {
  const [expanded, setExpanded] = useState(true);
  
  const getWeatherIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case 'sun':
      case 'sunny':
      case 'clear':
        return <Sun className="h-5 w-5 text-amber-500" />;
      case 'cloud':
      case 'cloudy':
      case 'clouds':
      case 'overcast':
        return <Cloud className="h-5 w-5 text-gray-500" />;
      case 'rain':
      case 'rainy':
      case 'drizzle':
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'snow':
      case 'snowy':
        return <CloudSnow className="h-5 w-5 text-blue-200" />;
      case 'storm':
      case 'thunder':
      case 'lightning':
        return <CloudLightning className="h-5 w-5 text-purple-500" />;
      default:
        return <Wind className="h-5 w-5 text-gray-400" />;
    }
  };
  
  return (
    <Card className="overflow-hidden border border-border">
      <CardHeader className="bg-muted/50 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mb-2">
              Day {dayNumber}
            </Badge>
            <CardTitle className="text-xl">{date}</CardTitle>
            <CardDescription>
              {activities.length} {activities.length === 1 ? "activity" : "activities"} planned
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            {weather && (
              <div className="flex items-center gap-2 bg-background/80 px-3 py-1.5 rounded-full">
                {getWeatherIcon(weather.icon)}
                <span className="text-sm font-medium">{weather.temperature}</span>
                <span className="text-xs text-muted-foreground">{weather.condition}</span>
              </div>
            )}
            <Button variant="ghost" size="icon">
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent className="pt-6">
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "relative pl-8 pb-6",
                  index !== activities.length - 1 && "border-l-2 border-border ml-3"
                )}
              >
                <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-travel-100 border-2 border-travel-600 z-10 flex items-center justify-center">
                  {activity.type === "attraction" && <Ticket className="h-3 w-3 text-travel-600" />}
                  {activity.type === "food" && <Utensils className="h-3 w-3 text-travel-600" />}
                  {activity.type === "accommodation" && <Hotel className="h-3 w-3 text-travel-600" />}
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <h4 className="text-lg font-medium flex items-center gap-2">
                      <Badge variant="outline" className="font-normal">
                        {activity.time}
                      </Badge>
                      {activity.title}
                    </h4>
                    
                    <div className="flex flex-wrap text-sm text-muted-foreground gap-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{activity.duration}</span>
                      </div>
                      {activity.price && (
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4" />
                          <span>{activity.price}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm">{activity.description}</p>
                  </div>
                  
                  {activity.image && (
                    <div className="md:w-1/4 shrink-0">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="rounded-md w-full h-24 md:h-32 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

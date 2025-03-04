
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ItineraryCardProps {
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  image: string;
  travelersCount: number;
  daysCount: number;
  onClick?: () => void;
}

export function ItineraryCard({
  title,
  destination,
  startDate,
  endDate,
  image,
  travelersCount,
  daysCount,
  onClick,
}: ItineraryCardProps) {
  return (
    <Card className="overflow-hidden h-full card-hover border border-border">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={destination} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <Badge className="absolute top-3 right-3 bg-travel-600">
          {daysCount} {daysCount === 1 ? 'Day' : 'Days'}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {destination}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>
              {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{travelersCount} {travelersCount === 1 ? 'person' : 'people'}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={onClick} className="w-full">View Itinerary</Button>
      </CardFooter>
    </Card>
  );
}


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/ui/section-heading";
import { ItineraryCard } from "@/components/trip/ItineraryCard";
import { PlusCircle, Search } from "lucide-react";

// Sample data
const sampleItineraries = [
  {
    id: 1,
    title: "Weekend in Paris",
    destination: "Paris, France",
    startDate: new Date("2023-06-15"),
    endDate: new Date("2023-06-18"),
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
    travelersCount: 2,
    daysCount: 3,
  },
  {
    id: 2,
    title: "Japanese Adventure",
    destination: "Tokyo, Japan",
    startDate: new Date("2023-07-10"),
    endDate: new Date("2023-07-20"),
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    travelersCount: 1,
    daysCount: 10,
  },
  {
    id: 3,
    title: "Greek Island Hopping",
    destination: "Greek Islands",
    startDate: new Date("2023-08-05"),
    endDate: new Date("2023-08-15"),
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    travelersCount: 4,
    daysCount: 10,
  },
];

export default function Itineraries() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const filteredItineraries = sampleItineraries.filter(
    (itinerary) =>
      itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itinerary.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <SectionHeading
          title="Your Travel Itineraries"
          description="Access all your saved travel plans in one place."
          align="left"
          className="mb-0"
        />
        
        <Button onClick={() => navigate("/planner")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </div>
      
      <div className="mb-8">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search your itineraries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {filteredItineraries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItineraries.map((itinerary) => (
            <ItineraryCard
              key={itinerary.id}
              title={itinerary.title}
              destination={itinerary.destination}
              startDate={itinerary.startDate}
              endDate={itinerary.endDate}
              image={itinerary.image}
              travelersCount={itinerary.travelersCount}
              daysCount={itinerary.daysCount}
              onClick={() => navigate("/itinerary")}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No itineraries found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm
              ? `No results for "${searchTerm}". Try a different search term.`
              : "You haven't created any travel plans yet."}
          </p>
          <Button onClick={() => navigate("/planner")}>Create Your First Itinerary</Button>
        </div>
      )}
    </div>
  );
}

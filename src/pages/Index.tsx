
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { DestinationCard } from "@/components/trip/DestinationCard";
import { Footer } from "@/components/layout/Footer";

const popularDestinations = [
  {
    id: 1,
    title: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "Experience the romance, cuisine, and iconic landmarks of the City of Lights."
  },
  {
    id: 2,
    title: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "Discover ancient temples, traditional tea houses, and serene bamboo forests."
  },
  {
    id: 3,
    title: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "Enjoy breathtaking views, pristine beaches, and iconic white-washed architecture."
  }
];

const features = [
  {
    title: "AI-Powered Itineraries",
    description: "Our advanced AI system crafts personalized travel plans based on your preferences and travel style.",
    icon: "✨",
  },
  {
    title: "Real-Time Updates",
    description: "Get the latest information on flights, accommodations, and local attractions for your trip.",
    icon: "🔄",
  },
  {
    title: "Local Recommendations",
    description: "Discover hidden gems and authentic experiences recommended by locals and seasoned travelers.",
    icon: "🗺️",
  }
];

export default function Index() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source 
              src="https://ik.imagekit.io/gpeng/travel-video.mp4" 
              type="video/mp4" 
            />
          </video>
        </div>
        
        <div className="container px-4 sm:px-6 relative z-10 mt-[-80px] animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Your perfect journey begins with a personalized plan
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Create tailored travel itineraries that match your preferences, budget, and dream destinations.
            </p>
            <div 
              className="relative inline-block"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                className={`absolute -inset-0.5 bg-gradient-to-r from-travel-400 to-travel-600 rounded-lg blur-md transition-all duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              ></div>
              <Link to="/planner">
                <Button 
                  size="lg" 
                  className="relative px-8 py-6 text-lg bg-travel-600 hover:bg-travel-700 hover:shadow-lg transition-all duration-300"
                >
                  Plan Your Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <SectionHeading
            title="Why Plan with Travelify"
            description="Our intelligent travel planner creates personalized itineraries based on your preferences and interests."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Destinations Section */}
      <section className="py-24">
        <div className="container px-4 sm:px-6">
          <SectionHeading
            title="Popular Destinations"
            description="Find inspiration for your next adventure with these trending destinations."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {popularDestinations.map((destination) => (
              <Link key={destination.id} to={`/planner?destination=${destination.title}`}>
                <DestinationCard
                  title={destination.title}
                  image={destination.image}
                  description={destination.description}
                />
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/planner">
              <Button variant="outline" size="lg" className="px-8">
                Explore More Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-travel-600">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to plan your dream vacation?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Start creating your personalized travel itinerary today.
            </p>
            <Link to="/planner">
              <Button 
                size="lg" 
                variant="secondary" 
                className="px-8 py-6 text-lg"
              >
                Create Your Itinerary
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

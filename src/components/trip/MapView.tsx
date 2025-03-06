
import { useState, useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Activity, ItineraryDay } from "@/types/trip";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

interface MapViewProps {
  itineraryDays: ItineraryDay[];
  destination: string;
}

// Define activity types and their marker colors
const activityColors = {
  attraction: "#4f46e5", // indigo
  food: "#e11d48",      // rose
  transport: "#0891b2", // cyan
  accommodation: "#059669", // emerald
};

// Define the default API key
const DEFAULT_API_KEY = "AIzaSyCQZtMBIfFbJ3p4pFRcuZFAAM-vHpZIJqQ";

export function MapView({ itineraryDays, destination }: MapViewProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Activity | null>(null);
  
  // Use the provided API key or fall back to localStorage value
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("googleMapsApiKey") || DEFAULT_API_KEY;
  });
  
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  
  const handleSaveApiKey = () => {
    if (!apiKey || apiKey.trim() === "") {
      setApiKeyError("API key cannot be empty");
      return;
    }
    
    // Basic validation - Google Maps API keys are typically 39 characters long
    if (apiKey.length < 30) {
      setApiKeyError("API key appears to be invalid");
      return;
    }
    
    localStorage.setItem("googleMapsApiKey", apiKey);
    setApiKeyError(null);
    window.location.reload();
  };
  
  // Extract all activities from all days
  const activities = useMemo(() => {
    return itineraryDays.flatMap(day => day.activities);
  }, [itineraryDays]);
  
  // Load the Google Maps JavaScript API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });
  
  // Default map options
  const mapOptions = useMemo(() => ({
    disableDefaultUI: false,
    clickableIcons: true,
    scrollwheel: true,
    mapTypeControl: false,
    fullscreenControl: true,
    streetViewControl: false,
  }), []);
  
  // Calculate the center position for the map based on activity coordinates
  const center = useMemo(() => {
    // Try to find first activity with coordinates
    const activityWithCoords = activities.find(activity => activity.coordinates);
    if (activityWithCoords?.coordinates) {
      return {
        lat: activityWithCoords.coordinates.lat,
        lng: activityWithCoords.coordinates.lng
      };
    }
    // Default to Taj Mahal, Agra
    return { lat: 27.1767, lng: 78.0081 };
  }, [activities]);
  
  // Handle map load
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);
  
  // Handle map unmount
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  
  if (apiKeyError || !apiKey) {
    return (
      <Card className="p-6">
        <CardContent className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">Google Maps API Key Required</h3>
          <p className="text-sm text-muted-foreground">
            Please enter your Google Maps API key to enable the map feature:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter Google Maps API Key"
              className={`flex h-10 w-full rounded-md border ${apiKeyError ? 'border-red-500' : 'border-input'} bg-background px-3 py-2 text-sm ring-offset-background`}
            />
            <button 
              onClick={handleSaveApiKey}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
            >
              Save Key
            </button>
          </div>
          {apiKeyError && (
            <p className="text-xs text-red-500">
              {apiKeyError}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            You can get an API key from the{" "}
            <a
              href="https://console.cloud.google.com/google/maps-apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Cloud Console
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }
  
  if (loadError) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-medium text-red-500">Error loading Google Maps</h3>
        <p className="text-sm text-muted-foreground mt-2">
          There was an error loading the map. Please check your API key.
        </p>
        <button 
          onClick={() => {
            localStorage.removeItem("googleMapsApiKey");
            window.location.reload();
          }}
          className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
        >
          Reset API Key
        </button>
      </div>
    );
  }
  
  if (!isLoaded) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-medium">Loading map...</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Please wait while we load the Google Maps API.
        </p>
      </div>
    );
  }
  
  // Get icon URL based on activity type
  const getMarkerIcon = (type: string) => {
    const color = activityColors[type as keyof typeof activityColors] || "#6b7280";
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#ffffff",
      scale: 8,
    };
  };
  
  return (
    <div className="w-full h-[70vh] relative rounded-lg overflow-hidden bg-muted">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {activities.map((activity) => (
          <Marker
            key={activity.id}
            position={activity.coordinates || center}
            title={activity.title}
            icon={getMarkerIcon(activity.type)}
            onClick={() => setSelectedMarker(activity)}
          />
        ))}
        
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.coordinates || center}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 max-w-xs">
              <h4 className="font-medium text-sm">{selectedMarker.title}</h4>
              <p className="text-xs flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {selectedMarker.location}
              </p>
              <p className="text-xs mt-1">{selectedMarker.description}</p>
            </div>
          </InfoWindow>
        )}
        
        {/* Add a destination marker */}
        <Marker
          position={center}
          title={destination}
          icon={{
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            fillColor: "#ef4444",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
            scale: 6,
          }}
        />
      </GoogleMap>
      
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-2 rounded-md text-xs">
        <p className="flex items-center">
          <Navigation className="h-3 w-3 mr-1 text-primary" />
          {destination}
        </p>
      </div>
    </div>
  );
}

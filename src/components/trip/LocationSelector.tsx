
import { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from "@react-google-maps/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, XCircle } from "lucide-react";

interface LocationSelectorProps {
  value: string;
  onChange: (value: string, coordinates?: { lat: number; lng: number }) => void;
  placeholder: string;
  type: "departure" | "destination";
}

// Default API key
const DEFAULT_API_KEY = "AIzaSyCQZtMBIfFbJ3p4pFRcuZFAAM-vHpZIJqQ";

export function LocationSelector({ value, onChange, placeholder, type }: LocationSelectorProps) {
  const [apiKey] = useState(() => localStorage.getItem("googleMapsApiKey") || DEFAULT_API_KEY);
  const [mapVisible, setMapVisible] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string>(value);
  
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });
  
  // Default position for the map
  const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India
  const center = coordinates || defaultCenter;
  
  // Map options
  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
  };
  
  // Handle location selection from map
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    const newCoords = {
      lat: e.latLng?.lat() || 0,
      lng: e.latLng?.lng() || 0,
    };
    
    setCoordinates(newCoords);
    
    // Perform reverse geocoding to get place name
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: newCoords }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const placeName = results[0].formatted_address;
        setSelectedPlace(placeName);
        onChange(placeName, newCoords);
      }
    });
  }, [onChange]);
  
  // Handle autocomplete selection
  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const newCoords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        
        setCoordinates(newCoords);
        if (place.formatted_address) {
          setSelectedPlace(place.formatted_address);
          onChange(place.formatted_address, newCoords);
        } else if (place.name) {
          setSelectedPlace(place.name);
          onChange(place.name, newCoords);
        }
        
        setMapVisible(true);
      }
    }
  }, [onChange]);
  
  // Load coordinates for existing value using geocoding
  useEffect(() => {
    if (isLoaded && value && !coordinates) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: value }, (results, status) => {
        if (status === "OK" && results && results[0] && results[0].geometry) {
          const location = results[0].geometry.location;
          setCoordinates({
            lat: location.lat(),
            lng: location.lng(),
          });
        }
      });
    }
  }, [isLoaded, value, coordinates]);
  
  const onAutocompleteLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };
  
  // Directly set input value without triggering map lookup
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedPlace(newValue);
    if (newValue === "") {
      setMapVisible(false);
      setCoordinates(null);
      onChange("", undefined);
    } else {
      onChange(newValue, coordinates || undefined);
    }
  };
  
  const toggleMap = () => {
    setMapVisible(!mapVisible);
  };
  
  const clearLocation = () => {
    setSelectedPlace("");
    setCoordinates(null);
    setMapVisible(false);
    onChange("", undefined);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  if (loadError) {
    return (
      <div className="space-y-2">
        <Input 
          value={value}
          onChange={(e) => onChange(e.target.value, undefined)}
          placeholder={placeholder}
          className={`text-lg py-6 pl-10`}
        />
        <p className="text-xs text-red-500">
          Failed to load Google Maps. Using text input instead.
        </p>
      </div>
    );
  }
  
  if (!isLoaded) {
    return (
      <div className="space-y-2">
        <div className="relative">
          {type === "departure" ? (
            <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          ) : (
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          )}
          <Input 
            value={value}
            onChange={(e) => onChange(e.target.value, undefined)}
            placeholder={placeholder}
            className={`text-lg py-6 pl-10`}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <div className="relative">
        {type === "departure" ? (
          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        ) : (
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        )}
        
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <Input 
            ref={inputRef}
            value={selectedPlace}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`text-lg py-6 pl-10 ${selectedPlace ? 'pr-20' : ''}`}
          />
        </Autocomplete>
        
        {selectedPlace && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <button
              type="button"
              onClick={clearLocation}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear location"
            >
              <XCircle className="h-5 w-5" />
            </button>
            <button
              type="button" 
              onClick={toggleMap}
              className="text-xs bg-muted hover:bg-muted/80 px-2 py-1 rounded"
            >
              {mapVisible ? "Hide Map" : "Show Map"}
            </button>
          </div>
        )}
      </div>
      
      {mapVisible && (
        <Card className="mt-2">
          <CardContent className="p-2">
            <div className="h-[200px] w-full rounded overflow-hidden">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={center}
                zoom={coordinates ? 12 : 5}
                options={mapOptions}
                onClick={handleMapClick}
              >
                {coordinates && (
                  <Marker
                    position={coordinates}
                    title={selectedPlace}
                    icon={{
                      path: google.maps.SymbolPath.CIRCLE,
                      fillColor: type === "departure" ? "#3b82f6" : "#ef4444",
                      fillOpacity: 1,
                      strokeWeight: 1,
                      strokeColor: "#ffffff",
                      scale: 8,
                    }}
                  />
                )}
              </GoogleMap>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Click on the map to select a location or search using the input field.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

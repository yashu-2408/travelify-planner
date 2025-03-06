
import { useState, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
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
  const [selectedPlace, setSelectedPlace] = useState<string>(value);
  
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });
  
  // Handle autocomplete selection
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const newCoords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        
        if (place.formatted_address) {
          setSelectedPlace(place.formatted_address);
          onChange(place.formatted_address, newCoords);
        } else if (place.name) {
          setSelectedPlace(place.name);
          onChange(place.name, newCoords);
        }
      }
    }
  };
  
  const onAutocompleteLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };
  
  // Directly set input value without triggering map lookup
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedPlace(newValue);
    if (newValue === "") {
      onChange("", undefined);
    } else {
      onChange(newValue, undefined);
    }
  };
  
  const clearLocation = () => {
    setSelectedPlace("");
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
            className={`text-lg py-6 pl-10 ${selectedPlace ? 'pr-12' : ''}`}
          />
        </Autocomplete>
        
        {selectedPlace && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={clearLocation}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear location"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      
      {selectedPlace && (
        <p className="text-xs text-muted-foreground">
          Location selected: {selectedPlace}
        </p>
      )}
    </div>
  );
}

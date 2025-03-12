
import { useState, useRef, useEffect } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, XCircle, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LocationSelectorProps {
  value: string;
  onChange: (value: string, coordinates?: { lat: number; lng: number }) => void;
  placeholder: string;
  type: "departure" | "destination";
}

// Libraries as a constant to avoid reloading
const LIBRARIES: ("places")[] = ["places"];

export function LocationSelector({ value, onChange, placeholder, type }: LocationSelectorProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<string>(value);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);
  const { toast } = useToast();
  
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  useEffect(() => {
    // Get API key from localStorage or use a valid key
    const storedKey = localStorage.getItem("googleMapsApiKey");
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      // If no key is set in localStorage, prompt user to add one
      setUsingFallback(true);
    }
  }, []);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });
  
  useEffect(() => {
    if (loadError) {
      setUsingFallback(true);
      // Only show toast once
      if (!localStorage.getItem("mapsErrorShown")) {
        toast({
          title: "Google Maps could not be loaded",
          description: "Using text input instead. Please check your API key in settings.",
          variant: "destructive",
        });
        localStorage.setItem("mapsErrorShown", "true");
      }
    }
  }, [loadError, toast]);
  
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
    onChange(newValue, undefined);
  };
  
  const clearLocation = () => {
    setSelectedPlace("");
    onChange("", undefined);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Fallback input when Maps API fails to load
  const renderFallbackInput = () => {
    return (
      <div className="relative">
        {type === "departure" ? (
          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        ) : (
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        )}
        
        <Input 
          ref={inputRef}
          value={selectedPlace}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`text-lg py-6 pl-10 ${selectedPlace ? 'pr-12' : ''}`}
        />
        
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
    );
  };
  
  // If API isn't loaded or there's an error, use the fallback
  if (!isLoaded || loadError || usingFallback) {
    return (
      <div className="space-y-2">
        {renderFallbackInput()}
        {loadError && (
          <p className="text-xs text-amber-600">
            Maps API couldn't be loaded. Enter your location manually.
          </p>
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <div className="relative">
        {type === "departure" ? (
          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
        ) : (
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
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
          Location: {selectedPlace}
        </p>
      )}
    </div>
  );
}

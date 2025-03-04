
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function ApiKeySettings() {
  const [apiKey, setApiKey] = useState<string>("");
  const [isValidKey, setIsValidKey] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedKey = localStorage.getItem("geminiApiKey");
    if (storedKey) {
      setApiKey(storedKey);
      setIsValidKey(true);
    }
  }, []);

  const validateApiKey = async (key: string) => {
    setIsChecking(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Hello, are you working? Please respond with 'yes' if you are.",
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 10,
          }
        }),
      });

      if (response.ok) {
        setIsValidKey(true);
        localStorage.setItem("geminiApiKey", key);
        toast({
          title: "API Key Validated",
          description: "Your Gemini API key has been saved successfully.",
        });
      } else {
        setIsValidKey(false);
        toast({
          title: "Invalid API Key",
          description: "The provided API key is not valid. Please check and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsValidKey(false);
      toast({
        title: "Validation Error",
        description: "Could not validate the API key. Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      validateApiKey(apiKey.trim());
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter a Gemini API key.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full border border-border">
      <CardHeader>
        <CardTitle>Gemini API Settings</CardTitle>
        <CardDescription>
          Add your Gemini API key to enable AI-powered itinerary generation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">Gemini API Key</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Get your API key from{" "}
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer"
              className="underline text-travel-600 hover:text-travel-700"
            >
              Google AI Studio
            </a>
          </p>
        </div>

        {isValidKey !== null && (
          <div className={`flex items-center gap-2 text-sm ${isValidKey ? 'text-green-600' : 'text-red-600'}`}>
            {isValidKey ? (
              <>
                <Check className="h-4 w-4" />
                <span>API key is valid and ready to use</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4" />
                <span>Invalid API key. Please check and try again.</span>
              </>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveKey} 
          disabled={isChecking}
          className="w-full"
        >
          {isChecking ? "Validating..." : "Save API Key"}
        </Button>
      </CardFooter>
    </Card>
  );
}

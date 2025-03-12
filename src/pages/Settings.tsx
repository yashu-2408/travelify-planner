
import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className="container px-6 py-12">
      <SectionHeading
        title="Settings"
        description="Configure your application settings and API keys."
      />
      
      <div className="mt-12 max-w-3xl mx-auto">
        <Tabs defaultValue="api-keys">
          <TabsList className="mb-6">
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api-keys" className="space-y-6">
            <div className="grid gap-6">
              <ApiKeySettings />
            </div>
          </TabsContent>
          
          <TabsContent value="preferences">
            <div className="grid gap-6">
              <p className="text-muted-foreground">Preferences settings will be added soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

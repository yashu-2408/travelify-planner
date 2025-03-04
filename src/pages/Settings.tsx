
import { SectionHeading } from "@/components/ui/section-heading";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";

export default function Settings() {
  return (
    <div className="container px-6 py-12">
      <SectionHeading
        title="Settings"
        description="Configure your travel planner settings and API keys."
      />
      
      <div className="mt-12 max-w-3xl mx-auto">
        <ApiKeySettings />
      </div>
    </div>
  );
}


import { SectionHeading } from "@/components/ui/section-heading";
import { TripPlannerForm } from "@/components/trip/TripPlannerForm";

export default function Planner() {
  return (
    <div className="container px-6 py-12">
      <SectionHeading
        title="Plan Your Perfect Trip"
        description="Tell us about your preferences and we'll create a personalized travel itinerary just for you."
      />
      
      <div className="mt-12">
        <TripPlannerForm />
      </div>
    </div>
  );
}

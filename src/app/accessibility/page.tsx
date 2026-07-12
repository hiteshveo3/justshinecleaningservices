import { LegalPageView } from "@/components/legal-page";
import { getLegalPage } from "@/lib/legal-pages";

const page = getLegalPage("accessibility")!;

export const metadata = {
  title: "Accessibility Policy - Just Shine Cleaning Services",
  description: "Website and service accessibility commitments for Just Shine Cleaning Services customers.",
};

export default function AccessibilityPage() {
  return <LegalPageView page={page} />;
}

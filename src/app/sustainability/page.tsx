import { LegalPageView } from "@/components/legal-page";
import { getLegalPage } from "@/lib/legal-pages";

const page = getLegalPage("sustainability")!;

export const metadata = {
  title: "Sustainability Policy - Just Shine Cleaning Services",
  description: "Eco-friendly cleaning practices and sustainability commitments.",
};

export default function SustainabilityPage() {
  return <LegalPageView page={page} />;
}

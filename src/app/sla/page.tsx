import { LegalPageView } from "@/components/legal-page";
import { getLegalPage } from "@/lib/legal-pages";

const page = getLegalPage("sla")!;

export const metadata = {
  title: "Service Level Agreement - Just Shine Cleaning Services",
  description: "Service standards, response times, and quality commitments for Just Shine Cleaning Services.",
};

export default function SlaPage() {
  return <LegalPageView page={page} />;
}

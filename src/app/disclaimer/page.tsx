import { LegalPageView } from "@/components/legal-page";
import { getLegalPage } from "@/lib/legal-pages";

const page = getLegalPage("disclaimer")!;

export const metadata = {
  title: "Website Disclaimer - Just Shine Cleaning Services",
  description: "Website information, service availability, and liability disclaimer.",
};

export default function DisclaimerPage() {
  return <LegalPageView page={page} />;
}

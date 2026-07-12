import { LegalPageView } from "@/components/legal-page";
import { getLegalPage } from "@/lib/legal-pages";

const page = getLegalPage("terms")!;

export const metadata = {
  title: "Terms & Conditions - Just Shine Cleaning Services Abu Dhabi",
  description: "Read Just Shine Cleaning Services' terms and conditions for professional cleaning services in Abu Dhabi.",
};

export default function TermsPage() {
  return <LegalPageView page={page} />;
}

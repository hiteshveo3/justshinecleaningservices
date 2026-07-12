import { LegalPageView } from "@/components/legal-page";
import { getLegalPage } from "@/lib/legal-pages";

const page = getLegalPage("anti-discrimination")!;

export const metadata = {
  title: "Anti-Discrimination Policy - Just Shine Cleaning Services",
  description: "Equal service and respectful conduct policy for Just Shine Cleaning Services.",
};

export default function AntiDiscriminationPage() {
  return <LegalPageView page={page} />;
}

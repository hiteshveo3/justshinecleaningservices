import { LegalPageView } from "@/components/legal-page";
import { getLegalPage } from "@/lib/legal-pages";

const page = getLegalPage("cookie-policy")!;

export const metadata = {
  title: "Cookie Policy - Just Shine Cleaning Services",
  description: "How cookies and tracking technologies may be used on the Just Shine Cleaning Services website.",
};

export default function CookiePolicyPage() {
  return <LegalPageView page={page} />;
}

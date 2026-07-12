import { LegalPageView } from "@/components/legal-page";
import { getLegalPage } from "@/lib/legal-pages";

const page = getLegalPage("refund-policy")!;

export const metadata = {
  title: "Refund Policy - Just Shine Cleaning Services Abu Dhabi",
  description: "Refund and satisfaction guarantee policy for Just Shine Cleaning Services.",
};

export default function RefundPolicyPage() {
  return <LegalPageView page={page} />;
}

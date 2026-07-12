import { LegalPageView } from "@/components/legal-page";
import { getLegalPage } from "@/lib/legal-pages";

const page = getLegalPage("privacy")!;

export const metadata = {
  title: "Privacy Policy - Just Shine Cleaning Services Abu Dhabi",
  description: "Learn how Just Shine Cleaning Services protects your personal information and privacy.",
};

export default function PrivacyPage() {
  return <LegalPageView page={page} />;
}

// app/page.tsx
import LandingPage from "@/components/landing/LandingPage";

export const metadata = {
  title: "Corvusion | Internal LPG Management Platform",
  description:
    "Modern internal platform for LPG 3 Kg agents. Manage invoices, reports, and operational workflows efficiently.",
};

export default function Page() {
  return <LandingPage />;
}

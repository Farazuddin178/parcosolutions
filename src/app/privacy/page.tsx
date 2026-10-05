import type { Metadata } from "next";
import { WpDocument } from "@/components/WpDocument";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy/" } };

export default function PrivacyPage() {
  return <WpDocument slug="privacy" label="Privacy" />;
}

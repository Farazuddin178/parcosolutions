import type { Metadata } from "next";
import { WpDocument } from "@/components/WpDocument";

export const metadata: Metadata = { title: "Terms and Conditions", alternates: { canonical: "/terms/" } };

export default function TermsPage() {
  return <WpDocument slug="terms" label="Terms" />;
}

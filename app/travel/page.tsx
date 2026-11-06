import type { Metadata } from "next";
import TravelView from "./travel-view";

export const metadata: Metadata = {
  title: "Travel & Exchanges — Howard Cheng",
  description:
    "Explore Howard Cheng's global travel history, academic exchanges, industry delegations, and study abroad programs across East Asia and North America.",
  openGraph: {
    title: "Travel & Exchanges — Howard Cheng",
    description:
      "Explore Howard Cheng's global travel history, academic exchanges, industry delegations, and study abroad programs across East Asia and North America.",
    type: "website",
  },
};

export default function TravelPage() {
  return <TravelView />;
}

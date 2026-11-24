import type { Metadata } from "next";
import HomePage from "./home/page";
import AboutPage from "./about/page";
import ProjectsPage from "./projects/page";
import ArtPortfolioPage from "./art-portfolio/page";
import TravelPage from "./travel/page";
import ContactPage from "./contact/page";
import { Footer } from "./components/site";

export const metadata: Metadata = {
  title: "Howard Cheng — Software/Web Developer",
  description:
    "Portfolio, software engineering projects, art, travel, and background of Howard Cheng.",
};

export default function Page() {
  return (
    <main className="single-page">
      <HomePage showHeader={true} showFooter={false} showBio={false} />
      <AboutPage showHeader={false} showFooter={false} />
      <ProjectsPage showHeader={false} showFooter={false} />
      <ArtPortfolioPage showHeader={false} showFooter={false} />
      <TravelPage showHeader={false} showFooter={false} />
      <ContactPage showHeader={false} showFooter={false} />
      <Footer standalone={false} />
    </main>
  );
}

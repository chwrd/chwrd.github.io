import type { Metadata } from "next";
import { Footer, Header, PageHeader } from "../components/site";
import PortfolioCarousel, { type PhotoCard } from "./portfolio-carousel";

export const metadata: Metadata = {
  title: "Art Portfolio — Howard Cheng",
  description:
    "Photography portfolio featuring scenes from Jiangsu (2025).",
};

const portfolioPhotos: PhotoCard[] = [
  {
    id: "photo-1",
    radioId: "radio-1",
    prevRadioId: "radio-9",
    nextRadioId: "radio-2",
    num: "1/9",
    title: "Suzhou Museum",
    description:
      "Modernist geometric pavilions and whitewashed walls mirrored across tranquil reflection pools, honoring classical Jiangnan aesthetics.",
    src: "/art-portfolio/Jiangsu%202025/DSC08987.jpg",
    alt: "Suzhou Museum modern geometric architecture and reflection pool",
    angle: "2.5deg",
  },
  {
    id: "photo-2",
    radioId: "radio-2",
    prevRadioId: "radio-1",
    nextRadioId: "radio-3",
    num: "2/9",
    title: "Butterfly Reverie",
    description:
      "Traditional floral headdress and sheer embroidery framed within an antique carved wooden window.",
    src: "/art-portfolio/Jiangsu%202025/DSC09013.jpg",
    alt: "Woman in traditional Chinese attire holding butterfly fan in wooden window",
    angle: "-3.5deg",
  },
  {
    id: "photo-3",
    radioId: "radio-3",
    prevRadioId: "radio-2",
    nextRadioId: "radio-4",
    num: "3/9",
    title: "Pingjiang Road Guardian",
    description:
      "A moment of everyday rest beneath an ancient stone guardian lion along the historic canal streets.",
    src: "/art-portfolio/Jiangsu%202025/DSC09115.jpg",
    alt: "Stone guardian lion statue on street with man resting at the base",
    angle: "3deg",
  },
  {
    id: "photo-4",
    radioId: "radio-4",
    prevRadioId: "radio-3",
    nextRadioId: "radio-5",
    num: "4/9",
    title: "Canal Waterway",
    description:
      "Lantern-draped bridges and whitewashed riverfront residences reflected along the canal waterways.",
    src: "/art-portfolio/Jiangsu%202025/DSC09137.jpg",
    alt: "Canal waterway lined with stone bridges and traditional houses",
    angle: "-4deg",
  },
  {
    id: "photo-5",
    radioId: "radio-5",
    prevRadioId: "radio-4",
    nextRadioId: "radio-6",
    num: "5/9",
    title: "Embroidered Elegance",
    description:
      "Sunlit portrait in a classic embroidered black qipao and pearls beside the historic stone embankment.",
    src: "/art-portfolio/Jiangsu%202025/DSC09145.jpg",
    alt: "Woman in black embroidered qipao seated by the canal",
    angle: "3.5deg",
  },
  {
    id: "photo-6",
    radioId: "radio-6",
    prevRadioId: "radio-5",
    nextRadioId: "radio-7",
    num: "6/9",
    title: "Street Companions",
    description:
      "Curious feline companions and a woven basket basking in the afternoon light of a quiet storefront.",
    src: "/art-portfolio/Jiangsu%202025/DSC09155.jpg",
    alt: "Fluffy cats resting by a woven basket on cobblestone pavement",
    angle: "-3deg",
  },
  {
    id: "photo-7",
    radioId: "radio-7",
    prevRadioId: "radio-6",
    nextRadioId: "radio-8",
    num: "7/9",
    title: "City Rhythms",
    description:
      "A lively gathering of friends and passersby sheltered under the canopy of mature plane trees.",
    src: "/art-portfolio/Jiangsu%202025/DSC09167.jpg",
    alt: "Street crowd at crosswalk under leafy plane trees",
    angle: "4deg",
  },
  {
    id: "photo-8",
    radioId: "radio-8",
    prevRadioId: "radio-7",
    nextRadioId: "radio-9",
    num: "8/9",
    title: "The Photographer",
    description:
      "A bright candid moment framed by verdant garden leaves and a traditional wooden tour boat.",
    src: "/art-portfolio/Jiangsu%202025/DSC09263.jpg",
    alt: "Photographer with camera smiling beside canal tour boat",
    angle: "-3.5deg",
  },
  {
    id: "photo-9",
    radioId: "radio-9",
    prevRadioId: "radio-8",
    nextRadioId: "radio-1",
    num: "9/9",
    title: "Afternoon Repose",
    description:
      "A peaceful outdoor breather accompanied by a loyal Shiba Inu companion on a warm day.",
    src: "/art-portfolio/Jiangsu%202025/DSC09313.jpg",
    alt: "Woman in lawn chair relaxing beside a Shiba Inu dog",
    angle: "2.5deg",
  },
];

export default function ArtPortfolioPage() {
  return (
    <main>
      <section className="work-section page-section art-portfolio-section">
        <Header />
        <div className="page-inner work-inner">
          <PageHeader
            eyebrow="📷 Visual Journey"
            title="My Art Portfolio"
            description="A curated photographic series featuring nature, urban lanscape and portraits."
            stats={[
              { icon: "🎞️", value: portfolioPhotos.length, label: "Photographs" },
              { icon: "📍", value: 2, label: "Suzhou, Wuxi" },
              { icon: "🗓️", value: "2026", label: "Jiangsu Series" },
            ]}
          />

          <PortfolioCarousel photos={portfolioPhotos} />
        </div>
      </section>
      <Footer standalone={false} />
    </main>
  );
}

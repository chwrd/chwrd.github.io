import Image from "next/image";
import { Footer, Header } from "../components/site";

const projects = [
  {
    title: "VendorLink",
    description:
      "A platform connecting vendors and customers through a streamlined marketplace experience.",
    image: "/vendorlink-screenshot.png",
    imageAlt: "VendorLink marketplace interface screenshot",
    url: "https://vendorlink.vercel.app/",
  },
  {
    title: "SoloGo",
    description:
      "AI-powered travel assistant that empowers solo adventurers to explore the world",
    image: "/sologo.png",
    imageAlt: "SoloGo travel assistant logo",
    url: "https://sologo-uwbhacks.vercel.app/",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <section className="work-section page-section">
        <Header />
        <div className="work-inner">
          <h2>My Recent Work</h2>
          <div className="project-list">
            {projects.map((project) => (
              <a
                className="project-card"
                href={project.url}
                key={project.title}
                rel="noreferrer"
                target="_blank"
              >
                <div className="project-copy">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="project-link">Explore</span>
                </div>
                <div className="project-image">
                  <Image src={project.image} alt={project.imageAlt} fill sizes="342px" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer standalone={false} />
    </main>
  );
}

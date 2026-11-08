import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header, PageHeader } from "../components/site";

export const metadata: Metadata = {
  title: "Projects — Howard Cheng",
  description:
    "Explore software engineering projects, web applications, and technical innovations by Howard Cheng.",
};

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
        <div className="page-inner work-inner">
          <PageHeader
            eyebrow="💻 Portfolio &amp; Works"
            title="Featured Projects"
            description="Full-stack web applications, production systems designed to streamline user experiences and solve practical challenges."
            stats={[
              { icon: "🚀", value: projects.length, label: "Featured Projects" },
              { icon: "⚡", value: "Full-Stack", label: "Next.js & AI" },
              { icon: "🌐", value: "Live", label: "Deployed Apps" },
              { icon: "💻", value: "Open", label: "Source Code" },
            ]}
          />

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

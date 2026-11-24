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
    title: "HowCard",
    description:
      "Offline-first credit card benefits tracker, transfer partner bonus optimizer, and policy change directory.",
    image: "/howcard-screenshot.png",
    imageAlt: "HowCard credit card benefits and spend optimizer interface screenshot",
    url: "https://howcard.vercel.app/",
    githubUrl: "https://github.com/chwrd/card_tracker",
  },
  {
    title: "VendorLink",
    description:
      "A platform connecting vendors and customers through a streamlined marketplace experience.",
    image: "/vendorlink-screenshot.png",
    imageAlt: "VendorLink marketplace interface screenshot",
    url: "https://vendorlink.vercel.app/",
    githubUrl: "https://github.com/chwrd/LaunchPad-VendorLink",
  },
  {
    title: "SoloGo",
    description:
      "AI-powered travel assistant that empowers solo adventurers to explore the world",
    image: "/sologo.png",
    imageAlt: "SoloGo travel assistant logo",
    url: "https://sologo-uwbhacks.vercel.app/",
    githubUrl: "https://github.com/chwrd/UWB-Hacks-2025",
  },
];

interface ProjectsPageProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function ProjectsPage({
  showHeader = true,
  showFooter = true,
}: ProjectsPageProps = {}) {
  return (
    <div id="projects">
      <section className="work-section page-section">
        {showHeader && <Header />}
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
              <div className="project-card" key={project.title}>
                <div className="project-copy">
                  <h3>
                    <a
                      href={project.url}
                      rel="noreferrer"
                      target="_blank"
                      className="transition hover:opacity-75"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <p>{project.description}</p>
                  <div className="project-links">
                    <a
                      className="project-link"
                      href={project.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span>Explore</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      className="project-link"
                      href={project.githubUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <svg
                        className="size-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>GitHub</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
                <a
                  className="project-image block transition hover:opacity-95"
                  href={project.url}
                  rel="noreferrer"
                  target="_blank"
                  aria-label={`${project.title} live interface`}
                >
                  <Image src={project.image} alt={project.imageAlt} fill sizes="342px" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showFooter && <Footer standalone={false} />}
    </div>
  );
}

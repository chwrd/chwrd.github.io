import type { Metadata } from "next";
import { Footer, Header, PageHeader } from "../components/site";

export const metadata: Metadata = {
  title: "Connect — Howard Cheng",
  description:
    "Get in touch with Howard Cheng regarding software engineering, project collaborations, and professional opportunities.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="contact-section page-section">
        <Header />
        <div className="page-inner contact-inner">
          <PageHeader
            eyebrow="📫 Get In Touch"
            title="Let's Connect"
            description="Find me online or reach out directly."
            stats={[
              { icon: "💼", value: "Open", label: "Opportunity" },
              { icon: "🌐", value: "Global", label: "Open to Relocate" },
              { icon: "📍", value: "Seattle, WA", label: "" }
            ]}
          />

          <div className="contact-links">
            <a
              href="https://www.linkedin.com/in/howard-ch"
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
              <small>www.linkedin.com/in/howard-ch</small>
              <strong>↗</strong>
            </a>
            <a
              href="https://github.com/chwrd"
              target="_blank"
              rel="noreferrer"
            >
              <span>GitHub</span>
              <small>github.com/chwrd</small>
              <strong>↗</strong>
            </a>
          </div>
        </div>
      </section>
      <Footer standalone={false} />
    </main>
  );
}

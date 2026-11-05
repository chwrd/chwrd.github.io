import { Footer, Header } from "../components/site";

export default function ContactPage() {
  return (
    <main>
      <section className="contact-section page-section">
        <Header />
        <div className="contact-inner">
          <div className="contact-heading">
            <span className="eyebrow">Let&apos;s connect</span>
            <p>
              Find me online or reach out about
              a project, collaboration, or opportunity.
            </p>
          </div>
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

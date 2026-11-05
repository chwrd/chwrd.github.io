import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "./components/site";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <Header />
        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">👋 Hello</span>
            <h1>Howard Cheng</h1>
            <p className="hero-summary">
              Software/Web Developer · University of Washington
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/projects">
                Projects
              </Link>
              <Link className="button button-outline" href="/contact">
                Connect
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <Image
              src="/illustrated-portrait.png"
              alt="Illustrated portrait"
              fill
              priority
              sizes="300px"
            />
          </div>
        </div>
      </section>
      <section className="about-section">
        <div className="about-inner">
          <div className="about-copy">
            <section className="about-bio">
              <h2>About Howard</h2>
              <p>
                I&apos;m a Computer Science student at the University of
                Washington. I recently participated in an exchange program at
                The Chinese University of Hong Kong (2025–2026) and earned
                recognition as a Gilman Scholar (2025).
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer standalone={false} />
    </main>
  );
}

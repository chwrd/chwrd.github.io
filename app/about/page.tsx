import { Footer, Header } from "../components/site";

export default function AboutPage() {
  return (
    <main>
      <section className="about-section page-section">
        <Header />
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
            <div className="about-details">
              <section className="about-subsection">
                <h3>Education</h3>
                <ul className="timeline">
                  <li>
                    <strong>University of Washington</strong>
                    <span>Computer Science, Business Minor · September 2024 – June 2028</span>
                    <span>
                      GPA 3.5 · Expected Graduation: June 2028
                    </span>
                    <span>
                      Relevant coursework: Object-Oriented Java Programming,
                      Data Structures &amp; Algorithms, Software Engineering,
                      Cloud Computing, IT, Business, Tech Consulting,
                      Cybersecurity
                    </span>
                  </li>
                  <li>
                    <strong>The Chinese University of Hong Kong</strong>
                    <span>Exchange Student · 2025 – 2026</span>
                  </li>
                  <li>
                    <strong>Seattle Central College</strong>
                    <span>September 2022 – May 2024</span>
                  </li>
                  <li>
                    <strong>Garfield High School</strong>
                    <span>September 2020 – June 2024</span>
                  </li>
                </ul>
              </section>
              <section className="about-subsection">
                <h3>Study Abroad</h3>
                <p>
                  <strong>Chinese University of Hong Kong Exchange</strong>
                  <br />
                  Hong Kong · 2025 – 2026
                </p>
                <p>
                  <strong>Smart Cities South Korea</strong>
                  <br />
                  Seoul, Busan · Summer 2025
                </p>
                <p>
                  <strong>CIEE Japanese Language and Culture Kyoto</strong>
                  <br />
                  Kyoto · June – August 2023
                </p>
              </section>
              <section className="about-subsection">
                <h3>Honors &amp; Awards</h3>
                <ul className="honors-list">
                  <li>Gilman Scholar (CUHK Exchange) · 2025</li>
                  <li>Washington State Opportunity Scholarship · 2024</li>
                  <li>Boeing STEM Signing Day Honoree · 2024</li>
                </ul>
              </section>
              <section className="about-subsection">
                <h3>Languages</h3>
                <p>
                  English (Native or Bilingual) · Japanese (Elementary) ·
                  Chinese (Limited Working)
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Footer standalone={false} />
    </main>
  );
}

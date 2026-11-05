import { Footer, Header } from "../components/site";

export default function ArtPortfolioPage() {
  return (
    <main>
      <section className="work-section page-section">
        <Header />
        <div className="work-inner">
          <h2>My Art Portfolio</h2>
          <p className="coming-soon">Coming Soon</p>
        </div>
      </section>
      <Footer standalone={false} />
    </main>
  );
}

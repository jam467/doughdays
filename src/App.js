import React from "react";
import "./App.css";
import heroImage from "./images/RAW-140-Edit_IsabellaWild.jpg";
import stockistsPdf from "./images/CateringMenu25.pdf";

const introCopy =
  "The first ever Dough Days cookie was baked at the centre of our universe, Cut Lunch Deli in Clovelly. It sells out every day, never leaves our menu and has now entered its shelf life as ready-to-bake cookie dough scoops with the same chewy insides and perfectly crispy shell.";

const wholesalePoints = [
  "Built for cafes, delis and hospitality partners who want an easy premium sweet offering.",
  "Consistent portions and straightforward prep keep service fast and product quality stable.",
  "Flexible enough for counter display, retail freezers or venue-specific bundles."
];

const wholesaleEmail = "cutlunchdeli@gmail.com";
const wholesaleMailTo = `mailto:${wholesaleEmail}?subject=Dough%20Days%20Wholesale%20Enquiry`;

function getCurrentPage() {
  return window.location.hash === "#/wholesale" ? "wholesale" : "home";
}

function SiteNav() {
  return (
    <nav className="dd-nav" aria-label="Primary">
      <a href="#/">Home</a>
      <a href={stockistsPdf} target="_blank" rel="noreferrer">
        Stockists
      </a>
      <a href="#/wholesale">Wholesale</a>
    </nav>
  );
}

function HomePage() {
  return (
    <header className="dd-hero" id="home">
      <SiteNav />

      <div className="dd-hero-stage">
        <figure className="dd-hero-figure">
          <img src={heroImage} alt="Dough Days cookie dough product hero" />
        </figure>

        <div className="dd-hero-copy">
          <p>{introCopy}</p>
        </div>
      </div>
    </header>
  );
}

function WholesalePage() {
  return (
    <div className="dd-page dd-page-wholesale">
      <SiteNav />

      <main className="dd-page-main">
        <section className="dd-section dd-section-orange dd-section-wholesale-page" id="wholesale">
          <div className="dd-section-heading">
            <span className="dd-eyebrow">Hospitality</span>
            <h2>Wholesale Enquiries</h2>
            <p>
              For venues that want a low-friction sweet item with high payoff, Dough Days keeps the
              prep simple without flattening the personality of the product.
            </p>
            <a className="dd-cta dd-cta-dark" href={wholesaleMailTo}>
              Email Wholesale Enquiry
            </a>
          </div>

          <div className="dd-card-grid">
            {wholesalePoints.map((point) => (
              <article className="dd-card dd-card-dark" key={point}>
                <span className="dd-card-index">Wholesale</span>
                <p>{point}</p>
              </article>
            ))}
          </div>

          <div className="dd-wholesale-contact">
            <span className="dd-card-index">Contact</span>
            <p>
              Email <a className="dd-text-link" href={wholesaleMailTo}>{wholesaleEmail}</a> to talk
              about supply, venue fit, ordering and rollout.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [page, setPage] = React.useState(getCurrentPage);

  React.useEffect(() => {
    const handleHashChange = () => {
      setPage(getCurrentPage());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="dd-site">{page === "wholesale" ? <WholesalePage /> : <HomePage />}</div>
  );
}

export default App;

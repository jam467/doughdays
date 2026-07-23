import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import GoogleMapReact from "google-map-react";
import "./App.css";
import heroImage from "./images/RAW-140-Edit_IsabellaWild.jpg";

const introCopy =
  "The first ever Dough Days cookie was baked at the centre of our universe, Cut Lunch Deli in Clovelly. It sells out every day, never leaves our menu and has now entered its shelf life as ready-to-bake cookie dough scoops with the same chewy insides and perfectly crispy shell.";

const wholesalePoints = [
  "Built for cafes, delis and hospitality partners who want an easy premium sweet offering.",
  "Consistent portions and straightforward prep keep service fast and product quality stable.",
  "Flexible enough for counter display, retail freezers or venue-specific bundles."
];

const wholesaleEmail = "cutlunchdeli@gmail.com";
const wholesaleMailTo = `mailto:${wholesaleEmail}?subject=Dough%20Days%20Wholesale%20Enquiry`;

const stockistsMapKey = "AIzaSyDlyYLD-GThLSHUwuNYT0ttLQQ_CG2TQmA";
const defaultStockistsCenter = { lat: -33.865, lng: 151.21 };
const defaultStockistsZoom = 10;
const focusedStockistZoom = 14;

const stockists = [
  {
    name: "Cut Lunch Deli",
    address: "220 Clovelly Rd",
    suburb: "Randwick",
    region: "NSW 2031",
    lat: -33.9136,
    lng: 151.2556,
    links: [
      { label: "Website", href: "https://www.cutlunchdeli.com.au/" },
    ],
  },
  {
    name: "Australian Meat Emporium",
    address: "Unit 4/31 O'Riordan St",
    suburb: "Alexandria",
    region: "NSW 2015",
    lat: -33.9167,
    lng: 151.1912,
    links: [
      { label: "Instagram", href: "https://www.instagram.com/ausmeatemporium/?hl=en" },
      {
        label: "Website",
        href: "https://www.meatemporium.com.au/?srsltid=AfmBOorxh4uGQkL61uieVMRkHkcmR4HaaRFm81xGfCJ2yH6Mm0l9jO5A",
      },
    ],
  },
  {
    name: "Cetto Deli",
    address: "229 Victoria Rd",
    suburb: "Gladesville",
    region: "NSW 2111",
    lat: -33.8331,
    lng: 151.1292,
    links: [
      { label: "Instagram", href: "https://www.instagram.com/cetto.deli/?hl=en" },
      { label: "Website", href: "https://www.cettodeli.com/" },
    ],
  },
  {
    name: "Piper & Thrupps",
    address: "115B Kurraba Rd",
    suburb: "Kurraba Point",
    region: "NSW 2089",
    lat: -33.8403,
    lng: 151.2237,
    links: [
      { label: "Instagram", href: "https://www.instagram.com/piperandthrupps/?hl=en" },
      { label: "Website", href: "https://piperandthrupps.square.site/" },
    ],
  },
  {
    name: "Astin Min Fine Foods",
    address: "2/998 Pittwater Rd",
    suburb: "Collaroy",
    region: "NSW 2097",
    lat: -33.7338,
    lng: 151.3011,
    links: [
      { label: "Website", href: "https://www.astinmin.com.au/" },
      { label: "Instagram", href: "https://www.instagram.com/astin_min_fine_foods/?hl=en" },
    ],
  },
];

function getCurrentPage() {
  if (window.location.hash === "#/wholesale") {
    return "wholesale";
  }

  if (window.location.hash === "#/stockists") {
    return "stockists";
  }

  return "home";
}

function SiteNav() {
  return (
    <nav className="dd-nav" aria-label="Primary">
      <a href="#/">Home</a>
      <a href="#/stockists">Stockists</a>
      <a href="#/wholesale">Wholesale</a>
    </nav>
  );
}

function StockistLinkIcon({ label }) {
  if (label === "Instagram") {
    return <InstagramIcon fontSize="inherit" />;
  }

  return <LanguageRoundedIcon fontSize="inherit" />;
}

function getDistanceKm(firstPoint, secondPoint) {
  const latDelta = (firstPoint.lat - secondPoint.lat) * 111;
  const avgLatInRadians = ((firstPoint.lat + secondPoint.lat) / 2) * (Math.PI / 180);
  const lngDelta = (firstPoint.lng - secondPoint.lng) * 111 * Math.cos(avgLatInRadians);

  return Math.sqrt((latDelta ** 2) + (lngDelta ** 2));
}

function getClusterThresholdKm(zoom) {
  if (zoom >= 13) {
    return 0.8;
  }

  if (zoom === 12) {
    return 1.6;
  }

  if (zoom === 11) {
    return 3.2;
  }

  return 6;
}

function createStockistClusters(items, zoom) {
  const thresholdKm = getClusterThresholdKm(zoom);
  const remaining = [...items];
  const clusters = [];

  while (remaining.length > 0) {
    const seed = remaining.shift();
    const clusterMembers = [seed];
    let centerLat = seed.lat;
    let centerLng = seed.lng;

    for (let index = remaining.length - 1; index >= 0; index -= 1) {
      const candidate = remaining[index];
      const candidateDistance = getDistanceKm(candidate, { lat: centerLat, lng: centerLng });

      if (candidateDistance > thresholdKm) {
        continue;
      }

      clusterMembers.push(candidate);
      remaining.splice(index, 1);
      centerLat = clusterMembers.reduce((sum, stockist) => sum + stockist.lat, 0) / clusterMembers.length;
      centerLng = clusterMembers.reduce((sum, stockist) => sum + stockist.lng, 0) / clusterMembers.length;
    }

    clusters.push({
      lat: centerLat,
      lng: centerLng,
      stockists: clusterMembers,
    });
  }

  return clusters;
}

function StockistMarker({ isActive }) {
  return (
    <div className={`dd-stockists-marker${isActive ? " is-active" : ""}`}>
      <span className="dd-stockists-marker-core" />
    </div>
  );
}

function StockistClusterMarker({ count }) {
  return (
    <div className="dd-stockists-cluster-marker">
      <span>{count}</span>
    </div>
  );
}

function StockistsMap({ activeStockist, focusRequest, onSelect }) {
  const [mapViewport, setMapViewport] = React.useState({
    center: defaultStockistsCenter,
    zoom: defaultStockistsZoom,
  });
  const mapRef = React.useRef(null);

  const clusters = React.useMemo(
    () => createStockistClusters(stockists, Math.round(mapViewport.zoom)),
    [mapViewport.zoom]
  );

  React.useEffect(() => {
    if (!mapRef.current || !activeStockist || focusRequest === 0) {
      return;
    }

    mapRef.current.panTo({ lat: activeStockist.lat, lng: activeStockist.lng });
    mapRef.current.setZoom(focusedStockistZoom);
    setMapViewport({
      center: { lat: activeStockist.lat, lng: activeStockist.lng },
      zoom: focusedStockistZoom,
    });
  }, [activeStockist, focusRequest]);

  const handleMapChange = ({ center, zoom }) => {
    setMapViewport({ center, zoom });
  };

  const handleGoogleApiLoaded = ({ map }) => {
    mapRef.current = map;
  };

  const handleClusterClick = (cluster) => {
    if (!mapRef.current) {
      return;
    }

    const nextZoom = Math.min(Math.round(mapViewport.zoom) + 2, focusedStockistZoom);
    const nextCenter = { lat: cluster.lat, lng: cluster.lng };

    mapRef.current.panTo(nextCenter);
    mapRef.current.setZoom(nextZoom);
    setMapViewport({ center: nextCenter, zoom: nextZoom });
  };

  return (
    <div className="dd-stockists-map-shell">
      <div className="dd-stockists-map-frame">
        <div className="dd-stockists-map" role="presentation">
          <GoogleMapReact
            bootstrapURLKeys={{ key: stockistsMapKey }}
            center={mapViewport.center}
            defaultCenter={defaultStockistsCenter}
            defaultZoom={defaultStockistsZoom}
            zoom={mapViewport.zoom}
            options={{
              fullscreenControl: true,
              mapTypeControl: false,
              streetViewControl: false,
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleGoogleApiLoaded}
            onChange={handleMapChange}
          >
            {clusters.map((cluster) => (
              cluster.stockists.length > 1 ? (
                <div
                  key={cluster.stockists.map((stockist) => stockist.name).join("|")}
                  lat={cluster.lat}
                  lng={cluster.lng}
                  onClick={() => handleClusterClick(cluster)}
                >
                  <StockistClusterMarker count={cluster.stockists.length} />
                </div>
              ) : (
                <div
                  key={cluster.stockists[0].name}
                  lat={cluster.stockists[0].lat}
                  lng={cluster.stockists[0].lng}
                  onClick={() => onSelect(cluster.stockists[0], "map")}
                >
                  <StockistMarker isActive={activeStockist?.name === cluster.stockists[0].name} />
                </div>
              )
            ))}
          </GoogleMapReact>
        </div>
      </div>
    </div>
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

function StockistsPage() {
  const [activeStockist, setActiveStockist] = React.useState(stockists[0]);
  const [focusRequest, setFocusRequest] = React.useState(0);
  const stockistRefs = React.useRef({});

  const handleStockistSelect = (stockist, source) => {
    setActiveStockist(stockist);

    if (source === "list") {
      setFocusRequest((current) => current + 1);
      return;
    }

    const record = stockistRefs.current[stockist.name];

    if (record) {
      record.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="dd-page dd-page-stockists">
      <SiteNav />

      <main className="dd-page-main">
        <section className="dd-section dd-section-cream dd-section-stockists-page" id="stockists">
          <div className="dd-stockists-panel">
            <div className="dd-stockists-layout">
              <div className="dd-stockists-sidebar">
                <div className="dd-section-heading dd-section-heading-stockists">
                  <span className="dd-eyebrow">Find Us</span>
                  <h2>Store Locator</h2>
                </div>

                <div className="dd-stockists-list" aria-label="Stockist list">
                  {stockists.map((stockist, index) => {
                    const isActive = activeStockist?.name === stockist.name;

                    return (
                      <article
                        className={`dd-card dd-card-stockist${isActive ? " is-active" : ""}`}
                        key={stockist.name}
                        onClick={() => handleStockistSelect(stockist, "list")}
                        ref={(node) => {
                          if (node) {
                            stockistRefs.current[stockist.name] = node;
                            return;
                          }

                          delete stockistRefs.current[stockist.name];
                        }}
                      >
                        <div className="dd-stockists-card-top">
                          <span className="dd-stockists-card-pin" aria-hidden="true" />
                          <div>
                            <h3>{stockist.name}</h3>
                            <p>{stockist.address}</p>
                            <p>
                              {stockist.suburb} {stockist.region}
                            </p>
                            <div className="dd-stockists-links">
                              {stockist.links.map((link) => (
                                <a
                                  aria-label={link.label}
                                  className="dd-stockists-link"
                                  href={link.href}
                                  key={link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <StockistLinkIcon label={link.label} />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* <span className="dd-card-index">{index + 1}</span> */}
                      </article>
                    );
                  })}
                </div>
              </div>

              <StockistsMap
                activeStockist={activeStockist}
                focusRequest={focusRequest}
                onSelect={handleStockistSelect}
              />
            </div>
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

  let currentPage = <HomePage />;

  if (page === "wholesale") {
    currentPage = <WholesalePage />;
  }

  if (page === "stockists") {
    currentPage = <StockistsPage />;
  }

  return <div className="dd-site">{currentPage}</div>;
}

export default App;

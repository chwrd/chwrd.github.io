/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Header, Footer, PageHeader } from "../components/site";
import TravelMap, {
  travelDestinations,
  TravelDestination,
} from "../components/TravelMap";

type CategoryFilter = "all" | "travel" | "study-abroad";

export default function TravelView() {
  const [selectedId, setSelectedId] = useState<string | null>("seattle-home");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filteredTrips = travelDestinations
    .filter((dest) => {
      if (dest.id === "seattle-home") return false; // keep home base as map reference
      if (activeFilter === "all") return true;
      return dest.categoryGroup === activeFilter;
    })
    .sort((a, b) => {
      const dateA = a.startDate || "";
      const dateB = b.startDate || "";
      return dateB.localeCompare(dateA);
    });

  const handleCardClick = (dest: TravelDestination) => {
    setSelectedId(dest.id);
    // Smooth scroll to map if on mobile or lower viewport
    const mapElement = document.getElementById("travel-map-section");
    if (mapElement && window.innerWidth < 768) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main>
      <section className="travel-section page-section">
        <Header />

        <div className="page-inner travel-inner">
          <PageHeader
            eyebrow="✈️ Global Journey"
            title="Travel & Study Abroad"
            description="Study Abroad, Academic Exchanges, and travel across East Asia and North America."
            stats={[
              {
                icon: "🌏",
                value: travelDestinations.filter((d) => d.categoryGroup === "travel").length,
                label: "Travel",
              },
              {
                icon: "🎓",
                value: travelDestinations.filter((d) => d.categoryGroup === "study-abroad").length,
                label: "Study Abroad",
              },
              {
                icon: "📍",
                value: travelDestinations.filter((d) => d.id !== "seattle-home").length,
                label: "Destinations",
              },
            ]}
          />

          {/* Map Section */}
          <div id="travel-map-section" className="travel-map-wrapper">
            <div className="travel-map-header">
              <div>
                <h2>Interactive Travel Map</h2>
                <p>Click any pin on the map or select a journey below to explore highlights.</p>
              </div>
            </div>

            <TravelMap
              selectedId={selectedId}
              onSelectDestination={(dest) => setSelectedId(dest ? dest.id : null)}
            />
          </div>

          {/* List Section */}
          <div className="travel-list-section">
            <div className="travel-list-controls">
              <div className="travel-filters">
                <button
                  type="button"
                  className={`travel-filter-chip${activeFilter === "all" ? " active" : ""}`}
                  onClick={() => setActiveFilter("all")}
                >
                  All ({travelDestinations.filter((d) => d.id !== "seattle-home").length})
                </button>
                <button
                  type="button"
                  className={`travel-filter-chip${activeFilter === "travel" ? " active" : ""}`}
                  onClick={() => setActiveFilter("travel")}
                >
                  Travel ({travelDestinations.filter((d) => d.categoryGroup === "travel").length})
                </button>
                <button
                  type="button"
                  className={`travel-filter-chip${activeFilter === "study-abroad" ? " active" : ""}`}
                  onClick={() => setActiveFilter("study-abroad")}
                >
                  Study Abroad ({travelDestinations.filter((d) => d.categoryGroup === "study-abroad").length})
                </button>
              </div>

              <div className="travel-view-toggle">
                <button
                  type="button"
                  className={`travel-toggle-btn${viewMode === "cards" ? " active" : ""}`}
                  onClick={() => setViewMode("cards")}
                  title="Card View"
                >
                  Cards
                </button>
                <button
                  type="button"
                  className={`travel-toggle-btn${viewMode === "table" ? " active" : ""}`}
                  onClick={() => setViewMode("table")}
                  title="Table View"
                >
                  Table
                </button>
              </div>
            </div>

            {viewMode === "cards" ? (
              <div className="travel-cards-grid">
                {filteredTrips.map((trip) => {
                  const isSelected = selectedId === trip.id;

                  return (
                    <article
                      key={trip.id}
                      className={`travel-card${isSelected ? " selected" : ""}${trip.isUpcoming ? " upcoming" : ""}`}
                      onClick={() => handleCardClick(trip)}
                    >
                      <div className="travel-card-header">
                        <span
                          className="travel-card-badge"
                          style={{
                            backgroundColor: `${trip.badgeColor}18`,
                            color: trip.badgeColor,
                            borderColor: `${trip.badgeColor}40`,
                          }}
                        >
                          {trip.category}
                        </span>
                        <span className="travel-card-period">{trip.period}</span>
                      </div>

                      <h3 className="travel-card-title">{trip.destination}</h3>
                      <p className="travel-card-highlights">{trip.highlights}</p>

                      <div className="travel-card-footer">
                        <span className="travel-card-coords">
                          📍 {trip.coordinates[1].toFixed(2)}°N, {trip.coordinates[0].toFixed(2)}°E
                        </span>
                        <button
                          type="button"
                          className="travel-locate-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(trip);
                          }}
                        >
                          {isSelected ? "Focused on Map" : "View on Map →"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="travel-table-container">
                <table className="travel-table">
                  <thead>
                    <tr>
                      <th>Date / Period</th>
                      <th>Destination</th>
                      <th>Category</th>
                      <th>Key Highlights &amp; Details</th>
                      <th>Map</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTrips.map((trip) => {
                      const isSelected = selectedId === trip.id;

                      return (
                        <tr
                          key={trip.id}
                          className={isSelected ? "selected-row" : ""}
                          onClick={() => handleCardClick(trip)}
                        >
                          <td className="travel-table-date">
                            <strong>{trip.period}</strong>
                          </td>
                          <td className="travel-table-dest">
                            <strong>{trip.destination}</strong>
                          </td>
                          <td>
                            <span
                              className="travel-card-badge"
                              style={{
                                backgroundColor: `${trip.badgeColor}18`,
                                color: trip.badgeColor,
                                borderColor: `${trip.badgeColor}40`,
                              }}
                            >
                              {trip.category}
                            </span>
                          </td>
                          <td className="travel-table-desc">{trip.highlights}</td>
                          <td>
                            <button
                              type="button"
                              className="travel-locate-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(trip);
                              }}
                            >
                              {isSelected ? "Active" : "Locate"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trip Overview Carousel Section */}
      <section className="trip-overview-section">
        <div className="trip-overview-inner">
          <h1>Trip overview example</h1>

          <div className="action-bar">
            <a href="#week-1">Week One</a>
            <a href="#week-2">Week Two</a>
          </div>
        </div>

        <ul className="carousel">
          <li className="day-card flight">
            <a id="week-1">
              <img
                src="https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Paris"
              />
              <div className="meta">
                <h2 className="location">Paris</h2>
                <p className="desc">
                  Arrive in the morning. Spend the day wandering around the many adorable streets and sweet cafés of Paris.
                </p>
              </div>
            </a>
          </li>
          <li className="day-card">
            <img
              src="https://images.unsplash.com/photo-1609971757431-439cf7b4141b?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Paris"
            />
            <div className="meta">
              <h2 className="location">Paris</h2>
              <p className="desc">Spend the day exploring top sights in Paris with your personal tour guide.</p>
            </div>
          </li>
          <li className="day-card train">
            <img
              src="https://images.unsplash.com/photo-1650765931316-3033ca92409b?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Versailles"
            />
            <div className="meta">
              <h2 className="location">Versailles</h2>
              <p className="desc">Explore Versailles from the lavish interior to the well-manicured gardens.</p>
            </div>
          </li>
          <li className="day-card train">
            <img
              src="https://plus.unsplash.com/premium_photo-1697729582646-a5d923464b30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="loire valley"
            />
            <div className="meta">
              <h2 className="location">Loire Valley</h2>
              <p className="desc">Stay overnight in the Loire Valley. Explore it&apos;s luxurious vineyards.</p>
            </div>
          </li>
          <li className="day-card">
            <img
              src="https://images.unsplash.com/photo-1620679393872-2501651282c1?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="wine"
            />
            <div className="meta">
              <h2 className="location">Burgundy</h2>
              <p className="desc">Enjoy another wine-filled day with a vineyard tour of the Burgundy region.</p>
            </div>
          </li>
          <li className="day-card bus car">
            <img
              src="https://images.unsplash.com/photo-1708793870276-9d529dce1288?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="wine"
            />
            <div className="meta">
              <h2 className="location">Burgundy</h2>
              <p className="desc">Walk around the town of Burgundy and learn about its history.</p>
            </div>
          </li>
          <li className="day-card bus car">
            <img
              src="https://plus.unsplash.com/premium_photo-1724604871348-298594ad4eed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhbW9uaXh8ZW58MHx8MHx8fDA%3D"
              alt="Chamonix"
            />
            <div className="meta">
              <h2 className="location">Chamonix</h2>
              <p className="desc">Enjoy a beautiful hike near the picturesque town of Chamonix.</p>
            </div>
          </li>
          <li className="day-card bus car week-start">
            <a id="week-2"></a>
            <img
              src="https://images.unsplash.com/photo-1604440401661-8f6f07c285a2?q=80&w=2163&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="nice"
            />
            <div className="meta">
              <h2 className="location">Nice</h2>
              <p className="desc">Arrive in Nice and explore town. Do some souvenier shopping or get a drink at a café.</p>
            </div>
          </li>
          <li className="day-card bus car">
            <img
              src="https://images.unsplash.com/photo-1504459257750-a6dc59581529?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="meta">
              <h2 className="location">Nice</h2>
              <p className="desc">Enjoy a relaxing day by the beach.</p>
            </div>
          </li>
          <li className="day-card flight">
            <img
              src="https://images.unsplash.com/photo-1575218283431-a91baee79f47?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Arles"
            />
            <div className="meta">
              <h2 className="location">Arles</h2>
              <p className="desc">Explore this historic city center on the Rhône River.</p>
            </div>
          </li>
          <li className="day-card flight">
            <img
              src="https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Paris"
            />
            <div className="meta">
              <h2 className="location">Paris</h2>
              <p className="desc">Enjoy one more night in Paris before flying home.</p>
            </div>
          </li>
        </ul>

        <div className="plane"></div>
      </section>

      <Footer standalone={false} />
    </main>
  );
}

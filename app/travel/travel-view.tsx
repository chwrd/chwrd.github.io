"use client";

import React, { useState } from "react";
import { Header, Footer } from "../components/site";
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

        <div className="travel-inner">
          {/* Header Introduction */}
          <div className="travel-heading">
            <span className="eyebrow">✈️ Global Journey</span>
            <h1>Travel &amp; Exchanges</h1>
            <p className="travel-summary">
              A comprehensive record of academic exchanges, technology delegations,
              faculty-led study abroad programs, and regional exploration across
              East Asia and North America.
            </p>

            {/* Quick Metrics */}
            <div className="travel-stats-bar">
              <div className="travel-stat-pill">
                <span className="travel-stat-icon">🌏</span>
                <span className="travel-stat-number">
                  {travelDestinations.filter((d) => d.categoryGroup === "travel").length}
                </span>
                <span className="travel-stat-label">Travel</span>
              </div>
              <div className="travel-stat-pill">
                <span className="travel-stat-icon">🎓</span>
                <span className="travel-stat-number">
                  {travelDestinations.filter((d) => d.categoryGroup === "study-abroad").length}
                </span>
                <span className="travel-stat-label">Study Abroad</span>
              </div>
              <div className="travel-stat-pill">
                <span className="travel-stat-icon">📍</span>
                <span className="travel-stat-number">
                  {travelDestinations.filter((d) => d.id !== "seattle-home").length}
                </span>
                <span className="travel-stat-label">Destinations</span>
              </div>
            </div>
          </div>

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

      <Footer standalone={false} />
    </main>
  );
}

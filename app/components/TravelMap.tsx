"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "/countries-110m.json";

export interface TravelDestination {
  id: string;
  destination: string;
  shortName: string;
  period: string;
  startDate?: string;
  category: string;
  categoryGroup: "travel" | "study-abroad" | "home";
  highlights: string;
  coordinates: [number, number]; // [longitude, latitude]
  badgeColor: string;
  priorityTier: 1 | 2; // 1 = Marquee Hub (always viewable), 2 = Regional Destination (viewable at 2x zoom)
  labelOffset?: { x?: number; y?: number; anchor?: "start" | "middle" | "end" };
  isUpcoming?: boolean;
}

export const travelDestinations: TravelDestination[] = [
  {
    id: "tokyo-2027",
    destination: "Tokyo, Japan",
    shortName: "Tokyo",
    period: "Spring 2027 (Upcoming)",
    startDate: "2027-04",
    category: "University Exchange",
    categoryGroup: "study-abroad",
    highlights: "Keio University exchange program.",
    coordinates: [139.6917, 35.6895],
    badgeColor: "#10b981",
    priorityTier: 1,
    isUpcoming: true,
  },
  {
    id: "macau-2026",
    destination: "Macau",
    shortName: "Macau",
    period: "June 2026",
    startDate: "2026-06",
    category: "Travel",
    categoryGroup: "travel",
    highlights: "Macau Peninsula, Cotai Strip, and local transit networks.",
    coordinates: [113.5439, 22.1987],
    badgeColor: "#f59e0b",
    priorityTier: 2,
    labelOffset: { x: -8, y: 8, anchor: "end" },
  },
  {
    id: "xiamen-2026",
    destination: "Xiamen, China",
    shortName: "Xiamen",
    period: "May 2026",
    startDate: "2026-05-25",
    category: "Travel",
    categoryGroup: "travel",
    highlights: "Siming District, and Gulangyu Island.",
    coordinates: [118.0894, 24.4798],
    badgeColor: "#f59e0b",
    priorityTier: 2,
    labelOffset: { x: -8, y: 6, anchor: "end" },
  },
  {
    id: "jiangsu-2026",
    destination: "Jiangsu, China",
    shortName: "Jiangsu",
    period: "May 2026",
    startDate: "2026-05-15",
    category: "CUHK Study Abroad",
    categoryGroup: "study-abroad",
    highlights: "EPIN Biotech program. Vists to Nanjing, Suzhou, and Wuxi technology parks and corporate facilities.",
    coordinates: [118.7969, 32.0603],
    badgeColor: "#3b82f6",
    priorityTier: 2,
    labelOffset: { x: -8, y: -6, anchor: "end" },
  },
  {
    id: "taiwan-2026",
    destination: "Taiwan",
    shortName: "Taiwan",
    period: "April – May 2026",
    startDate: "2026-04",
    category: "Travel",
    categoryGroup: "travel",
    highlights: "Taipei, New Taipei City, Jiufen, and Shifen.",
    coordinates: [121.5654, 25.033],
    badgeColor: "#f59e0b",
    priorityTier: 2,
    labelOffset: { x: 8, y: 3, anchor: "start" },
  },
  {
    id: "kansai-2026",
    destination: "Kansai, Japan",
    shortName: "Kansai",
    period: "March 2026",
    startDate: "2026-03",
    category: "Travel",
    categoryGroup: "travel",
    highlights: "Osaka, Kyoto, Wakayama, and Shirahama.",
    coordinates: [135.5023, 34.6937],
    badgeColor: "#f59e0b",
    priorityTier: 2,
    labelOffset: { x: -8, y: 8, anchor: "end" },
  },
  {
    id: "beijing-2025",
    destination: "Beijing, China",
    shortName: "Beijing",
    period: "Dec 2025 – Jan 2026",
    startDate: "2025-12-25",
    category: "Travel",
    categoryGroup: "travel",
    highlights: "798 Art Zone, Sanlitun, and cultural landmarks.",
    coordinates: [116.4074, 39.9042],
    badgeColor: "#f59e0b",
    priorityTier: 2,
  },
  {
    id: "shanghai-2025",
    destination: "Shanghai, China",
    shortName: "Shanghai",
    period: "December 2025",
    startDate: "2025-12-15",
    category: "CUHK Study Abroad",
    categoryGroup: "study-abroad",
    highlights: "Co-op Shanghai program. Site visits to Bilibili, SAIC Volkswagen, Trip.com, and Midea.",
    coordinates: [121.4737, 31.2304],
    badgeColor: "#3b82f6",
    priorityTier: 1,
    labelOffset: { x: 8, y: 3, anchor: "start" },
  },
  {
    id: "guilin-2025",
    destination: "Guilin & Yangshuo, China",
    shortName: "Guilin",
    period: "December 2025",
    startDate: "2025-12-05",
    category: "Travel",
    categoryGroup: "travel",
    highlights: "Li River cruise and karst landscapes.",
    coordinates: [110.2991, 25.2742],
    badgeColor: "#f59e0b",
    priorityTier: 2,
  },
  {
    id: "chongqing-2025",
    destination: "Chongqing, China",
    shortName: "Chongqing",
    period: "September 2025",
    startDate: "2025-09-15",
    category: "Travel",
    categoryGroup: "travel",
    highlights: "World's largest hotpot restaurant, Hongyadong, Liziba, Raffles City, and Jiefangbei.",
    coordinates: [106.5516, 29.563],
    badgeColor: "#f59e0b",
    priorityTier: 2,
    labelOffset: { x: -8, y: 6, anchor: "end" },
  },
  {
    id: "hong-kong-2025",
    destination: "Hong Kong",
    shortName: "Hong Kong",
    period: "2025 – 2026",
    startDate: "2025-09-01",
    category: "University Exchange",
    categoryGroup: "study-abroad",
    highlights:
      "Chinese University of Hong Kong exchange program ",
    coordinates: [114.1694, 22.3193],
    badgeColor: "#10b981",
    priorityTier: 1,
    labelOffset: { x: 8, y: -5, anchor: "start" },
  },
  {
    id: "korea-2026",
    destination: "Busan, South Korea",
    shortName: "Busan",
    period: "Summer 2025",
    startDate: "2025-06-15",
    category: "UW Study Abroad",
    categoryGroup: "study-abroad",
    highlights: "UW Smart Cities academic program. Visited Seoul, Sejong, and Busan.",
    coordinates: [126.978, 37.5665],
    badgeColor: "#3b82f6",
    priorityTier: 1,
  },
  {
    id: "kyoto-hs",
    destination: "Kyoto, Japan",
    shortName: "Kyoto",
    period: "Summer 2023",
    startDate: "2023-06-01",
    category: "High School Study Abroad",
    categoryGroup: "study-abroad",
    highlights: "CIEE Japanese Language and Culture immersion and homestay.",
    coordinates: [135.7681, 35.0116],
    badgeColor: "#3b82f6",
    priorityTier: 2,
    labelOffset: { x: 8, y: -6, anchor: "start" },
  },
  {
    id: "seattle-home",
    destination: "Seattle, WA, USA",
    shortName: "Seattle",
    period: "Home",
    startDate: "2020-01-01",
    category: "University Base",
    categoryGroup: "home",
    highlights: "University of Washington — Computer Science & Business.",
    coordinates: [-122.3321, 47.6062],
    badgeColor: "#ef4444",
    priorityTier: 1,
  },
];

// World cycle width in Mercator SVG coordinates at baseline scale 260 (2 * PI * 260)
const WORLD_WIDTH = 2 * Math.PI * 260;

interface TravelMapProps {
  selectedId?: string | null;
  onSelectDestination?: (dest: TravelDestination | null) => void;
}

export default function TravelMap({
  selectedId,
  onSelectDestination,
}: TravelMapProps) {
  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [-170, 36],
    zoom: 1.0,
  });
  const [hoveredDest, setHoveredDest] = useState<TravelDestination | null>(
    () => travelDestinations.find((d) => d.id === (selectedId || "seattle-home")) || null
  );
  const [prevSelectedId, setPrevSelectedId] = useState<string | null | undefined>(selectedId);
  // Track horizontal world cycle offset for continuous infinite left/right scrolling
  const [worldCycle, setWorldCycle] = useState(0);
  // Viewport scale compensation: SVG viewBox (800px) shrinks on mobile (360px-430px),
  // so we dynamically scale up SVG elements on mobile to keep physical sizes clear and legible.
  const [deviceScale, setDeviceScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      if (w < 480) {
        // Small mobile screens (320px - 480px)
        setDeviceScale(2.1);
      } else if (w < 768) {
        // Large phones / small tablets (480px - 768px)
        setDeviceScale(1.65);
      } else if (w < 1024) {
        // Tablets (768px - 1024px)
        setDeviceScale(1.2);
      } else {
        // Desktop
        setDeviceScale(1.0);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const updateCycleFromTransform = (x?: number, currentZoom?: number) => {
    if (typeof x !== "number") return;
    const k = currentZoom || position.zoom || 1;
    // Map viewBox center is at X = 400
    const px = (400 - x) / k;
    const cycle = Math.round((px - 400) / WORLD_WIDTH);
    setWorldCycle((prev) => (prev !== cycle ? cycle : prev));
  };

  // Center on selected destination when it changes externally
  if (selectedId !== prevSelectedId) {
    setPrevSelectedId(selectedId);
    if (selectedId) {
      const dest = travelDestinations.find((d) => d.id === selectedId);
      if (dest) {
        setPosition((prev) => ({
          coordinates: dest.coordinates,
          zoom: Math.max(prev.zoom, 2.5),
        }));
        setWorldCycle(0);
        setHoveredDest(dest);
      }
    }
  }

  const activeDest = hoveredDest || travelDestinations.find((d) => d.id === selectedId);
  const zoom = position.zoom;

  const setViewEastAsia = () => {
    setPosition({ coordinates: [124, 30], zoom: 2.0 });
    setWorldCycle(0);
  };

  const setViewWorld = () => {
    setPosition({ coordinates: [-170, 36], zoom: 1.0 });
    setWorldCycle(0);
  };

  const setViewHome = () => {
    const homeDest = travelDestinations.find((d) => d.id === "seattle-home") || null;
    setPosition({ coordinates: [-122.3321, 47.6062], zoom: 2.0 });
    setWorldCycle(0);
    setHoveredDest(homeDest);
    onSelectDestination?.(homeDest);
  };

  const MAX_ZOOM = 7.0;
  const MIN_ZOOM = 0.5;
  const ZOOM_STEP = 0.5;

  const zoomIn = () => {
    setPosition((pos) => {
      // Step up by 0.5 increment, snapping cleanly to multiples of 0.5
      const nextZoom = Math.min(
        (Math.floor(pos.zoom * 2 + 0.01) + 1) / 2,
        MAX_ZOOM
      );
      return { ...pos, zoom: nextZoom };
    });
  };

  const zoomOut = () => {
    setPosition((pos) => {
      // Step down by 0.5 increment, snapping cleanly to multiples of 0.5
      const nextZoom = Math.max(
        (Math.ceil(pos.zoom * 2 - 0.01) - 1) / 2,
        MIN_ZOOM
      );
      return { ...pos, zoom: nextZoom };
    });
  };

  // Gesture filter for natural pinch-to-zoom:
  // - Trackpad pinch gesture (emits wheel with ctrlKey=true in all modern browsers) -> zooms map
  // - Touchscreen pinch gesture (touchstart/touchmove with 2 fingers) -> zooms map
  // - Normal two-finger scroll / mousewheel (ctrlKey=false) -> passes through to scroll the page naturally
  // - Left click/tap -> pans the map
  // - Double click -> zooms in
  const filterZoomEvent = (event: Event) => {
    // Touch gestures on mobile / tablet
    if (event.type.startsWith("touch")) {
      return true;
    }

    // Left click drag to pan
    if (event.type === "mousedown") {
      return (event as MouseEvent).button === 0;
    }

    // Trackpad pinch gesture (synthesized as wheel with ctrlKey=true) or Ctrl + mousewheel
    if (event.type === "wheel") {
      return (event as WheelEvent).ctrlKey;
    }

    // Double-click to zoom in
    if (event.type === "dblclick") {
      return true;
    }

    return false;
  };

  // City visibility Level of Detail (LOD):
  // Tier 1 (Hong Kong, Shanghai, Tokyo, Seoul, Seattle): Always viewable (at baseline 1.0x, global 0.5x, etc.)
  // Tier 2 (All rest of cities): Viewable at 2x zoom (zoom >= 1.95) or when selected / hovered
  const isCityVisible = (dest: TravelDestination, isSelected: boolean, isHovered: boolean) => {
    if (isSelected || isHovered) return true;
    if (dest.priorityTier === 1) return true;
    return zoom >= 1.95;
  };

  // Determine whether a destination's name label should be visible based on zoom LOD
  const isLabelVisible = (dest: TravelDestination, isSelected: boolean, isHovered: boolean) => {
    // Selected or hovered cities always show their label
    if (isSelected || isHovered) return true;

    // Tier 1 labels always visible; Tier 2 labels visible at 2x zoom and above
    if (dest.priorityTier === 1) return true;
    return zoom >= 1.95;
  };

  return (
    <div className="travel-map-container">
      {/* Controls Bar */}
      <div className="travel-map-toolbar">
        <div className="travel-map-presets">
          <button
            type="button"
            className="travel-map-btn"
            onClick={setViewEastAsia}
            title="Focus on East Asia travel cluster"
          >
            🌏 East Asia
          </button>
          <button
            type="button"
            className="travel-map-btn"
            onClick={setViewWorld}
            title="View entire global map"
          >
            🗺️ Global View
          </button>
          <button
            type="button"
            className="travel-map-btn"
            onClick={setViewHome}
            title="Focus on Seattle / UW Home Base"
          >
            📍 Home Base
          </button>
        </div>

        <div className="travel-map-zoom-controls">
          <span className="travel-map-zoom-level" title="Current zoom level">
            {zoom.toFixed(1)}×
          </span>
          <button
            type="button"
            className="travel-map-icon-btn"
            onClick={zoomOut}
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            className="travel-map-icon-btn"
            onClick={zoomIn}
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      {/* SVG Vector Map */}
      <div className="travel-map-canvas">
        {!mounted ? (
          <div className="travel-map-skeleton">
            <div className="travel-map-spinner" />
            <p>Loading interactive vector map...</p>
          </div>
        ) : (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 260 }}
            className="travel-composable-map"
          >
            <ZoomableGroup
              center={position.coordinates}
              zoom={position.zoom}
              filterZoomEvent={filterZoomEvent}
              translateExtent={[
                [-Infinity, -550],
                [Infinity, 1150],
              ]}
              onMove={(pos) => {
                if (typeof pos.x === "number") {
                  updateCycleFromTransform(pos.x, pos.zoom);
                }
                const z = pos.zoom;
                if (typeof z === "number" && Math.abs(z - position.zoom) > 0.05) {
                  setPosition((prev) => ({
                    ...prev,
                    zoom: z,
                  }));
                }
              }}
              onMoveEnd={(pos) => {
                if (typeof pos.x === "number") {
                  updateCycleFromTransform(pos.x, pos.zoom);
                }
                if (pos.coordinates) {
                  setPosition((prev) => ({
                    coordinates: pos.coordinates as [number, number],
                    zoom: pos.zoom ?? prev.zoom,
                  }));
                }
              }}
              maxZoom={MAX_ZOOM}
              minZoom={MIN_ZOOM}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  [worldCycle - 2, worldCycle - 1, worldCycle, worldCycle + 1, worldCycle + 2].map((copy) => (
                    <g key={`geo-world-${copy}`} transform={`translate(${copy * WORLD_WIDTH}, 0)`}>
                      {geographies.map((geo) => (
                        <Geography
                          key={`${copy}-${geo.rsmKey}`}
                          geography={geo}
                          className="travel-geography"
                        />
                      ))}
                    </g>
                  ))
                }
              </Geographies>

              {[worldCycle - 2, worldCycle - 1, worldCycle, worldCycle + 1, worldCycle + 2].map((copy) => (
                <g key={`markers-world-${copy}`} transform={`translate(${copy * WORLD_WIDTH}, 0)`}>
                  {travelDestinations.map((dest) => {
                    const isSelected = selectedId === dest.id;
                    const isHovered = hoveredDest?.id === dest.id;
                    if (!isCityVisible(dest, isSelected, isHovered)) return null;
                    const showLabel = isLabelVisible(dest, isSelected, isHovered);

                    // --- Adaptive Zoom & Device Scaling Calculations ---
                    // Ratio representing zoom progression from baseline (1.0x) to max (7.0x)
                    const zoomProgress = Math.min(Math.max((zoom - 1) / (MAX_ZOOM - 1), 0), 1);

                    // Screen radius compensated by deviceScale for mobile viewBox scaling:
                    // On desktop: ~3.6px -> ~7.2px
                    // On mobile: scales up in SVG coordinates so rendered size on phone matches desktop!
                    const baseScreenR =
                      (isSelected
                        ? 5.2
                        : isHovered
                        ? 4.5
                        : dest.isUpcoming || dest.categoryGroup === "home"
                        ? 4.2
                        : 3.6) * deviceScale;
                    const circleGrowthFactor = 1 + zoomProgress * 0.9;
                    const screenR = baseScreenR * circleGrowthFactor;

                    // In SVG coordinates inside <ZoomableGroup scale(zoom)>, divide by zoom
                    const svgR = screenR / zoom;
                    const svgGlowR = (screenR * 1.35) / zoom;
                    const svgPingR = (screenR * 1.7) / zoom;
                    // Crisp stroke on screen at any zoom level
                    const svgStroke = ((0.9 + zoomProgress * 0.4) * deviceScale) / zoom;

                    // Font sizing: compensated by deviceScale so city names are prominent, clear, and readable on mobile
                    const baseFontSize = (isSelected ? 13.5 : isHovered ? 12.8 : 12.0) * deviceScale;
                    const fontGrowth = zoomProgress * 5.0 * deviceScale;
                    const screenFontSize = baseFontSize + fontGrowth;
                    const svgFontSize = screenFontSize / zoom;

                    // Crisp dark outline halo behind glyphs (paintOrder: stroke fill)
                    const svgTextStroke = ((2.2 + zoomProgress * 0.8) * deviceScale) / zoom;

                    // Label offsets: dynamically scaled with circle size, text size & deviceScale
                    const defaultYOffset = -((screenR + (4 + zoomProgress * 2) * deviceScale) / zoom);
                    const offsetScale = (1 + zoomProgress * 0.45) * deviceScale;
                    const customOffsetX = dest.labelOffset?.x ? (dest.labelOffset.x * offsetScale) / zoom : 0;
                    const customOffsetY = dest.labelOffset?.y ? (dest.labelOffset.y * offsetScale) / zoom : defaultYOffset;
                    const textAnchor = dest.labelOffset?.anchor || "middle";

                    return (
                      <Marker
                        key={`${copy}-${dest.id}`}
                        coordinates={dest.coordinates}
                        onClick={() => {
                          onSelectDestination?.(dest);
                          setHoveredDest(dest);
                        }}
                        onMouseEnter={() => setHoveredDest(dest)}
                        style={{ cursor: "pointer" }}
                      >
                        {/* Pulsing ring for upcoming, home base, or selected pin */}
                        {(dest.isUpcoming || dest.categoryGroup === "home" || isSelected) && (
                          <circle
                            r={svgPingR}
                            fill="none"
                            stroke={dest.badgeColor}
                            strokeWidth={svgStroke}
                            opacity={0.7}
                            className="animate-ping"
                          />
                        )}

                        {/* Outer glow ring */}
                        <circle
                          r={svgGlowR}
                          fill={dest.badgeColor}
                          fillOpacity={isSelected ? 0.45 : isHovered ? 0.35 : 0.22}
                        />

                        {/* Main pin core */}
                        <circle
                          r={svgR}
                          fill={dest.badgeColor}
                          stroke="#ffffff"
                          strokeWidth={svgStroke}
                        />

                        {/* Adaptive Pin Label */}
                        {showLabel && (
                          <text
                            x={customOffsetX}
                            y={customOffsetY}
                            textAnchor={textAnchor}
                            style={{
                              fontFamily: "var(--font-work-sans), sans-serif",
                              fontSize: `${svgFontSize}px`,
                              fontWeight: isSelected ? 700 : isHovered ? 600 : 600,
                              fill: isSelected ? "#ffffff" : isHovered ? "#93c5fd" : "#f9fafb",
                              paintOrder: "stroke fill",
                              stroke: "#0a0d14",
                              strokeWidth: `${svgTextStroke}px`,
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              pointerEvents: "none",
                            }}
                          >
                            {dest.shortName}
                          </text>
                        )}
                      </Marker>
                    );
                  })}
                </g>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        )}
      </div>

      {/* Interactive Tooltip Card for Active Destination */}
      {activeDest && (
        <div className="travel-map-tooltip">
          <div className="travel-map-tooltip-header">
            <span
              className="travel-map-dot"
              style={{ backgroundColor: activeDest.badgeColor }}
            />
            <strong className="travel-map-tooltip-title">
              {activeDest.destination}
            </strong>
            <span
              className="travel-map-badge"
              style={{
                borderColor: `${activeDest.badgeColor}55`,
                color: activeDest.badgeColor,
              }}
            >
              {activeDest.category}
            </span>
            <button
              type="button"
              className="travel-map-tooltip-close"
              onClick={() => {
                setHoveredDest(null);
                onSelectDestination?.(null);
              }}
              aria-label="Close destination details"
            >
              ✕
            </button>
          </div>
          <div className="travel-map-tooltip-body">
            <span className="travel-map-tooltip-period">
              📅 {activeDest.period}
            </span>
            <p className="travel-map-tooltip-desc">{activeDest.highlights}</p>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="travel-map-legend">
        <span className="travel-legend-item">
          <span className="travel-legend-dot" style={{ background: "#f59e0b" }} />
          Travel
        </span>
        <span className="travel-legend-item">
          <span className="travel-legend-dot" style={{ background: "#10b981" }} />
          University Exchange
        </span>
        <span className="travel-legend-item">
          <span className="travel-legend-dot" style={{ background: "#3b82f6" }} />
          Study Abroad
        </span>
        <span className="travel-legend-item">
          <span className="travel-legend-dot" style={{ background: "#ef4444" }} />
          Home Base
        </span>
      </div>
    </div>
  );
}

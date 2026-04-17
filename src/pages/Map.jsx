import { useState, useEffect } from "react";
import coffeeDB from "../data/coffeeDB.json";

const REGIONS = ["All", "Africa", "South America", "Central America", "Asia"];
const ALL_FLAVORS = [...new Set(coffeeDB.flatMap((c) => c.flavor))].sort();
const PROCESSES = ["All", "washed", "natural", "honey", "wet-hulled"];

// Simple SVG world map with coffee region markers
function CoffeeMap({ origins, selected, onSelect }) {
  // Approximate SVG coords for world map (800x400 viewBox)
  function latLngToXY(lat, lng) {
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 400;
    return [x, y];
  }

  return (
    <div className="map-container">
      <svg
        viewBox="0 0 800 400"
        className="world-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simple world outline - continents approximated */}
        {/* Africa */}
        <path d="M420,140 L450,130 L470,150 L480,200 L470,250 L450,280 L430,270 L415,240 L410,200 L415,160 Z" className="continent" />
        {/* South America */}
        <path d="M220,160 L255,150 L270,170 L275,220 L265,270 L245,290 L225,280 L210,250 L205,210 L210,170 Z" className="continent" />
        {/* North America */}
        <path d="M100,80 L200,70 L220,100 L215,140 L195,150 L160,145 L130,130 L100,110 Z" className="continent" />
        {/* Central America */}
        <path d="M195,145 L220,140 L230,160 L215,165 L200,160 Z" className="continent" />
        {/* Europe */}
        <path d="M380,80 L430,75 L440,100 L420,110 L390,108 L375,95 Z" className="continent" />
        {/* Asia */}
        <path d="M470,75 L620,70 L640,120 L620,160 L580,165 L530,150 L490,130 L465,105 Z" className="continent" />
        {/* Southeast Asia */}
        <path d="M570,150 L610,145 L620,175 L600,185 L575,175 Z" className="continent" />
        {/* Australia */}
        <path d="M580,230 L640,225 L650,265 L635,285 L600,285 L575,265 Z" className="continent" />

        {/* Coffee belt lines */}
        <line x1="0" y1="165" x2="800" y2="165" className="tropic-line" strokeDasharray="4,4" />
        <line x1="0" y1="235" x2="800" y2="235" className="tropic-line" strokeDasharray="4,4" />
        <text x="8" y="162" className="tropic-text">Tropic of Cancer</text>
        <text x="8" y="232" className="tropic-text">Tropic of Capricorn</text>
        <text x="8" y="200" className="belt-text">☕ Coffee Belt</text>

        {/* Origin markers */}
        {origins.map((origin) => {
          const [x, y] = latLngToXY(origin.coords[0], origin.coords[1]);
          const isSelected = selected?.id === origin.id;
          return (
            <g key={origin.id} onClick={() => onSelect(origin)} style={{ cursor: "pointer" }}>
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 10 : 7}
                className={`map-marker ${isSelected ? "marker-selected" : ""}`}
              />
              <circle cx={x} cy={y} r={isSelected ? 14 : 10} className="marker-pulse" />
              <text
                x={x + 12}
                y={y + 4}
                className="marker-label"
                style={{ display: isSelected ? "block" : "none" }}
              >
                {origin.origin}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Map() {
  const [region, setRegion] = useState("All");
  const [process, setProcess] = useState("All");
  const [flavor, setFlavor] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = coffeeDB.filter((c) => {
    if (region !== "All" && c.continent !== region) return false;
    if (process !== "All" && c.process !== process) return false;
    if (flavor !== "All" && !c.flavor.includes(flavor)) return false;
    return true;
  });

  useEffect(() => {
    if (filtered.length > 0 && !filtered.find((f) => f.id === selected?.id)) {
      setSelected(null);
    }
  }, [filtered]);

  return (
    <div className="map-page">
      <div className="map-header">
        <h1 className="page-title">Coffee Origins</h1>
        <p className="page-subtitle">Explore where your coffee comes from</p>
      </div>

      {/* Filters */}
      <div className="map-filters">
        <div className="filter-group">
          <label>Region</label>
          <div className="pill-group">
            {REGIONS.map((r) => (
              <button
                key={r}
                className={`pill small ${region === r ? "selected" : ""}`}
                onClick={() => setRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <label>Process</label>
          <div className="pill-group">
            {PROCESSES.map((p) => (
              <button
                key={p}
                className={`pill small ${process === p ? "selected" : ""}`}
                onClick={() => setProcess(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <label>Flavor</label>
          <select
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
            className="flavor-select"
          >
            <option value="All">All Flavors</option>
            {ALL_FLAVORS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="map-layout">
        {/* Map */}
        <div className="map-viz">
          <CoffeeMap origins={filtered} selected={selected} onSelect={setSelected} />
          <p className="map-count">{filtered.length} origin{filtered.length !== 1 ? "s" : ""} shown</p>
        </div>

        {/* Detail Panel */}
        <div className="map-detail">
          {selected ? (
            <div className="origin-card">
              <div className="origin-card-header">
                <h3>{selected.origin}</h3>
                <span className="origin-region">{selected.continent}</span>
              </div>
              <div className="origin-meta">
                <span>📍 {selected.region}</span>
                <span>⛰ {selected.altitude}</span>
                <span>🗓 {selected.harvest}</span>
                <span>⚙️ {selected.process}</span>
              </div>
              <div className="flavor-tags">
                {selected.flavor.map((f) => (
                  <span key={f} className="flavor-tag">{f}</span>
                ))}
              </div>
              <p className="origin-description">{selected.description}</p>
            </div>
          ) : (
            <div className="map-placeholder">
              <span>🗺️</span>
              <p>Click a marker on the map to explore an origin</p>
            </div>
          )}

          {/* List of filtered origins */}
          <div className="origins-list">
            <h4>Origins ({filtered.length})</h4>
            {filtered.map((o) => (
              <button
                key={o.id}
                className={`origin-list-item ${selected?.id === o.id ? "active" : ""}`}
                onClick={() => setSelected(o)}
              >
                <strong>{o.origin}</strong>
                <span>{o.region}</span>
                <span className="process-badge">{o.process}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Brew", icon: "⚗️" },
  { to: "/learn", label: "Learn", icon: "📖" },
  { to: "/map", label: "Origins", icon: "🗺️" },
  { to: "/drinks", label: "Drinks", icon: "🥛" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">☕</span>
        <span className="brand-name">Coffee Station</span>
      </div>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">{l.icon}</span>
              <span className="nav-label">{l.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

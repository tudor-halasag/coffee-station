import { useState } from "react";
import drinksData from "../data/drinks.json";

const CATEGORIES = [
  { key: "milk_based", label: "Milk-Based", icon: "🥛" },
  { key: "cold", label: "Cold & Iced", icon: "🧊" },
  { key: "experimental", label: "Experimental", icon: "🧪" },
];

const DIFFICULTY_COLOR = { Easy: "green", Medium: "amber", Hard: "red", Expert: "purple" };

function DrinkCard({ drink, isOpen, onToggle }) {
  return (
    <div className={`drink-card ${isOpen ? "open" : ""}`}>
      <button className="drink-card-header" onClick={onToggle}>
        <div className="drink-title-row">
          <span className="drink-icon">{drink.icon}</span>
          <div>
            <h3 className="drink-name">{drink.name}</h3>
            <span className="drink-origin">{drink.origin}</span>
          </div>
        </div>
        <div className="drink-meta-row">
          <span className={`difficulty-badge diff-${DIFFICULTY_COLOR[drink.difficulty]}`}>
            {drink.difficulty}
          </span>
          <span className="expand-arrow">{isOpen ? "▲" : "▼"}</span>
        </div>
      </button>

      {isOpen && (
        <div className="drink-body">
          <p className="drink-description">{drink.description}</p>

          <div className="drink-columns">
            <div>
              <h4>Ingredients</h4>
              <ul className="ingredient-list">
                {drink.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Steps</h4>
              <ol className="steps-ol">
                {drink.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          {drink.tip && (
            <div className="drink-tip">
              <span>💡</span>
              <p>{drink.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Drinks() {
  const [activeCategory, setActiveCategory] = useState("milk_based");
  const [openDrink, setOpenDrink] = useState(null);
  const [search, setSearch] = useState("");

  const drinks = drinksData[activeCategory] || [];
  const filtered = drinks.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase())
  );

  function toggleDrink(id) {
    setOpenDrink((prev) => (prev === id ? null : id));
  }

  return (
    <div className="drinks-page">
      <div className="drinks-header">
        <h1 className="page-title">Drink Catalog</h1>
        <p className="page-subtitle">From classics to experiments</p>
        <input
          className="search-input"
          type="text"
          placeholder="Search drinks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`category-tab ${activeCategory === cat.key ? "active" : ""}`}
            onClick={() => { setActiveCategory(cat.key); setOpenDrink(null); setSearch(""); }}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            <span className="cat-count">{drinksData[cat.key]?.length || 0}</span>
          </button>
        ))}
      </div>

      <div className="drinks-list">
        {filtered.length === 0 ? (
          <div className="no-results">No drinks match your search.</div>
        ) : (
          filtered.map((drink) => (
            <DrinkCard
              key={drink.id}
              drink={drink}
              isOpen={openDrink === drink.id}
              onToggle={() => toggleDrink(drink.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

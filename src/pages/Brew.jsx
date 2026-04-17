import { useState } from "react";
import InputForm from "../components/InputForm";
import RecipeOutput from "../components/RecipeOutput";
import RatioCalculator from "../components/RatioCalculator";
import SaveButton from "../components/SaveButton";
import BrewTimer from "../components/BrewTimer";
import { generateRecipe } from "../core/generator";
import { getSavedRecipes, deleteRecipe } from "../utils/storage";
import { exportAllRecipes } from "../utils/export";

export default function Brew() {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState(getSavedRecipes);
  const [showSaved, setShowSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("brew"); // "brew" | "ratio" | "timer"

  function handleGenerate(input) {
    try {
      const r = generateRecipe(input);
      setRecipe(r);
      setError(null);
      setActiveTab("brew");
    } catch (e) {
      setError(e.message);
    }
  }

  function handleDelete(id) {
    deleteRecipe(id);
    setSavedRecipes(getSavedRecipes());
  }

  function refreshSaved() {
    setSavedRecipes(getSavedRecipes());
    setShowSaved(true);
  }

  return (
    <div className="brew-page">
      {/* Left panel: inputs */}
      <aside className="brew-sidebar">
        <div className="sidebar-header">
          <h1 className="page-title">Brew Studio</h1>
          <p className="page-subtitle">Dial in your perfect cup</p>
        </div>
        <InputForm onGenerate={handleGenerate} />
        {error && <div className="error-box">{error}</div>}
        <div className="sidebar-actions">
          <button className="secondary-btn" onClick={refreshSaved}>
            Saved Recipes ({savedRecipes.length})
          </button>
          {savedRecipes.length > 0 && (
            <button className="secondary-btn" onClick={() => exportAllRecipes(savedRecipes)}>
              Export All
            </button>
          )}
        </div>
      </aside>

      {/* Right panel: output */}
      <main className="brew-main">
        {!recipe ? (
          <div className="brew-empty">
            <div className="empty-icon">⚗️</div>
            <h2>Configure your brew</h2>
            <p>Select your method, roast, strength, and grind, then hit <strong>Generate Recipe</strong> to get your personalized brew guide.</p>
            <div className="empty-tools">
              <div className="empty-tab-btns">
                <button
                  className={`tab-btn ${activeTab === "ratio" ? "active" : ""}`}
                  onClick={() => setActiveTab("ratio")}
                >
                  Ratio Calculator
                </button>
              </div>
              {activeTab === "ratio" && <RatioCalculator />}
            </div>
          </div>
        ) : (
          <>
            <div className="output-tabs">
              {["brew", "ratio", "timer"].map((t) => (
                <button
                  key={t}
                  className={`tab-btn ${activeTab === t ? "active" : ""}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t === "brew" ? "Recipe" : t === "ratio" ? "Calculator" : "Timer"}
                </button>
              ))}
            </div>

            {activeTab === "brew" && (
              <>
                <RecipeOutput recipe={recipe} />
                <SaveButton recipe={recipe} />
              </>
            )}
            {activeTab === "ratio" && <RatioCalculator />}
            {activeTab === "timer" && (
              <div className="timer-wrap">
                <h3 className="section-heading">Brew Timer</h3>
                <p className="timer-intro">Target: <strong>{recipe.brewTime}</strong> for {recipe.label}</p>
                <BrewTimer targetTime={recipe.brewTime} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Saved Recipes Drawer */}
      {showSaved && (
        <div className="saved-overlay" onClick={() => setShowSaved(false)}>
          <div className="saved-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Saved Recipes</h3>
              <button className="close-btn" onClick={() => setShowSaved(false)}>✕</button>
            </div>
            {savedRecipes.length === 0 ? (
              <p className="empty-saved">No saved recipes yet.</p>
            ) : (
              <ul className="saved-list">
                {savedRecipes.map((r) => (
                  <li key={r.id} className="saved-item">
                    <div className="saved-info">
                      <strong>{r.label}</strong>
                      <span>{r.coffeeWeight}g · 1:{r.ratio} · {r.temperature}°C</span>
                      <span className="saved-date">{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="saved-item-actions">
                      <button
                        className="load-btn"
                        onClick={() => { setRecipe(r); setShowSaved(false); setActiveTab("brew"); }}
                      >
                        Load
                      </button>
                      <button className="del-btn" onClick={() => handleDelete(r.id)}>✕</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { saveRecipe } from "../utils/storage";
import { exportRecipe } from "../utils/export";

export default function SaveButton({ recipe }) {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    saveRecipe(recipe);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleExport() {
    exportRecipe(recipe);
  }

  if (!recipe) return null;

  return (
    <div className="save-actions">
      <button
        className={`save-btn ${saved ? "saved" : ""}`}
        onClick={handleSave}
        disabled={saved}
      >
        {saved ? "✓ Saved!" : "Save Recipe"}
      </button>
      <button className="export-btn" onClick={handleExport}>
        Export JSON
      </button>
    </div>
  );
}

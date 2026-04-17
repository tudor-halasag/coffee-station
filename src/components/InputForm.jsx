import { useState } from "react";
import { BREW_METHODS, ROAST_LEVELS, STRENGTH_LEVELS, GRIND_SIZES, METHOD_RECOMMENDED_GRIND } from "../core/rules";
import baseRecipes from "../data/baseRecipes.json";

const METHOD_LABELS = {
  v60: "V60 Pour Over",
  frenchPress: "French Press",
  aeropress: "AeroPress",
  coldBrew: "Cold Brew",
  mokaPot: "Moka Pot",
  chemex: "Chemex",
};

const ROAST_LABELS = { light: "Light", medium: "Medium", "medium-dark": "Medium Dark", dark: "Dark" };
const STRENGTH_LABELS = { mild: "Mild", balanced: "Balanced", strong: "Strong", espresso: "Espresso" };
const GRIND_LABELS = {
  "extra-coarse": "Extra Coarse",
  coarse: "Coarse",
  "medium-coarse": "Medium Coarse",
  medium: "Medium",
  "medium-fine": "Medium Fine",
  fine: "Fine",
  "extra-fine": "Extra Fine",
};

export default function InputForm({ onGenerate }) {
  const [form, setForm] = useState({
    method: "v60",
    roast: "medium",
    strength: "balanced",
    grind: "medium-fine",
    coffeeWeight: 15,
  });

  function handleChange(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // Auto-suggest grind when method changes
      if (field === "method") {
        next.grind = METHOD_RECOMMENDED_GRIND[value] || prev.grind;
      }
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onGenerate(form);
  }

  const recommendedGrind = METHOD_RECOMMENDED_GRIND[form.method];
  const isGrindMismatch = form.grind !== recommendedGrind;

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      {/* Brew Method */}
      <div className="form-group">
        <label className="form-label">Brew Method</label>
        <div className="method-grid">
          {BREW_METHODS.map((m) => (
            <button
              key={m}
              type="button"
              className={`method-btn ${form.method === m ? "selected" : ""}`}
              onClick={() => handleChange("method", m)}
            >
              {METHOD_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      {/* Roast Level */}
      <div className="form-group">
        <label className="form-label">Roast Level</label>
        <div className="pill-group">
          {ROAST_LEVELS.map((r) => (
            <button
              key={r}
              type="button"
              className={`pill ${form.roast === r ? "selected" : ""}`}
              onClick={() => handleChange("roast", r)}
            >
              {ROAST_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      {/* Strength */}
      <div className="form-group">
        <label className="form-label">Strength</label>
        <div className="pill-group">
          {STRENGTH_LEVELS.map((s) => (
            <button
              key={s}
              type="button"
              className={`pill ${form.strength === s ? "selected" : ""}`}
              onClick={() => handleChange("strength", s)}
            >
              {STRENGTH_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Grind Size */}
      <div className="form-group">
        <label className="form-label">
          Grind Size
          {isGrindMismatch && (
            <span className="grind-warning" title={`Recommended: ${GRIND_LABELS[recommendedGrind]}`}>
              ⚠ Recommended: {GRIND_LABELS[recommendedGrind]}
            </span>
          )}
        </label>
        <div className="grind-slider-wrap">
          <div className="grind-labels">
            <span>Coarsest</span>
            <span>Finest</span>
          </div>
          <input
            type="range"
            min={0}
            max={GRIND_SIZES.length - 1}
            value={GRIND_SIZES.indexOf(form.grind)}
            onChange={(e) => handleChange("grind", GRIND_SIZES[parseInt(e.target.value)])}
            className="grind-range"
          />
          <div className="grind-value">{GRIND_LABELS[form.grind]}</div>
        </div>
      </div>

      {/* Coffee Weight */}
      <div className="form-group">
        <label className="form-label">
          Coffee Weight
          <span className="form-sublabel">{form.coffeeWeight}g → ~{form.coffeeWeight * 16}ml water (est.)</span>
        </label>
        <div className="weight-slider-wrap">
          <input
            type="range"
            min={5}
            max={60}
            step={1}
            value={form.coffeeWeight}
            onChange={(e) => handleChange("coffeeWeight", parseInt(e.target.value))}
            className="weight-range"
          />
          <div className="weight-ticks">
            {[5, 15, 30, 45, 60].map((v) => (
              <span key={v}>{v}g</span>
            ))}
          </div>
        </div>
      </div>

      <button type="submit" className="generate-btn">
        Generate Recipe →
      </button>
    </form>
  );
}

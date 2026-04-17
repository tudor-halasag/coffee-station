import { formatBrewTime, estimateTDS, celsiusToF } from "../core/calculators";

const METHOD_ICONS = {
  v60: "🔻",
  frenchPress: "🫙",
  aeropress: "💉",
  coldBrew: "🧊",
  mokaPot: "🔥",
  chemex: "⚗️",
};

export default function RecipeOutput({ recipe }) {
  if (!recipe) return null;

  const { label, method, ratio, temperature, grind, brewTime, steps, coffeeWeight, waterWeight, explanations, adjustments } = recipe;

  return (
    <div className="recipe-output">
      <div className="recipe-header">
        <span className="recipe-icon">{METHOD_ICONS[method] || "☕"}</span>
        <div>
          <h2 className="recipe-title">{label}</h2>
          <p className="recipe-subtitle">Generated Recipe</p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="recipe-stats">
        <div className="stat">
          <span className="stat-value">{coffeeWeight}g</span>
          <span className="stat-label">Coffee</span>
        </div>
        <div className="stat-divider">:</div>
        <div className="stat">
          <span className="stat-value">{waterWeight}ml</span>
          <span className="stat-label">Water</span>
        </div>
        <div className="stat-separator" />
        <div className="stat">
          <span className="stat-value">{temperature}°C</span>
          <span className="stat-label">{celsiusToF(temperature)}°F</span>
        </div>
        <div className="stat-separator" />
        <div className="stat">
          <span className="stat-value">1:{ratio}</span>
          <span className="stat-label">Ratio</span>
        </div>
        <div className="stat-separator" />
        <div className="stat">
          <span className="stat-value">{formatBrewTime(brewTime)}</span>
          <span className="stat-label">Target Time</span>
        </div>
      </div>

      {/* TDS Estimate */}
      <div className="tds-bar">
        <span className="tds-label">Est. TDS:</span>
        <span className="tds-value">{estimateTDS(ratio)}</span>
      </div>

      {/* Adjustments Applied */}
      {adjustments && adjustments.length > 0 && (
        <div className="adjustments">
          <h4 className="section-heading">Adjustments Applied</h4>
          <div className="adjustment-chips">
            {adjustments.map((a, i) => (
              <div key={i} className="adjustment-chip">
                <span className="adj-label">{a.label}</span>
                <span className="adj-delta">{a.delta}</span>
                <span className="adj-reason">({a.reason})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brew Steps */}
      <div className="brew-steps">
        <h4 className="section-heading">Brew Steps</h4>
        <ol className="steps-list">
          {steps.map((step, i) => (
            <li key={i} className="step-item">
              <div className="step-time">{step.time}</div>
              <div className="step-content">
                <strong className="step-action">{step.action}</strong>
                <p className="step-detail">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Explanations */}
      {explanations && explanations.length > 0 && (
        <div className="explanations">
          <h4 className="section-heading">Why These Settings?</h4>
          {explanations.map((e, i) => (
            <div key={i} className={`explanation explanation--${e.type}`}>
              <span className="explanation-badge">{e.type}</span>
              <p>{e.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

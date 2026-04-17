import { useState } from "react";
import { calcWaterWeight, calcCoffeeWeight } from "../core/calculators";

export default function RatioCalculator() {
  const [mode, setMode] = useState("coffee"); // "coffee" or "water"
  const [coffeeWeight, setCoffeeWeight] = useState(15);
  const [waterWeight, setWaterWeight] = useState(240);
  const [ratio, setRatio] = useState(16);

  function handleCoffeeChange(val) {
    const c = Number(val);
    setCoffeeWeight(c);
    setWaterWeight(calcWaterWeight(c, ratio));
  }

  function handleWaterChange(val) {
    const w = Number(val);
    setWaterWeight(w);
    setCoffeeWeight(calcCoffeeWeight(w, ratio));
  }

  function handleRatioChange(val) {
    const r = Number(val);
    setRatio(r);
    setWaterWeight(calcWaterWeight(coffeeWeight, r));
  }

  const tiers = [
    { ratio: 12, label: "Espresso" },
    { ratio: 14, label: "Strong" },
    { ratio: 15, label: "Bold" },
    { ratio: 16, label: "Standard" },
    { ratio: 17, label: "Light" },
    { ratio: 18, label: "Mild" },
  ];

  return (
    <div className="ratio-calculator">
      <h3 className="calc-title">Ratio Calculator</h3>

      {/* Ratio presets */}
      <div className="ratio-presets">
        {tiers.map((t) => (
          <button
            key={t.ratio}
            type="button"
            className={`ratio-preset ${ratio === t.ratio ? "active" : ""}`}
            onClick={() => handleRatioChange(t.ratio)}
          >
            <span className="preset-ratio">1:{t.ratio}</span>
            <span className="preset-label">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Ratio Slider */}
      <div className="calc-row">
        <label>Ratio <strong>1:{ratio}</strong></label>
        <input
          type="range"
          min={8}
          max={20}
          step={0.5}
          value={ratio}
          onChange={(e) => handleRatioChange(e.target.value)}
          className="calc-range"
        />
      </div>

      {/* Inputs */}
      <div className="calc-inputs">
        <div className="calc-field">
          <label>Coffee (g)</label>
          <input
            type="number"
            value={coffeeWeight}
            min={5}
            max={100}
            onChange={(e) => handleCoffeeChange(e.target.value)}
            className="calc-number"
          />
        </div>
        <div className="calc-equals">×{ratio} =</div>
        <div className="calc-field">
          <label>Water (ml)</label>
          <input
            type="number"
            value={waterWeight}
            min={50}
            max={2000}
            onChange={(e) => handleWaterChange(e.target.value)}
            className="calc-number"
          />
        </div>
      </div>

      {/* Visual bar */}
      <div className="ratio-visual">
        <div
          className="ratio-bar ratio-bar--coffee"
          style={{ width: `${(1 / (ratio + 1)) * 100}%` }}
        >
          <span>Coffee</span>
        </div>
        <div
          className="ratio-bar ratio-bar--water"
          style={{ width: `${(ratio / (ratio + 1)) * 100}%` }}
        >
          <span>Water</span>
        </div>
      </div>
    </div>
  );
}

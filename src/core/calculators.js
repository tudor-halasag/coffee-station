/**
 * Utility calculators for brew parameters.
 */

/**
 * Calculate water weight from coffee weight and ratio.
 * ratio = water / coffee
 */
export function calcWaterWeight(coffeeWeight, ratio) {
  return Math.round(coffeeWeight * ratio);
}

/**
 * Calculate coffee weight from water weight and ratio.
 */
export function calcCoffeeWeight(waterWeight, ratio) {
  return Math.round(waterWeight / ratio);
}

/**
 * Format brew time from a string like "2:30" to human-readable.
 */
export function formatBrewTime(timeStr) {
  if (!timeStr) return "";
  const [min, sec] = timeStr.split(":").map(Number);
  if (min >= 60) {
    const hours = Math.floor(min / 60);
    const remainMin = min % 60;
    return remainMin > 0 ? `${hours}h ${remainMin}m` : `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  if (min === 0) return `${sec} seconds`;
  return sec === 0 ? `${min} minute${min > 1 ? "s" : ""}` : `${min}m ${sec}s`;
}

/**
 * Returns TDS estimate string based on ratio.
 * Rough approximation for UI purposes.
 */
export function estimateTDS(ratio) {
  if (ratio <= 10) return "Very High (>1.5%)";
  if (ratio <= 13) return "High (1.35–1.5%)";
  if (ratio <= 16) return "Ideal (1.15–1.35%)";
  if (ratio <= 18) return "Moderate (1.0–1.15%)";
  return "Low (<1.0%)";
}

/**
 * Celsius to Fahrenheit.
 */
export function celsiusToF(c) {
  return Math.round((c * 9) / 5 + 32);
}

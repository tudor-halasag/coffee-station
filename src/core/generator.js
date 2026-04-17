import baseRecipes from "../data/baseRecipes.json";
import modifiers from "../data/modifiers.json";

/**
 * Core brewing engine.
 * Takes user input and returns a fully modified recipe with explanations.
 */
export function generateRecipe(input) {
  const { method, roast, strength, grind, coffeeWeight = 15 } = input;

  const base = baseRecipes[method];
  if (!base) throw new Error(`Unknown brew method: ${method}`);

  // Clone base recipe
  let recipe = {
    method,
    label: base.label,
    ratio: base.ratio,
    temperature: base.temperature,
    grind: base.grind,
    brewTime: base.brewTime,
    steps: [...base.steps],
    coffeeWeight,
    explanations: [],
    adjustments: [],
  };

  // --- Apply Roast Modifier ---
  const roastMod = modifiers.roast[roast];
  if (roastMod && roastMod.temp !== 0) {
    recipe.temperature += roastMod.temp;
    recipe.explanations.push({ type: "roast", text: roastMod.explanation });
    recipe.adjustments.push({
      label: "Temperature",
      delta: roastMod.temp > 0 ? `+${roastMod.temp}°C` : `${roastMod.temp}°C`,
      reason: roast + " roast",
    });
  } else if (roastMod) {
    recipe.explanations.push({ type: "roast", text: roastMod.explanation });
  }

  // --- Apply Strength Modifier ---
  const strengthMod = modifiers.strength[strength];
  if (strengthMod && strengthMod.ratio !== 0) {
    recipe.ratio += strengthMod.ratio;
    recipe.explanations.push({ type: "strength", text: strengthMod.explanation });
    recipe.adjustments.push({
      label: "Ratio",
      delta: strengthMod.ratio > 0 ? `+${strengthMod.ratio}` : `${strengthMod.ratio}`,
      reason: strength + " strength",
    });
  } else if (strengthMod) {
    recipe.explanations.push({ type: "strength", text: strengthMod.explanation });
  }

  // --- Apply Grind Modifier (note-only unless method grind differs) ---
  const grindMod = modifiers.grind[grind];
  if (grindMod) {
    if (grind !== base.grind) {
      recipe.grind = grind;
      recipe.explanations.push({ type: "grind", text: grindMod.explanation });
      recipe.adjustments.push({
        label: "Grind",
        delta: grind,
        reason: `adjusted from ${base.grind}`,
      });
    }
  }

  // --- Compute water weight from ratio ---
  recipe.waterWeight = Math.round(recipe.coffeeWeight * recipe.ratio);

  // --- Clamp temperature to safe range ---
  recipe.temperature = Math.min(Math.max(recipe.temperature, 80), 100);

  // --- Timestamp for saving ---
  recipe.createdAt = new Date().toISOString();
  recipe.id = `${method}-${Date.now()}`;

  return recipe;
}

/**
 * Returns all available methods with labels.
 */
export function getMethods() {
  return Object.entries(baseRecipes).map(([key, val]) => ({
    value: key,
    label: val.label,
  }));
}

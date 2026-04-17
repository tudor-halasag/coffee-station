/**
 * Validation and rule enforcement for brew inputs.
 */

export const BREW_METHODS = ["v60", "frenchPress", "aeropress", "coldBrew", "mokaPot", "chemex"];
export const ROAST_LEVELS = ["light", "medium", "medium-dark", "dark"];
export const STRENGTH_LEVELS = ["mild", "balanced", "strong", "espresso"];
export const GRIND_SIZES = [
  "extra-coarse",
  "coarse",
  "medium-coarse",
  "medium",
  "medium-fine",
  "fine",
  "extra-fine",
];

export const METHOD_RECOMMENDED_GRIND = {
  v60: "medium-fine",
  frenchPress: "coarse",
  aeropress: "medium-fine",
  coldBrew: "extra-coarse",
  mokaPot: "fine",
  chemex: "medium-coarse",
};

export function validateInput(input) {
  const errors = [];
  if (!BREW_METHODS.includes(input.method)) errors.push("Invalid brew method.");
  if (!ROAST_LEVELS.includes(input.roast)) errors.push("Invalid roast level.");
  if (!STRENGTH_LEVELS.includes(input.strength)) errors.push("Invalid strength.");
  if (!GRIND_SIZES.includes(input.grind)) errors.push("Invalid grind size.");
  if (input.coffeeWeight < 5 || input.coffeeWeight > 100)
    errors.push("Coffee weight must be between 5g and 100g.");
  return errors;
}

/**
 * Returns a compatibility warning if grind and method are mismatched.
 */
export function grindMethodWarning(method, grind) {
  const recommended = METHOD_RECOMMENDED_GRIND[method];
  if (!recommended || recommended === grind) return null;
  return `${method} typically uses ${recommended} grind. ${grind} may affect extraction.`;
}

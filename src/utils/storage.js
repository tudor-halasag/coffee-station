const STORAGE_KEY = "coffeeStation_recipes";

export function saveRecipe(recipe) {
  const saved = getSavedRecipes();
  const updated = [recipe, ...saved].slice(0, 50); // max 50 saved
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getSavedRecipes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function deleteRecipe(id) {
  const saved = getSavedRecipes().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

export function clearAllRecipes() {
  localStorage.removeItem(STORAGE_KEY);
}

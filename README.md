# ☕ Coffee Station

A coffee brewing platform built with React + Vite. Dial in your perfect cup with a rule-based recipe engine, interactive origin map, drink catalog, and brewing knowledge base.

**Live site:** https://[your-username].github.io/coffee-station/

---

## Features

- **Brew Studio** — Generate recipes dynamically based on method, roast, strength, and grind. Explains every adjustment made.
- **Ratio Calculator** — Slider-based tool for scaling coffee-to-water ratios.
- **Brew Timer** — Animated countdown timer with progress ring.
- **Save & Export** — Save recipes to localStorage; export as JSON.
- **Origins Map** — Interactive SVG world map with filterable coffee origins.
- **Learn** — Coffee history, processing methods, varietals, and extraction science.
- **Drink Catalog** — Milk-based, cold, and experimental drinks with step-by-step instructions.

## Stack

- React 18 + Vite 5
- React Router v6
- Pure CSS (no framework)
- localStorage for persistence
- No backend

## Local Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This repo uses GitHub Actions to auto-deploy on push to `main`.

### Setup (one-time):
1. Push this repo to GitHub as `coffee-station`
2. Go to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Push to `main` — the workflow will build and deploy automatically

Your site will be live at:
```
https://<your-username>.github.io/coffee-station/
```

## Project Structure

```
src/
├── core/           # Brewing engine (generator, rules, calculators)
├── data/           # JSON data (recipes, modifiers, coffeeDB, drinks, map)
├── components/     # InputForm, RecipeOutput, RatioCalculator, SaveButton, BrewTimer, Navbar
├── pages/          # Brew, Learn, Map, Drinks
└── utils/          # storage.js, export.js
```

## Extending

- Add brew methods: edit `src/data/baseRecipes.json`
- Add modifiers: edit `src/data/modifiers.json`
- Add origins: edit `src/data/coffeeDB.json`
- Add drinks: edit `src/data/drinks.json`

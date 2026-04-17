import { useState } from "react";

const sections = [
  {
    id: "history",
    title: "The History of Coffee",
    icon: "📜",
    content: [
      {
        heading: "Origins in Ethiopia",
        body: "The story of coffee begins in the highlands of Ethiopia, around the 9th century, where legend tells of a goat herder named Kaldi who noticed his goats became unusually energetic after eating berries from a particular tree. He brought the berries to a local monastery, where monks made a drink from them and found it helped them stay alert through long evening prayers. Whether legend or fact, Ethiopia remains the genetic origin of all Coffea arabica plants in the world today.",
      },
      {
        heading: "The Arabian Peninsula",
        body: "By the 15th century, coffee cultivation and trade had spread to the Arabian Peninsula, particularly in Yemen. Sufi monasteries used coffee to aid concentration during nighttime devotions. The first coffee houses — called qahveh khaneh — appeared in cities across the Near East and became vital centers of social activity, earning the name 'Schools of the Wise.' Coffee houses were places for chess, music, conversation, and the exchange of information.",
      },
      {
        heading: "Europe & the World",
        body: "Coffee arrived in Europe via Ottoman trade routes in the 17th century and quickly became the social drink of choice. London's first coffee house opened in 1652, and by 1675 there were over 300 in the city. They served as intellectual hubs where business was conducted, news shared, and ideas debated — Lloyd's of London insurance market famously started as a coffee house. Coffee traveled to the Americas with European colonizers, and by the 18th century, Brazil had become the world's dominant producer, a position it holds today.",
      },
    ],
  },
  {
    id: "processing",
    title: "Coffee Processing",
    icon: "⚙️",
    content: [
      {
        heading: "Washed (Wet) Process",
        body: "In washed processing, the coffee cherry's fruit is removed before the bean is dried. After picking, cherries are de-pulped to remove the outer skin, then fermented in water tanks for 24–72 hours to break down the remaining mucilage layer. The beans are then thoroughly washed and dried on raised beds or patios. Washed coffees are praised for their clean, bright, and transparent flavor — the origin's terroir and varietal characteristics come through with great clarity. Ethiopia and Colombia are known for exceptional washed coffees.",
      },
      {
        heading: "Natural (Dry) Process",
        body: "In natural processing, the entire coffee cherry is dried whole in the sun — sometimes for 3–6 weeks — before the fruit is removed. During this time, the sugars from the fruit ferment into the bean, creating intense sweetness, heavy body, and complex fruit-forward flavors. Natural coffees often exhibit wine-like, blueberry, or tropical fruit notes. Ethiopia's Harrar and Brazil's natural-processed beans are classic examples. The process requires careful monitoring to avoid defects, but the results can be extraordinary.",
      },
      {
        heading: "Honey Process",
        body: "Honey processing is a middle path between washed and natural. The cherry's outer skin is removed but some or all of the mucilage (the sticky, honey-like layer) is left on the bean during drying. Yellow honey (less mucilage) produces cleaner cups; red honey (more mucilage) adds sweetness and body; black honey (nearly all mucilage retained) approaches natural process intensity. Costa Rica and El Salvador are famous for honey-processed coffees that balance clarity with sweetness.",
      },
      {
        heading: "Wet-Hulled (Giling Basah)",
        body: "Unique to Indonesia, wet-hulling involves removing the parchment layer from the coffee bean while it still contains significant moisture (30–50%). The beans are then dried to completion. This process creates the distinctive heavy body, low acidity, and earthy, cedary flavor profile that defines Sumatran and Sulawesi coffees. The high-moisture hulling causes physical changes to the bean's cell structure, producing coffees unlike those from any other process in the world.",
      },
    ],
  },
  {
    id: "science",
    title: "The Science of Extraction",
    icon: "🔬",
    content: [
      {
        heading: "What Is Extraction?",
        body: "Coffee extraction is the process of dissolving soluble compounds from roasted ground coffee into water. Roasted coffee is about 30% water-soluble — but not all solubles taste good. The goal is to extract the right compounds in the right proportions. Under-extracted coffee (too little dissolved) tastes sour, salty, and thin. Over-extracted coffee (too much dissolved) tastes bitter, dry, and harsh. The sweet spot — called the 'extraction yield' — is typically between 18–22% of the coffee's weight dissolved into the water.",
      },
      {
        heading: "The Role of Temperature",
        body: "Water temperature is one of the most powerful variables in extraction. Higher temperatures extract more compounds faster. For light roasts, which are denser and less soluble, higher temperatures (93–96°C) are needed to unlock flavor compounds. For dark roasts, which are more porous and soluble, lower temperatures (88–92°C) prevent over-extraction of bitter compounds. Cold brew, brewed at 4°C over 12–24 hours, extracts a completely different flavor profile — lower acidity, less bitterness, and a smooth, chocolatey sweetness.",
      },
      {
        heading: "Grind Size & Surface Area",
        body: "Grind size determines the surface area of coffee exposed to water. A finer grind dramatically increases surface area, speeding extraction — ideal for espresso's 25–30 second brew time. A coarser grind reduces surface area, slowing extraction — essential for French press's 4-minute steep. Using a fine grind in a French press leads to over-extraction and bitterness. Using a coarse grind in espresso leads to under-extraction and sourness. Matching grind to method is non-negotiable for quality coffee.",
      },
      {
        heading: "The Coffee-to-Water Ratio",
        body: "The ratio of coffee to water — typically expressed as grams per liter or as a ratio like 1:15 — determines the strength and body of the final cup. The Specialty Coffee Association recommends 55g per liter (approximately 1:18) as a starting point for filter coffee, but preferences vary widely. A lower ratio (1:12–1:14) produces a concentrated, bold cup. A higher ratio (1:17–1:20) produces a lighter, more delicate cup. Understanding ratio allows you to replicate a great cup consistently.",
      },
    ],
  },
  {
    id: "varietals",
    title: "Coffee Varietals",
    icon: "🌿",
    content: [
      {
        heading: "Arabica vs Robusta",
        body: "Coffea arabica accounts for about 70% of global coffee production and is prized for its complex flavors, natural sweetness, and lower caffeine content (about 1.5%). It grows at high altitudes (1000–2500m) and requires specific conditions — cool temperatures, consistent rainfall, and rich soil. Coffea canephora (Robusta) is hardier, more resistant to disease, and contains nearly double the caffeine (~2.7%). Robusta has an earthier, more bitter flavor and is used heavily in espresso blends for its crema and body.",
      },
      {
        heading: "Geisha / Gesha",
        body: "Originally from the Gesha region of Ethiopia, the Geisha varietal was transplanted to Panama in the 1960s and largely forgotten until Hacienda La Esmeralda's 2004 auction shocked the specialty coffee world. Geisha produces extraordinarily delicate, floral, tea-like cups with jasmine, bergamot, and stone fruit notes — unlike anything else in coffee. Today, a single pound of top-tier Geisha can sell for over $1,000 at auction, making it the world's most expensive coffee varietal.",
      },
      {
        heading: "Bourbon & Typica",
        body: "Bourbon and Typica are two of the oldest and most widely planted Arabica varietals. Typica, brought from Yemen to India and then to the Americas, is the genetic ancestor of many modern varietals. It produces clean, sweet, and balanced cups. Bourbon, a natural mutation of Typica first cultivated on the island of Réunion (formerly Bourbon), produces sweeter, more nuanced flavor profiles. Many beloved Latin American coffees — including those from Guatemala, El Salvador, and Rwanda — are grown from Bourbon stock.",
      },
    ],
  },
];

export default function Learn() {
  const [active, setActive] = useState("history");
  const [expanded, setExpanded] = useState({});

  const section = sections.find((s) => s.id === active);

  function toggleExpand(heading) {
    setExpanded((prev) => ({ ...prev, [heading]: !prev[heading] }));
  }

  return (
    <div className="learn-page">
      <div className="learn-sidebar">
        <h1 className="page-title">Learn</h1>
        <p className="page-subtitle">The world of coffee, explained</p>
        <nav className="learn-nav">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`learn-nav-btn ${active === s.id ? "active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              <span>{s.icon}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </nav>
      </div>

      <article className="learn-content">
        <div className="learn-header">
          <span className="learn-icon">{section.icon}</span>
          <h2>{section.title}</h2>
        </div>
        <div className="learn-sections">
          {section.content.map((item) => (
            <div key={item.heading} className="learn-card">
              <button
                className="learn-card-header"
                onClick={() => toggleExpand(item.heading)}
              >
                <h3>{item.heading}</h3>
                <span className="expand-icon">{expanded[item.heading] ? "−" : "+"}</span>
              </button>
              {expanded[item.heading] !== false && (
                <div className="learn-card-body">
                  <p>{item.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

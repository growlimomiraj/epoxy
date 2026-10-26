export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  skuSuffix: string;
  coverageNote: string;
  swatchHex?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  shortTitle: string;
  category:
    | '100% Solids Epoxy'
    | 'Polyaspartic & Urethane'
    | 'Garage Floor Kits'
    | 'Metallic & Flakes'
    | 'Stains & Sealers'
    | 'Surface Prep & Grinders'
    | 'Install Tools';
  price: number;
  unitLabel: string;
  rating: number;
  reviewsCount: number;
  bestsellerRank: number;
  cureSpeed: 'Fast-Cure (Same Day)' | 'Standard (12-24 Hr)' | 'Deep Cure (48 Hr)' | 'Hardware / Prep';
  substrate: string[];
  willCallStock: number;
  illustrationType:
    | 'epoxy-kit'
    | 'polyaspartic-kit'
    | 'garage-box'
    | 'urethane-pail'
    | 'metallic-jar'
    | 'deep-pour'
    | 'flake-box'
    | 'mvb-primer'
    | 'stain-pail'
    | 'grinder-bundle'
    | 'crack-cartridge'
    | 'tool-bundle';
  summary: string;
  kickerText: string;
  specs: {
    mixRatio: string;
    potLife: string;
    coveragePerUnit: string;
    cureSchedule: string;
    solidsContent: string;
    vocContent: string;
  };
  variants: ProductVariant[];
  tdsHighlights: string[];
  sdsSummary: {
    signalWord: string;
    ppeRequired: string;
    storageTemp: string;
    unNumber: string;
  };
}

export const WAREHOUSE_CATEGORIES = [
  'All Warehouse',
  '100% Solids Epoxy',
  'Polyaspartic & Urethane',
  'Garage Floor Kits',
  'Metallic & Flakes',
  'Stains & Sealers',
  'Surface Prep & Grinders',
  'Install Tools',
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'e4e-100-epoxy',
    sku: 'EDC-E4E100',
    name: 'E4E-100 · 100% Solids Professional Epoxy Kit (3-Gal Kit / 15-Gal Drum)',
    shortTitle: 'E4E-100 100% Solids Epoxy',
    category: '100% Solids Epoxy',
    price: 189.99,
    unitLabel: '3-Gal A+B Kit',
    rating: 4.9,
    reviewsCount: 94,
    bestsellerRank: 1,
    cureSpeed: 'Standard (12-24 Hr)',
    substrate: ['Bare Concrete', 'Diamond-Ground Slab', 'Commercial Bay'],
    willCallStock: 68,
    illustrationType: 'epoxy-kit',
    summary: 'High-build self-leveling Cycloaliphatic base and mid-coat resin. Zero VOC, non-blushing, high chemical resistance for garages, warehouses, and metallic systems.',
    kickerText: '100% Solids · Lot-Traceable · Same-Day Will-Call',
    specs: {
      mixRatio: '2:1 by Volume (2 Gal Part A : 1 Gal Part B)',
      potLife: '35–40 Min at 75°F (24°C)',
      coveragePerUnit: '300–480 Sq. Ft. per 3-Gal Kit (10–16 mils)',
      cureSchedule: 'Tack-Free 8 hrs · Foot Traffic 16 hrs · Vehicle 48 hrs',
      solidsContent: '100% Reactive Solids',
      vocContent: '< 5 g/L (AQMD Super-Compliant)',
    },
    variants: [
      { id: '3gal-clear', label: '3-Gal Kit · Crystal Clear', price: 189.99, skuSuffix: '-3CL', coverageNote: 'Covers 350–450 sq. ft.' },
      { id: '3gal-gray', label: '3-Gal Kit · Industrial Gray', price: 199.99, skuSuffix: '-3GR', coverageNote: 'Covers 350–450 sq. ft.', swatchHex: '#94A3B8' },
      { id: '3gal-tan', label: '3-Gal Kit · Mojave Tan', price: 199.99, skuSuffix: '-3TN', coverageNote: 'Covers 350–450 sq. ft.', swatchHex: '#D6B88D' },
      { id: '15gal-drum', label: '15-Gal Pro Drum Kit (A+B)', price: 879.00, skuSuffix: '-15DR', coverageNote: 'Covers 1,800–2,250 sq. ft.' },
    ],
    tdsHighlights: [
      'Prepare concrete to CSP 2–3 profile via planetary diamond grinding before application.',
      'Mix Part A and Part B with a low-speed Jiffy mixer (350 RPM) for 3 full minutes; pour immediately in ribbon onto slab.',
      'Compressive Strength (ASTM D695): 11,800 psi · Shore D Hardness: 84.',
    ],
    sdsSummary: {
      signalWord: 'WARNING — Skin & Eye Sensitizer (Uncured Resin)',
      ppeRequired: 'Nitrile gloves, safety glasses, organic vapor respirator in enclosed spaces',
      storageTemp: '55°F to 85°F (13°C to 29°C) dry indoor warehouse',
      unNumber: 'Non-Regulated DOT Ground Freight (Class 55)',
    },
  },
  {
    id: 'poly-85-uv',
    sku: 'EDC-POLY85',
    name: 'Polyaspartic 85% Solids Fast-Cure UV Topcoat (2-Gal Kit / 10-Gal Kit)',
    shortTitle: 'Polyaspartic 85% UV Topcoat',
    category: 'Polyaspartic & Urethane',
    price: 249.00,
    unitLabel: '2-Gal A+B Kit',
    rating: 5.0,
    reviewsCount: 81,
    bestsellerRank: 2,
    cureSpeed: 'Fast-Cure (Same Day)',
    substrate: ['Vinyl Flake Broadcast', 'Quartz Broadcast', 'Exterior Patio / Driveway'],
    willCallStock: 52,
    illustrationType: 'polyaspartic-kit',
    summary: 'Same-day return to service, 100% UV-stable aliphatic polyaspartic topcoat. Won’t amber in Bakersfield or Southern California sun; hot-tire and battery-acid proof.',
    kickerText: 'UV-Stable · 1-Day Garage Turnaround · Zero Ambering',
    specs: {
      mixRatio: '1:1 by Volume (1 Gal Part A : 1 Gal Part B)',
      potLife: '25–30 Min Working Time on Floor',
      coveragePerUnit: '300–400 Sq. Ft. per 2-Gal Kit over 1/4" Flake',
      cureSchedule: 'Recoat 2–3 hrs · Walk-On 4 hrs · Drive-On 24 hrs',
      solidsContent: '85% High-Solids Aliphatic',
      vocContent: '< 50 g/L California South Coast Compliant',
    },
    variants: [
      { id: '2gal-clear', label: '2-Gal Kit · Optical Clear', price: 249.00, skuSuffix: '-2CL', coverageNote: 'Covers 300–400 sq. ft.' },
      { id: '2gal-slow', label: '2-Gal Kit · Desert Slow-Cure (90°F+)', price: 259.00, skuSuffix: '-2SC', coverageNote: 'Extended summer roll time' },
      { id: '10gal-pro', label: '10-Gal Crew Bulk Kit', price: 1149.00, skuSuffix: '-10BK', coverageNote: 'Covers 1,600–2,000 sq. ft.' },
    ],
    tdsHighlights: [
      'Scrape full flake broadcast in two perpendicular directions and vacuum thoroughly before topcoating.',
      'Pour in 4-inch ribbons, spread with soft squeegee, and immediately cross-roll with 3/8" shed-resistant nap roller.',
      'Taber Abrasion (ASTM D4060): 18 mg loss (CS-17 wheel, 1000g, 1000 cycles).',
    ],
    sdsSummary: {
      signalWord: 'DANGER — Contains Hexamethylene Diisocyanate Homopolymer (Part B)',
      ppeRequired: 'Chemical-resistant gloves, eye protection, NIOSH dual-cartridge respirator',
      storageTemp: 'Keep containers tightly sealed away from moisture (50°F–80°F)',
      unNumber: 'UN1263 Paint Related Material, Class 3, PG III',
    },
  },
  {
    id: '2car-flake-kit',
    sku: 'EDC-GAR550',
    name: 'Complete 2-Car Garage Flake Floor Kit (Covers up to 550 Sq. Ft.)',
    shortTitle: '2-Car Garage Full-Broadcast Kit',
    category: 'Garage Floor Kits',
    price: 429.00,
    unitLabel: 'Complete 550 Sq.Ft. System',
    rating: 4.9,
    reviewsCount: 112,
    bestsellerRank: 3,
    cureSpeed: 'Fast-Cure (Same Day)',
    substrate: ['Residential Garage', 'Workshop Slab', 'Patio Concrete'],
    willCallStock: 34,
    illustrationType: 'garage-box',
    summary: 'All-in-one palletized box: tinted 100% solids base coat, 40 lbs of 1/4" architectural vinyl flake, UV polyaspartic clear topcoat, spike shoes, squeegee & rollers.',
    kickerText: 'All-In-One System · Pre-Measured Ratios · DIY & Pro Favorite',
    specs: {
      mixRatio: 'Pre-measured A+B Base & 1:1 Polyaspartic Topcoat',
      potLife: '35 Min Base Coat / 25 Min Topcoat',
      coveragePerUnit: 'Up to 550 Sq. Ft. (Standard 2-Car Garage)',
      cureSchedule: 'Foot Traffic 6 hrs after Topcoat · Vehicle 24 hrs',
      solidsContent: '100% Solids Base + 85% Solids UV Topcoat',
      vocContent: 'CA Compliant Low-Odor Formula',
    },
    variants: [
      { id: 'kit-domino', label: 'Domino Blend (Black/White/Gray)', price: 429.00, skuSuffix: '-DOM', coverageNote: '550 sq. ft. full broadcast', swatchHex: '#475569' },
      { id: 'kit-desert', label: 'Desert Tan Blend (Sand/Saddle/Cream)', price: 429.00, skuSuffix: '-DST', coverageNote: '550 sq. ft. full broadcast', swatchHex: '#C29B61' },
      { id: 'kit-granite', label: 'Granite Blend (Charcoal/Silver/Quartz)', price: 429.00, skuSuffix: '-GRN', coverageNote: '550 sq. ft. full broadcast', swatchHex: '#64748B' },
      { id: 'kit-nightfall', label: 'Nightfall Blend (Obsidian/Cobalt/Slate)', price: 439.00, skuSuffix: '-NGT', coverageNote: '550 sq. ft. full broadcast', swatchHex: '#1E293B' },
    ],
    tdsHighlights: [
      'Includes step-by-step Bakersfield Tech Desk laminated install sheet and direct installer hotline support.',
      'Broadcast flake to refusal (approx. 7–8 lbs per 100 sq. ft.) into wet base coat while wearing included spike shoes.',
      'Resists hot radial tires, brake fluid, gasoline, road salt, and Skydrol.',
    ],
    sdsSummary: {
      signalWord: 'WARNING — Multi-Component Coating Kit',
      ppeRequired: 'Included nitrile gloves + safety glasses recommended',
      storageTemp: 'Store indoors between 55°F and 85°F',
      unNumber: 'Ground Kit Shipper · Call for Multi-Kit Pallet Rate',
    },
  },
  {
    id: 'aliphatic-urethane',
    sku: 'EDC-URE300',
    name: 'High-Wear Aliphatic Urethane Topcoat (Matte / Satin / High Gloss)',
    shortTitle: 'High-Wear Aliphatic Urethane',
    category: 'Polyaspartic & Urethane',
    price: 215.00,
    unitLabel: '3-Gal A+B Kit',
    rating: 4.8,
    reviewsCount: 47,
    bestsellerRank: 6,
    cureSpeed: 'Standard (12-24 Hr)',
    substrate: ['Metallic Epoxy Floors', 'Auto Service Bays', 'Showrooms & Retail'],
    willCallStock: 41,
    illustrationType: 'urethane-pail',
    summary: 'Extreme abrasion and chemical armor for commercial aisles, aircraft hangars, and metallic epoxy floors. Optional aluminum-oxide micro-bead traction additive included.',
    kickerText: 'Scratch Armor · Chemical Proof · Matte, Satin or Gloss',
    specs: {
      mixRatio: '2:1 by Volume',
      potLife: '45 Min at 72°F',
      coveragePerUnit: '450–600 Sq. Ft. per Gal (3–4 mils DFT)',
      cureSchedule: 'Light Foot Traffic 12 hrs · Forklift Traffic 36 hrs',
      solidsContent: '72% Solids Polyester-Aliphatic Polyurethane',
      vocContent: '< 50 g/L AQMD Compliant',
    },
    variants: [
      { id: 'ure-gloss', label: 'High-Gloss Showroom Finish', price: 215.00, skuSuffix: '-GLS', coverageNote: 'Covers 1,200–1,500 sq. ft.' },
      { id: 'ure-satin', label: 'Architectural Satin Finish (+Micro-Grip)', price: 225.00, skuSuffix: '-SAT', coverageNote: 'Covers 1,200–1,500 sq. ft.' },
      { id: 'ure-matte', label: 'Designer Ultra-Matte Finish', price: 229.00, skuSuffix: '-MAT', coverageNote: 'Covers 1,200–1,500 sq. ft.' },
    ],
    tdsHighlights: [
      'Apply thin, uniform film using a 1/4" short-nap mohair roller; never puddle urethane topcoats.',
      'Ideal final protective sacrifice coat over Metallic Epoxy to prevent micro-scratches from chairs and foot traffic.',
      'Passes ASTM D1308 24-hour spot test against MEK, hydraulic fluid, and 30% sulfuric acid.',
    ],
    sdsSummary: {
      signalWord: 'WARNING — Aliphatic Polyisocyanate Cure System',
      ppeRequired: 'Gloves, eye protection, adequate cross-ventilation',
      storageTemp: '60°F–80°F dry storage',
      unNumber: 'UN1263 Class 3',
    },
  },
  {
    id: 'metallic-pigment-pack',
    sku: 'EDC-MET32',
    name: 'Metallic Epoxy Reflective Pigment Pack (Covers 3-Gal Kit)',
    shortTitle: 'Metallic Reflective Pigment Pack',
    category: 'Metallic & Flakes',
    price: 64.99,
    unitLabel: '32-oz Heavy-Load Jar',
    rating: 4.9,
    reviewsCount: 138,
    bestsellerRank: 4,
    cureSpeed: 'Hardware / Prep',
    substrate: ['Clear 100% Solids Epoxy', 'Deep-Pour Countertop Resin'],
    willCallStock: 120,
    illustrationType: 'metallic-jar',
    summary: '3D pearlescent mineral mica engineered for deep volcanic craters, molten marble veins, and ocean wave effects when dispersed in E4E-100 Clear Epoxy.',
    kickerText: 'High-Density Mica · True 3D Depth · 5 Signature Swatches',
    specs: {
      mixRatio: '1 Jar (32 oz) per 3-Gal Clear Epoxy Kit',
      potLife: 'Matches Host Resin',
      coveragePerUnit: 'Pigments 3 Gallons (180–240 Sq. Ft. Flood Coat)',
      cureSchedule: 'Matches Host Resin',
      solidsContent: '100% Pure Mineral Pearlescent Mica',
      vocContent: '0 g/L Zero VOC Pigment',
    },
    variants: [
      { id: 'met-copper', label: 'Copper Penny', price: 64.99, skuSuffix: '-CPR', coverageNote: '1 Jar per 3-Gal Kit', swatchHex: '#B45309' },
      { id: 'met-pearl', label: 'Pure Pearl White', price: 64.99, skuSuffix: '-PRL', coverageNote: '1 Jar per 3-Gal Kit', swatchHex: '#E2E8F0' },
      { id: 'met-champagne', label: 'Liquid Champagne Gold', price: 64.99, skuSuffix: '-CHM', coverageNote: '1 Jar per 3-Gal Kit', swatchHex: '#D97706' },
      { id: 'met-platinum', label: ' Gunmetal Platinum', price: 64.99, skuSuffix: '-PLT', coverageNote: '1 Jar per 3-Gal Kit', swatchHex: '#64748B' },
      { id: 'met-ocean', label: 'Pacific Ocean Blue', price: 64.99, skuSuffix: '-OCN', coverageNote: '1 Jar per 3-Gal Kit', swatchHex: '#0284C7' },
    ],
    tdsHighlights: [
      'Always apply a solid black or dark gray epoxy primer coat first for maximum 3D metallic contrast.',
      'Mix pigment into Part A resin prior to adding Part B hardener to prevent air entrapment and ensure silky dispersion.',
      'Mist 99% isopropyl alcohol post-roll to open organic metallic cells and marble lacing.',
    ],
    sdsSummary: {
      signalWord: 'NON-HAZARDOUS — Cosmetic/Industrial Grade Mica',
      ppeRequired: 'Dust mask when pouring dry powder',
      storageTemp: 'Indefinite shelf life when kept dry',
      unNumber: 'Not Regulated',
    },
  },
  {
    id: 'deep-pour-resin',
    sku: 'EDC-DP300',
    name: 'Deep-Pour & Flood-Coat Bar/Table Top Clear Resin (3-Gal Kit)',
    shortTitle: 'Deep-Pour Bar & River Table Resin',
    category: '100% Solids Epoxy',
    price: 195.00,
    unitLabel: '3-Gal Crystal Kit',
    rating: 4.9,
    reviewsCount: 63,
    bestsellerRank: 8,
    cureSpeed: 'Deep Cure (48 Hr)',
    substrate: ['Live-Edge Wood Slabs', 'Bar Tops & Countertops', 'Encapsulation Art'],
    willCallStock: 29,
    illustrationType: 'deep-pour',
    summary: 'Water-clear, low-exotherm casting and flood-coat resin. Self-degassing viscosity releases micro-bubbles naturally without overheating on pours up to 2 inches thick.',
    kickerText: 'Optical Glass Clarity · Bubble-Free Release · UV HALS Stabilized',
    specs: {
      mixRatio: '2:1 by Volume',
      potLife: '60–90 Min Extended Working Window',
      coveragePerUnit: '144 Sq. Ft. at 1/8" Flood Coat or 690 Cu. In. Deep Pour',
      cureSchedule: 'Demold / Sand in 48–72 Hours at 72°F',
      solidsContent: '100% Virgin Optical Epoxy',
      vocContent: '0 g/L Odorless Indoor Safe',
    },
    variants: [
      { id: 'dp-flood', label: '3-Gal Flood-Coat Formula (Bar/Countertop)', price: 195.00, skuSuffix: '-FLD', coverageNote: 'Self-levels at 1/8" thickness' },
      { id: 'dp-river', label: '3-Gal Deep-Cast 2" River Table Formula', price: 210.00, skuSuffix: '-RVR', coverageNote: 'Single-pour up to 2" deep' },
    ],
    tdsHighlights: [
      'Seal porous live-edge wood bark/edges with a thin brush coat 4 hours before pouring deep river channel.',
      'Pass a propane torch or heat gun lightly 6 inches above surface 15 minutes after pour to pop surface tension bubbles.',
      'Polishes to a wet mirror gloss using 1500–3000 grit wet sanding and buffing compound.',
    ],
    sdsSummary: {
      signalWord: 'WARNING — Mild Skin Irritant Before Cure',
      ppeRequired: 'Nitrile gloves, eye protection',
      storageTemp: '65°F–78°F room temperature prior to mixing',
      unNumber: 'Non-Regulated DOT Ground',
    },
  },
  {
    id: 'vinyl-flake-bulk',
    sku: 'EDC-FLK40',
    name: 'Decorative Vinyl Flake 40-lb Bulk Box (1/4" & 1/8" Chip)',
    shortTitle: '40-lb Decorative Vinyl Flake Box',
    category: 'Metallic & Flakes',
    price: 118.00,
    unitLabel: '40-lb Contractor Box',
    rating: 5.0,
    reviewsCount: 156,
    bestsellerRank: 5,
    cureSpeed: 'Hardware / Prep',
    substrate: ['Epoxy Base Coat', 'Polyaspartic Base Coat', 'Cove Base'],
    willCallStock: 215,
    illustrationType: 'flake-box',
    summary: 'Through-colored architectural acrylic-vinyl chips that never bleed or fade when scraped. Random fracture shapes nest flat for fast, low-consumption topcoating.',
    kickerText: '40-lb Bulk Box · Through-Color Pigmented · 1/4" or 1/8" Cut',
    specs: {
      mixRatio: 'Full Broadcast: 1 Box per 500–550 Sq. Ft.',
      potLife: 'Broadcast into wet epoxy/polyaspartic',
      coveragePerUnit: '500–550 Sq. Ft. Full Rejection / 2,500 Sq. Ft. Partial',
      cureSchedule: 'Scrape after base coat cures',
      solidsContent: '100% UV-Inert Vinyl-Acrylic Polymer',
      vocContent: '0 g/L Inert Aggregate',
    },
    variants: [
      { id: 'flk-domino', label: '1/4" Domino (Black/White/Silver)', price: 118.00, skuSuffix: '-DOM25', coverageNote: '40-lb box · 550 sq.ft.', swatchHex: '#475569' },
      { id: 'flk-desert', label: '1/4" Desert Tan (Sand/Tan/Cream)', price: 118.00, skuSuffix: '-DST25', coverageNote: '40-lb box · 550 sq.ft.', swatchHex: '#C29B61' },
      { id: 'flk-granite', label: '1/8" Micro Granite (Charcoal/Ash)', price: 122.00, skuSuffix: '-GRN12', coverageNote: '40-lb box · 500 sq.ft.', swatchHex: '#64748B' },
      { id: 'flk-nightfall', label: '1/4" Nightfall (Midnight/Slate/Ice)', price: 118.00, skuSuffix: '-NGT25', coverageNote: '40-lb box · 550 sq.ft.', swatchHex: '#1E293B' },
      { id: 'flk-tidal', label: '1/4" Tidal Wave (Navy/Sky/Pearl)', price: 124.00, skuSuffix: '-TDL25', coverageNote: '40-lb box · 550 sq.ft.', swatchHex: '#0369A1' },
    ],
    tdsHighlights: [
      'Toss flakes upward ("feed the chickens") rather than throwing down at an angle to prevent clumping or bare ribs.',
      'Reclaim unbonded flakes with a leaf blower or shop vac prior to metal-blade scraping.',
      'Compressive & impact cushioning reduces tool drop damage on concrete slabs.',
    ],
    sdsSummary: {
      signalWord: 'NON-HAZARDOUS — Solid Polymer Flake',
      ppeRequired: 'Eye protection & dust mask during scraping',
      storageTemp: 'Store in dry area; keep box liner tied shut',
      unNumber: 'Not Regulated',
    },
  },
  {
    id: 'mvb-primer-kit',
    sku: 'EDC-MVB30',
    name: 'Moisture Vapor Barrier (MVB) Epoxy Primer (3-Gal Kit)',
    shortTitle: 'MVB Moisture Vapor Barrier Primer',
    category: '100% Solids Epoxy',
    price: 210.00,
    unitLabel: '3-Gal A+B Kit',
    rating: 4.9,
    reviewsCount: 58,
    bestsellerRank: 7,
    cureSpeed: 'Fast-Cure (Same Day)',
    substrate: ['High-Moisture Slabs (Up to 20 lbs MVER)', 'Porous / Green Concrete'],
    willCallStock: 44,
    illustrationType: 'mvb-primer',
    summary: 'Deep-penetrating low-viscosity moisture mitigation primer. Stops hydrostatic vapor pressure up to 20 lbs/1,000 sq.ft./24hr and eliminates outgassing pinholes.',
    kickerText: 'Stops 20-lb MVER · Prevents Outgassing Bubbles · ASTM F3010',
    specs: {
      mixRatio: '2:1 by Volume',
      potLife: '30 Min at 75°F',
      coveragePerUnit: '300–450 Sq. Ft. per 3-Gal Kit (Depending on Slab Porosity)',
      cureSchedule: 'Recoat Window: 4 to 18 Hours without Sanding',
      solidsContent: '100% Solids Penetrating Epoxy',
      vocContent: '< 10 g/L California Compliant',
    },
    variants: [
      { id: 'mvb-clear', label: '3-Gal Kit · Amber-Clear Penetrating', price: 210.00, skuSuffix: '-CLR', coverageNote: 'Up to 450 sq. ft.' },
      { id: 'mvb-gray', label: '3-Gal Kit · Pigmented Deck Gray', price: 219.00, skuSuffix: '-GRY', coverageNote: 'Hides slab patches', swatchHex: '#94A3B8' },
    ],
    tdsHighlights: [
      'Apply on falling slab temperatures (afternoon/evening) when possible to eliminate thermal outgassing.',
      'Tight-squeegee into diamond-ground concrete pores and back-roll with 3/8" nap roller.',
      'Adhesion to damp or high-alkali concrete exceeds 450 psi (concrete cohesive failure before bond failure).',
    ],
    sdsSummary: {
      signalWord: 'WARNING — Modified Polyamine Hardener',
      ppeRequired: 'Nitrile gloves, safety glasses, long sleeves',
      storageTemp: '55°F–85°F',
      unNumber: 'UN2735 Amines, Liquid, Corrosive, Class 8',
    },
  },
  {
    id: 'penetrating-sealer-stain',
    sku: 'EDC-STN50',
    name: 'Concrete Penetrating Sealer & Decorative Stain System (5-Gal Pail)',
    shortTitle: '5-Gal Concrete Sealer & Stain',
    category: 'Stains & Sealers',
    price: 165.00,
    unitLabel: '5-Gal Pail',
    rating: 4.8,
    reviewsCount: 39,
    bestsellerRank: 10,
    cureSpeed: 'Fast-Cure (Same Day)',
    substrate: ['Stamped Concrete', 'Pool Decks & Patios', 'Polished Concrete'],
    willCallStock: 37,
    illustrationType: 'stain-pail',
    summary: 'Silane-siloxane + acrylic copolymer wet-look sealer and translucent architectural concrete stain. Breathable, non-peeling protection for California driveways and patios.',
    kickerText: 'Wet-Look Enhancement · UV & Efflorescence Block · 5-Gal Pail',
    specs: {
      mixRatio: 'Single-Component Ready to Spray or Roll',
      potLife: 'No Pot Life Limit (1-Part System)',
      coveragePerUnit: '1,000–1,250 Sq. Ft. per 5-Gal Pail (Two Thin Coats)',
      cureSchedule: 'Dry to Touch 45 Min · Vehicle Traffic 24 Hours',
      solidsContent: '30% High-Solids Silane-Acrylic',
      vocContent: '< 100 g/L SCAQMD Rule 1113 Compliant',
    },
    variants: [
      { id: 'stn-wetclear', label: '5-Gal · Wet-Look High-Gloss Clear', price: 165.00, skuSuffix: '-WCL', coverageNote: 'Covers ~1,100 sq. ft.' },
      { id: 'stn-walnut', label: '5-Gal · Translucent Sierra Walnut', price: 179.00, skuSuffix: '-WLN', coverageNote: 'Covers ~1,100 sq. ft.', swatchHex: '#78350F' },
      { id: 'stn-charcoal', label: '5-Gal · Translucent Slate Charcoal', price: 179.00, skuSuffix: '-CHR', coverageNote: 'Covers ~1,100 sq. ft.', swatchHex: '#334155' },
    ],
    tdsHighlights: [
      'Apply with a chapin acetone-resistant Viton pump sprayer and back-roll lightly to prevent puddling.',
      'blocks water intrusion, pool chlorine, leaf tannins, and hot tire marks.',
      'Re-coat maintenance every 3–4 years with a simple pressure wash and single refresh coat.',
    ],
    sdsSummary: {
      signalWord: 'CAUTION — Water-Borne / Low-VOC Hybrid',
      ppeRequired: 'Safety glasses, gloves, spray mist mask',
      storageTemp: 'Protect from freezing (40°F–90°F)',
      unNumber: 'Non-Regulated DOT Ground',
    },
  },
  {
    id: 'grinder-diamond-bundle',
    sku: 'EDC-GRD70',
    name: 'Pro 7" Concrete Grinder + PCD Diamond Tooling Bundle',
    shortTitle: 'Pro 7" Grinder + Diamond Bundle',
    category: 'Surface Prep & Grinders',
    price: 385.00,
    unitLabel: 'Complete Prep Kit',
    rating: 4.9,
    reviewsCount: 72,
    bestsellerRank: 9,
    cureSpeed: 'Hardware / Prep',
    substrate: ['Edges & Corners', 'Mastic / Glue Removal', 'CSP-2 Concrete Profiling'],
    willCallStock: 19,
    illustrationType: 'grinder-bundle',
    summary: 'Variable-speed 15-Amp heavy-duty 7" angle grinder paired with a convertible flush-edge HEPA dust shroud, 1x 30/40-grit double-row turbo cup wheel, and 1x PCD coating scraper wheel.',
    kickerText: 'HEPA Shroud Included · PCD + 30/40 Cup Wheel · Flush Wall Edging',
    specs: {
      mixRatio: '120V / 15-Amp · 3,000–8,500 Variable RPM',
      potLife: 'Heavy-Duty Sealed Armature Bearings',
      coveragePerUnit: 'Cup Wheels Rated for 3,500–5,000 Sq. Ft. Lifespan',
      cureSchedule: '2" Universal Vacuum Hose Port Ready',
      solidsContent: '5/8"-11 Threaded Arbor',
      vocContent: 'OSHA Table 1 Silica Dust Compliant with HEPA Vac',
    },
    variants: [
      { id: 'grd-full', label: 'Full Bundle (Grinder + Shroud + 2 Wheels)', price: 385.00, skuSuffix: '-BND', coverageNote: 'Complete edge & garage prep' },
      { id: 'grd-wheels', label: 'Replacement 7" 30/40 Turbo + PCD 2-Pack', price: 129.00, skuSuffix: '-WHL', coverageNote: 'Fits any 5/8"-11 grinder' },
    ],
    tdsHighlights: [
      'Flip-up front shroud edge allows grinding within 1/16" of garage stem walls without hand chiseling.',
      'Use the PCD wheel to strip failed hardware-store paint or carpet mastic without gumming up diamond segments.',
      'Switch to the 30/40-grit double-row diamond wheel to open concrete pores to CSP-2/3.',
    ],
    sdsSummary: {
      signalWord: 'OSHA SILICA COMPLIANCE — Always Connect Dust Extractor',
      ppeRequired: 'N95/P100 dust mask, hearing protection, face shield, heavy gloves',
      storageTemp: 'Included blow-molded contractor carry case',
      unNumber: 'Hardware Equipment',
    },
  },
  {
    id: 'polyurea-crack-kit',
    sku: 'EDC-CRK600',
    name: 'Fast-Set Polyurea Concrete Crack & Spall Repair Kit (Dual Cartridge)',
    shortTitle: 'Fast-Set Polyurea Crack Repair',
    category: 'Surface Prep & Grinders',
    price: 58.00,
    unitLabel: '600ml Dual Cartridge + 3 Mix Nozzles',
    rating: 4.9,
    reviewsCount: 104,
    bestsellerRank: 11,
    cureSpeed: 'Fast-Cure (Same Day)',
    substrate: ['Shrinkage Cracks', 'Spalled Concrete Divots', 'Control Joints'],
    willCallStock: 95,
    illustrationType: 'crack-cartridge',
    summary: 'Ultra-low viscosity 1:1 polyurea structural weld that wicks deep into hairline cracks or mixes with dry silica sand to patch spalls. Grindable flush in 25–30 minutes.',
    kickerText: 'Grind Flush in 30 Min · Zero Shrinkage · Structural Weld',
    specs: {
      mixRatio: '1:1 Auto-Mix Static Nozzle',
      potLife: '90 Seconds Gel Time',
      coveragePerUnit: '45–60 Linear Feet per 600ml Cartridge (1/8" x 1/4" Crack)',
      cureSchedule: 'Grindable With Diamond Wheel in 25–30 Minutes',
      solidsContent: '100% Solids Hybrid Polyurea',
      vocContent: '0 g/L Zero VOC',
    },
    variants: [
      { id: 'crk-single', label: 'Single 600ml Cartridge + 3 Nozzles', price: 58.00, skuSuffix: '-1PK', coverageNote: 'Covers ~50 linear ft.' },
      { id: 'crk-case', label: 'Contractor 6-Pack Case + Dual Gun', price: 319.00, skuSuffix: '-6PK', coverageNote: 'Covers ~300 linear ft. + Gun' },
    ],
    tdsHighlights: [
      'Chase cracks with a 4.5" diamond V-crack chaser blade and vacuum dust out completely before injecting.',
      'Overfill slightly above slab plane; shave with razor scraper at 10 minutes or grind flush at 25 minutes.',
      'Will not telegraph ghosts through 100% solids epoxy or metallic coats.',
    ],
    sdsSummary: {
      signalWord: 'WARNING — Fast-Reacting Isocyanate / Amine Cartridge',
      ppeRequired: 'Gloves and safety glasses',
      storageTemp: 'Store upright at 60°F–85°F',
      unNumber: 'Limited Quantity Ground',
    },
  },
  {
    id: 'pro-install-tool-kit',
    sku: 'EDC-TLK12',
    name: 'Pro Crew Install Tool Kit (Gauge Rake, Spike Shoes, Spike Roller & PPE)',
    shortTitle: 'Pro Crew Install Hardware Kit',
    category: 'Install Tools',
    price: 142.00,
    unitLabel: '14-Piece Installer Bundle',
    rating: 4.9,
    reviewsCount: 88,
    bestsellerRank: 12,
    cureSpeed: 'Hardware / Prep',
    substrate: ['Epoxy Application', 'Polyaspartic Rolling', 'Metallic Spreading'],
    willCallStock: 61,
    illustrationType: 'tool-bundle',
    summary: 'Everything your crew needs on install day: 22" adjustable pin/notched squeegee frame, 18" roller frame + 3x shed-free 3/8" covers, 9" porcupine spike roller, strap-on 3/4" spike shoes, and Jiffy mixer paddle.',
    kickerText: '14-Piece Hardware Pack · Shed-Free Nap Rollers · 3/4" Steel Spikes',
    specs: {
      mixRatio: 'Fits Standard Threaded Broom/Extension Poles',
      potLife: 'Solvent-Resistant Polypropylene & Anodized Aluminum',
      coveragePerUnit: 'Reusable Frame Hardware + Consumable Roller Covers',
      cureSchedule: 'Clean frames with Xylene or Acetone before resin cures',
      solidsContent: 'Commercial Contractor Spec',
      vocContent: 'Hardware Bundle',
    },
    variants: [
      { id: 'tlk-complete', label: '14-Pc Complete Crew Hardware Kit', price: 142.00, skuSuffix: '-FULL', coverageNote: 'Full tool bundle' },
      { id: 'tlk-consumables', label: 'Refill Pack (6x 18" Rollers + 4x Squeegee Blades)', price: 68.00, skuSuffix: '-RFL', coverageNote: 'Jobsite consumable pack' },
    ],
    tdsHighlights: [
      'Wrap new 18" roller covers with painter’s tape and peel off before dipping to remove any loose manufacturing fibers.',
      'Use the 9" porcupine spike roller immediately after back-rolling metallic or self-leveling epoxy to release trapped air.',
      '3/4" steel spike shoes feature rigid nylon bases that won’t flex or slip on wet resin.',
    ],
    sdsSummary: {
      signalWord: 'HARDWARE — Mechanical Application Tools',
      ppeRequired: 'Includes 5 pairs of 8-mil heavy-duty black nitrile gloves',
      storageTemp: 'Ambient warehouse storage',
      unNumber: 'Not Regulated',
    },
  },
];

export interface VisualizerPreset {
  id: string;
  name: string;
  family: 'Metallic 3D System' | 'Full-Broadcast Vinyl Flake';
  tag: string;
  baseColorHex: string;
  secondaryHex: string;
  highlightHex: string;
  cssBackground: string;
  chipPattern?: 'domino' | 'desert' | 'granite' | 'nightfall' | 'tidal';
  glossLevel: string;
  systemPricePerSqFt: number;
  recipe: {
    step1: string;
    step2: string;
    step3: string;
  };
  linkedProductIds: string[];
}

export const VISUALIZER_PRESETS: VisualizerPreset[] = [
  {
    id: 'vis-copper',
    name: 'Molten Copper Penny',
    family: 'Metallic 3D System',
    tag: 'Showroom & Man-Cave Favorite',
    baseColorHex: '#1C1917',
    secondaryHex: '#B45309',
    highlightHex: '#F59E0B',
    cssBackground:
      'radial-gradient(ellipse at 25% 30%, rgba(245, 158, 11, 0.75) 0%, rgba(180, 83, 9, 0.65) 32%, rgba(28, 25, 23, 0.96) 72%), radial-gradient(circle at 78% 68%, rgba(217, 119, 6, 0.7) 0%, rgba(120, 53, 15, 0.8) 40%, #0C0A09 85%), linear-gradient(125deg, #1c1917 0%, #78350f 35%, #d97706 52%, #1c1917 75%, #92400e 100%)',
    glossLevel: '98 GU Wet-Mirror High Gloss',
    systemPricePerSqFt: 2.35,
    recipe: {
      step1: 'Prime diamond-ground concrete with MVB Primer tinted Jet Black (10 mils).',
      step2: 'Flood-coat E4E-100 Clear Epoxy mixed with Copper Penny + Champagne Gold Metallic Pigment at 60 sq.ft./gal; mist 99% IPA.',
      step3: 'Lock in with Aliphatic Urethane High-Gloss or Satin Topcoat (3 mils).',
    },
    linkedProductIds: ['mvb-primer-kit', 'e4e-100-epoxy', 'metallic-pigment-pack', 'aliphatic-urethane'],
  },
  {
    id: 'vis-pearl',
    name: 'Carrara Pearl & Silver Vein',
    family: 'Metallic 3D System',
    tag: 'Luxury Interior & Salon Spec',
    baseColorHex: '#F1F5F9',
    secondaryHex: '#94A3B8',
    highlightHex: '#FFFFFF',
    cssBackground:
      'radial-gradient(ellipse at 30% 25%, #FFFFFF 0%, rgba(226, 232, 240, 0.9) 38%, rgba(148, 163, 184, 0.55) 70%), radial-gradient(circle at 75% 75%, #F8FAFC 0%, #CBD5E1 48%, #64748B 90%), linear-gradient(140deg, #f8fafc 0%, #e2e8f0 30%, #94a3b8 48%, #ffffff 65%, #cbd5e1 100%)',
    glossLevel: '95 GU Architectural Mirror',
    systemPricePerSqFt: 2.35,
    recipe: {
      step1: 'Apply E4E-100 Base Coat in Industrial Gray or Pure White primer.',
      step2: 'Pour E4E-100 Clear loaded with Pure Pearl White mica + 10% Gunmetal Platinum accent veins.',
      step3: 'Seal with UV-Stable Polyaspartic 85% Clear or Satin Urethane to prevent yellowing.',
    },
    linkedProductIds: ['e4e-100-epoxy', 'metallic-pigment-pack', 'poly-85-uv'],
  },
  {
    id: 'vis-champagne',
    name: 'Liquid Champagne Gold',
    family: 'Metallic 3D System',
    tag: 'Executive Garage & Dealership',
    baseColorHex: '#27272A',
    secondaryHex: '#D97706',
    highlightHex: '#FDE68A',
    cssBackground:
      'radial-gradient(ellipse at 65% 28%, rgba(253, 230, 138, 0.75) 0%, rgba(217, 119, 6, 0.55) 38%, rgba(24, 24, 27, 0.95) 78%), radial-gradient(circle at 22% 72%, rgba(245, 158, 11, 0.65) 0%, rgba(63, 63, 70, 0.85) 52%, #18181B 90%), linear-gradient(115deg, #18181b 0%, #713f12 38%, #f59e0b 55%, #27272a 82%)',
    glossLevel: '98 GU Wet-Mirror High Gloss',
    systemPricePerSqFt: 2.35,
    recipe: {
      step1: 'Prime slab with MVB Primer to seal pores and establish dark charcoal base.',
      step2: 'Squeegee and cross-roll E4E-100 Clear with Liquid Champagne Gold metallic pigment.',
      step3: 'Topcoat with High-Wear Aliphatic Urethane for forklift and hot-tire protection.',
    },
    linkedProductIds: ['mvb-primer-kit', 'e4e-100-epoxy', 'metallic-pigment-pack', 'aliphatic-urethane'],
  },
  {
    id: 'vis-platinum',
    name: 'Titanium Gunmetal Platinum',
    family: 'Metallic 3D System',
    tag: 'Modern Industrial Loft & Shop',
    baseColorHex: '#0F172A',
    secondaryHex: '#475569',
    highlightHex: '#CBD5E1',
    cssBackground:
      'radial-gradient(ellipse at 35% 35%, rgba(203, 213, 225, 0.65) 0%, rgba(71, 85, 105, 0.75) 42%, rgba(15, 23, 42, 0.96) 80%), radial-gradient(circle at 75% 65%, rgba(148, 163, 184, 0.6) 0%, #1E293B 55%, #090D16 95%), linear-gradient(135deg, #0f172a 0%, #475569 42%, #94a3b8 52%, #1e293b 85%)',
    glossLevel: '90 GU Sleek Metallic Sheen',
    systemPricePerSqFt: 2.35,
    recipe: {
      step1: 'Apply MVB Primer over CSP-2 diamond-ground concrete.',
      step2: 'Flood-coat E4E-100 Clear mixed with Gunmetal Platinum + Pearl swirls.',
      step3: 'Finish with Architectural Satin Urethane + Micro-Grip traction media.',
    },
    linkedProductIds: ['mvb-primer-kit', 'e4e-100-epoxy', 'metallic-pigment-pack', 'aliphatic-urethane'],
  },
  {
    id: 'vis-domino',
    name: '1/4" Domino Full Broadcast',
    family: 'Full-Broadcast Vinyl Flake',
    tag: '#1 California Garage Seller',
    baseColorHex: '#64748B',
    secondaryHex: '#0F172A',
    highlightHex: '#F8FAFC',
    cssBackground: '#94A3B8',
    chipPattern: 'domino',
    glossLevel: 'Orange-Peel Non-Slip UV Gloss',
    systemPricePerSqFt: 1.48,
    recipe: {
      step1: 'Roll E4E-100 Industrial Gray 100% Solids Epoxy base receiver coat (12 mils).',
      step2: 'Broadcast 1/4" Domino Vinyl Flake to complete rejection (~8 lbs / 100 sq.ft.); scrape flat in 2 directions.',
      step3: 'Squeegee and back-roll Polyaspartic 85% UV-Stable Clear Topcoat (12 mils).',
    },
    linkedProductIds: ['2car-flake-kit', 'vinyl-flake-bulk', 'poly-85-uv'],
  },
  {
    id: 'vis-desert',
    name: '1/4" Desert Tan Broadcast',
    family: 'Full-Broadcast Vinyl Flake',
    tag: 'Bakersfield & SoCal Stucco Match',
    baseColorHex: '#C29B61',
    secondaryHex: '#78350F',
    highlightHex: '#FEF3C7',
    cssBackground: '#D6B88D',
    chipPattern: 'desert',
    glossLevel: 'Orange-Peel Non-Slip UV Gloss',
    systemPricePerSqFt: 1.48,
    recipe: {
      step1: 'Roll E4E-100 Mojave Tan 100% Solids Epoxy base receiver coat (12 mils).',
      step2: 'Broadcast 1/4" Desert Tan Vinyl Flake to refusal; scrape and vacuum clean.',
      step3: 'Seal with Polyaspartic 85% Desert Slow-Cure UV Topcoat for zero-amber protection.',
    },
    linkedProductIds: ['2car-flake-kit', 'vinyl-flake-bulk', 'poly-85-uv'],
  },
  {
    id: 'vis-granite',
    name: '1/8" Micro Granite Terrazzo',
    family: 'Full-Broadcast Vinyl Flake',
    tag: 'Commercial Lab & Auto Bay Spec',
    baseColorHex: '#475569',
    secondaryHex: '#1E293B',
    highlightHex: '#E2E8F0',
    cssBackground: '#64748B',
    chipPattern: 'granite',
    glossLevel: 'Tight Micro-Texture Commercial Sheen',
    systemPricePerSqFt: 1.55,
    recipe: {
      step1: 'Prime and base-coat with E4E-100 Industrial Gray Epoxy.',
      step2: 'Broadcast fine 1/8" Micro Granite chip for a tight, quartz-like architectural profile.',
      step3: 'Topcoat with Polyaspartic 85% Clear + High-Wear Aliphatic Urethane.',
    },
    linkedProductIds: ['e4e-100-epoxy', 'vinyl-flake-bulk', 'poly-85-uv'],
  },
];

export interface TrainingClass {
  id: string;
  code: string;
  title: string;
  dateRange: string;
  duration: string;
  audience: string;
  tuitionRetail: number;
  seatsTotal: number;
  seatsLeft: number;
  instructor: string;
  modules: string[];
  takeHomePerks: string;
}

export const TRAINING_CLASSES: TrainingClass[] = [
  {
    id: 'cls-pro-2day',
    code: 'CLASS #EDC-BAK-1108',
    title: '2-Day Contractor Pro Certification: Flake, Polyaspartic & Metallic Mastery',
    dateRange: 'Nov 14–15 · 8:00 AM – 4:30 PM PT',
    duration: '2 Full Days (Lunch & Materials Included)',
    audience: 'Contractors, Crew Leads & Business Owners',
    tuitionRetail: 495.00,
    seatsTotal: 18,
    seatsLeft: 4,
    instructor: 'Luis C. & Master Installer Tech Team',
    modules: [
      'Planetary Diamond Grinding, Moisture Testing (ASTM F2170) & Polyurea Crack Chasing',
      '1-Day Garage Flake Broadcast Systems & Polyaspartic Hot-Weather Roll Techniques',
      'Large-Format 3D Metallic Epoxy Pours, Alcohol Lacing & Scratch-Proof Topcoats',
      'Job Bidding, Sq.Ft. Pricing Formulas ($6–$14/sq.ft.) & Avoiding Costly Callbacks',
    ],
    takeHomePerks: 'Includes $150 Warehouse Material Credit + Permanent VIP 15% Contractor Phone Account + Framed Certificate',
  },
  {
    id: 'cls-diy-1day',
    code: 'CLASS #EDC-BAK-1122',
    title: '1-Day Saturday Hands-On Garage & Countertop Workshop',
    dateRange: 'Nov 22 · 8:30 AM – 3:00 PM PT',
    duration: '1 Intensive Saturday Session',
    audience: 'Homeowners, DIYers & Aspiring Installers',
    tuitionRetail: 195.00,
    seatsTotal: 20,
    seatsLeft: 7,
    instructor: 'Epoxy Depot Bakersfield Tech Desk',
    modules: [
      'How to Prep Your Own 2-Car Garage Slab with Rental or 7" Hand Grinders',
      'Mixing Part A + Part B Without Short-Potting or Hot-Bucket Flash Curing',
      'Full-Broadcast Vinyl Flake Toss, Scraping & UV Clear Topcoating',
      'Live River Table & Bar-Top Deep-Pour Demo + Take-Home Sample Board',
    ],
    takeHomePerks: 'Includes 24"x24" Custom Metallic Sample Board + 15% Off Your Garage Kit Order Placed That Day',
  },
];

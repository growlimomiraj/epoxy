import React, { useState, useMemo } from 'react';
import {
  Phone,
  Search,
  FileText,
  ShieldAlert,
  Calculator,
  Palette,
  GraduationCap,
  Check,
  Plus,
  Minus,
  Trash2,
  Copy,
  Printer,
  X,
  ArrowRight,
  SlidersHorizontal,
  MapPin,
  Truck,
  Building2,
  ClipboardList,
  Sparkles,
  Wrench,
  Award,
  Mail,
  ChevronRight,
} from 'lucide-react';
import {
  PRODUCTS,
  WAREHOUSE_CATEGORIES,
  VISUALIZER_PRESETS,
  TRAINING_CLASSES,
  Product,
  TrainingClass,
} from './data/catalog';
import { BrandLogoDrop, ProductPackagingSvg, FlakeTextureSvgOverlay } from './components/SvgArtwork';

export interface OrderItem {
  productId: string;
  variantId: string;
  sku: string;
  name: string;
  variantLabel: string;
  retailUnitPrice: number;
  quantity: number;
  unitLabel: string;
}

type SystemType = 'flake' | 'metallic' | 'commercial';
type ConcreteCondition = 'standard' | 'porous' | 'moisture';

export default function App() {
  // Core Reactive Application State
  const [isProMode, setIsProMode] = useState<boolean>(true);
  const [fulfillmentMode, setFulfillmentMode] = useState<'willcall' | 'freight'>('willcall');
  const [activeCategory, setActiveCategory] = useState<string>('All Warehouse');
  const [searchCategory, setSearchCategory] = useState<string>('All Warehouse');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'bestsellers' | 'price-asc' | 'price-desc'>('bestsellers');
  const [cureFilter, setCureFilter] = useState<string>('All');
  const [substrateFilter, setSubstrateFilter] = useState<string>('All');
  const [willCallOnly, setWillCallOnly] = useState<boolean>(false);

  // Selected variant per product card
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = p.variants[0].id;
    });
    return initial;
  });

  // Phone Order Requisition List (Pre-populated with a starter 2-car garage kit so user sees immediate value)
  const [orderList, setOrderList] = useState<OrderItem[]>([
    {
      productId: 'e4e-100-epoxy',
      variantId: '3gal-gray',
      sku: 'EDC-E4E100-3GR',
      name: 'E4E-100 · 100% Solids Professional Epoxy Kit',
      variantLabel: '3-Gal Kit · Industrial Gray',
      retailUnitPrice: 199.99,
      quantity: 1,
      unitLabel: '3-Gal A+B Kit',
    },
    {
      productId: 'poly-85-uv',
      variantId: '2gal-clear',
      sku: 'EDC-POLY85-2CL',
      name: 'Polyaspartic 85% Solids Fast-Cure UV Topcoat',
      variantLabel: '2-Gal Kit · Optical Clear',
      retailUnitPrice: 249.00,
      quantity: 1,
      unitLabel: '2-Gal A+B Kit',
    },
  ]);

  // Interactive Calculator State
  const [calcSqFt, setCalcSqFt] = useState<number>(500);
  const [calcSystem, setCalcSystem] = useState<SystemType>('flake');
  const [calcCondition, setCalcCondition] = useState<ConcreteCondition>('standard');
  const [calcAddedToast, setCalcAddedToast] = useState<boolean>(false);

  // Color Visualizer State
  const [activePresetId, setActivePresetId] = useState<string>(VISUALIZER_PRESETS[0].id);
  const [lightingMode, setLightingMode] = useState<'daylight' | 'showroom' | 'warm'>('showroom');

  // Vault State
  const [vaultTab, setVaultTab] = useState<'tds' | 'sds' | 'sop'>('tds');
  const [selectedVaultProductId, setSelectedVaultProductId] = useState<string>(PRODUCTS[0].id);

  // Modals & Drawers State
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewDocTab, setQuickViewDocTab] = useState<'specs' | 'tds' | 'sds'>('specs');
  const [callModalContext, setCallModalContext] = useState<{
    title: string;
    referenceCode: string;
    subtitle: string;
    items: { sku: string; label: string; qty: string; price: string }[];
  } | null>(null);
  const [installEstimatorOpen, setInstallEstimatorOpen] = useState<boolean>(false);
  const [installCity, setInstallCity] = useState<string>('Bakersfield / Kern County');
  const [installSqFt, setInstallSqFt] = useState<number>(600);
  const [installFinish, setInstallFinish] = useState<'flake' | 'metallic' | 'commercial'>('flake');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [contractorJobName, setContractorJobName] = useState<string>('2-Car Garage Coating Spec');

  // Helper: Format Price & Calculate 15% Contractor Pro Discount
  const getActivePrice = (retail: number) => (isProMode ? retail * 0.85 : retail);
  const formatCurrency = (val: number) =>
    val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

  // Deterministic Reference Code based on order contents + sq ft
  const orderReferenceCode = useMemo(() => {
    const itemHash = orderList.reduce((acc, item, idx) => acc + item.quantity * (idx + 17) + item.sku.charCodeAt(4), 9010);
    return `EDC-${itemHash % 10000}`;
  }, [orderList]);

  // Add item to Phone Order Requisition List
  const addToOrderList = (product: Product, variantId?: string, qtyToAdd = 1, openDrawerAfter = false) => {
    const targetVariantId = variantId || selectedVariants[product.id] || product.variants[0].id;
    const variant = product.variants.find((v) => v.id === targetVariantId) || product.variants[0];
    const fullSku = `${product.sku}${variant.skuSuffix}`;

    setOrderList((prev) => {
      const existingIndex = prev.findIndex((i) => i.productId === product.id && i.variantId === variant.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          variantId: variant.id,
          sku: fullSku,
          name: product.shortTitle,
          variantLabel: variant.label,
          retailUnitPrice: variant.price,
          quantity: qtyToAdd,
          unitLabel: product.unitLabel,
        },
      ];
    });

    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1400);
    if (openDrawerAfter) {
      setIsDrawerOpen(true);
    }
  };

  const updateOrderQuantity = (sku: string, delta: number) => {
    setOrderList((prev) =>
      prev
        .map((item) => (item.sku === sku ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeOrderItem = (sku: string) => {
    setOrderList((prev) => prev.filter((item) => item.sku !== sku));
  };

  // Order Totals
  const orderTotals = useMemo(() => {
    const retailSubtotal = orderList.reduce((sum, item) => sum + item.retailUnitPrice * item.quantity, 0);
    const proSavings = retailSubtotal * 0.15;
    const activeSubtotal = isProMode ? retailSubtotal - proSavings : retailSubtotal;
    const totalUnits = orderList.reduce((sum, item) => sum + item.quantity, 0);
    return { retailSubtotal, proSavings, activeSubtotal, totalUnits };
  }, [orderList, isProMode]);

  // Sq. Ft. Calculator Engine
  const calculatorBreakdown = useMemo(() => {
    const sqFt = Math.max(100, Math.min(10000, calcSqFt));
    const items: {
      product: Product;
      variantId: string;
      qty: number;
      roleLabel: string;
      coverageDesc: string;
    }[] = [];

    // 1. Primer / Moisture Mitigation
    if (calcCondition === 'moisture') {
      const mvb = PRODUCTS.find((p) => p.id === 'mvb-primer-kit')!;
      const crack = PRODUCTS.find((p) => p.id === 'polyurea-crack-kit')!;
      items.push({
        product: mvb,
        variantId: mvb.variants[0].id,
        qty: Math.ceil(sqFt / 375),
        roleLabel: 'Step 1 · Vapor Barrier Primer',
        coverageDesc: `${Math.ceil(sqFt / 375)}x 3-Gal Kit (Stops 20-lb MVER)`,
      });
      items.push({
        product: crack,
        variantId: crack.variants[0].id,
        qty: Math.max(1, Math.ceil(sqFt / 450)),
        roleLabel: 'Step 1B · Polyurea Crack Weld',
        coverageDesc: `${Math.max(1, Math.ceil(sqFt / 450))}x 600ml Dual Cartridge`,
      });
    } else if (calcCondition === 'porous') {
      const mvb = PRODUCTS.find((p) => p.id === 'mvb-primer-kit')!;
      items.push({
        product: mvb,
        variantId: mvb.variants[0].id,
        qty: Math.ceil(sqFt / 425),
        roleLabel: 'Step 1 · Penetrating Epoxy Primer',
        coverageDesc: `${Math.ceil(sqFt / 425)}x 3-Gal Kit (Seals Thirsty Slab)`,
      });
    }

    // 2. Main System Coats
    const e4e = PRODUCTS.find((p) => p.id === 'e4e-100-epoxy')!;
    const poly = PRODUCTS.find((p) => p.id === 'poly-85-uv')!;
    const flake = PRODUCTS.find((p) => p.id === 'vinyl-flake-bulk')!;
    const metallic = PRODUCTS.find((p) => p.id === 'metallic-pigment-pack')!;
    const urethane = PRODUCTS.find((p) => p.id === 'aliphatic-urethane')!;
    const tools = PRODUCTS.find((p) => p.id === 'pro-install-tool-kit')!;

    if (calcSystem === 'flake') {
      items.push({
        product: e4e,
        variantId: '3gal-gray',
        qty: Math.ceil(sqFt / 400),
        roleLabel: 'Step 2 · 100% Solids Flake Receiver Base',
        coverageDesc: `${Math.ceil(sqFt / 400) * 3} Gallons E4E-100 Gray (12 mils)`,
      });
      items.push({
        product: flake,
        variantId: 'flk-domino',
        qty: Math.ceil(sqFt / 500),
        roleLabel: 'Step 3 · Full-Rejection Vinyl Flake Broadcast',
        coverageDesc: `${Math.ceil(sqFt / 500) * 40} lbs Architectural 1/4" Flake`,
      });
      items.push({
        product: poly,
        variantId: '2gal-clear',
        qty: Math.ceil(sqFt / 350),
        roleLabel: 'Step 4 · UV-Stable Polyaspartic Topcoat',
        coverageDesc: `${Math.ceil(sqFt / 350) * 2} Gallons Poly-85 Clear`,
      });
    } else if (calcSystem === 'metallic') {
      const floodKits = Math.ceil(sqFt / 200);
      items.push({
        product: e4e,
        variantId: '3gal-clear',
        qty: floodKits,
        roleLabel: 'Step 2 · Metallic Flood-Coat Clear Epoxy',
        coverageDesc: `${floodKits * 3} Gallons E4E-100 Crystal Clear (65 sq.ft./gal)`,
      });
      items.push({
        product: metallic,
        variantId: 'met-copper',
        qty: floodKits,
        roleLabel: 'Step 3 · 3D Pearlescent Mica Pigment Load',
        coverageDesc: `${floodKits}x 32-oz Heavy-Load Metallic Jars`,
      });
      items.push({
        product: urethane,
        variantId: 'ure-gloss',
        qty: Math.ceil(sqFt / 1200),
        roleLabel: 'Step 4 · High-Wear Aliphatic Urethane Armor',
        coverageDesc: `${Math.ceil(sqFt / 1200)}x 3-Gal Kit Scratch-Resistant Topcoat`,
      });
    } else {
      // Commercial Heavy-Duty System
      items.push({
        product: e4e,
        variantId: '3gal-gray',
        qty: Math.ceil(sqFt / 300),
        roleLabel: 'Step 2 · High-Build 100% Solids Epoxy Body Coat',
        coverageDesc: `${Math.ceil(sqFt / 300) * 3} Gallons Heavy-Duty 16-Mil Build`,
      });
      items.push({
        product: urethane,
        variantId: 'ure-satin',
        qty: Math.ceil(sqFt / 1000),
        roleLabel: 'Step 3 · Chemical & Forklift Urethane Topcoat',
        coverageDesc: `${Math.ceil(sqFt / 1000)}x 3-Gal Kit with Micro-Grip Traction`,
      });
    }

    // 3. Hardware Kit
    items.push({
      product: tools,
      variantId: 'tlk-complete',
      qty: sqFt > 1500 ? 2 : 1,
      roleLabel: 'Step 5 · Crew Application Hardware Bundle',
      coverageDesc: `${sqFt > 1500 ? 2 : 1}x 14-Pc Gauge Rake, Spike Shoes & Rollers`,
    });

    const retailTotal = items.reduce((sum, entry) => {
      const v = entry.product.variants.find((va) => va.id === entry.variantId) || entry.product.variants[0];
      return sum + v.price * entry.qty;
    }, 0);

    const proTotal = retailTotal * 0.85;
    const activeTotal = isProMode ? proTotal : retailTotal;
    const costPerSqFt = activeTotal / sqFt;
    const systemCode = `SYS-${calcSystem.slice(0, 3).toUpperCase()}-${sqFt}-${calcCondition.slice(0, 3).toUpperCase()}`;

    return { items, retailTotal, proTotal, activeTotal, costPerSqFt, systemCode, sqFt };
  }, [calcSqFt, calcSystem, calcCondition, isProMode]);

  const handleAddCalculatedSystemToOrder = () => {
    calculatorBreakdown.items.forEach((entry) => {
      addToOrderList(entry.product, entry.variantId, entry.qty, false);
    });
    setCalcAddedToast(true);
    setTimeout(() => setCalcAddedToast(false), 2500);
    setIsDrawerOpen(true);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const effectiveCategory = activeCategory !== 'All Warehouse' ? activeCategory : searchCategory;
      if (effectiveCategory !== 'All Warehouse' && product.category !== effectiveCategory) {
        return false;
      }
      if (cureFilter !== 'All' && product.cureSpeed !== cureFilter) {
        return false;
      }
      if (substrateFilter !== 'All' && !product.substrate.some((s) => s.toLowerCase().includes(substrateFilter.toLowerCase()))) {
        return false;
      }
      if (willCallOnly && product.willCallStock <= 0) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchSku = product.sku.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchSummary = product.summary.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchCat && !matchSummary) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.bestsellerRank - b.bestsellerRank;
    });
  }, [activeCategory, searchCategory, cureFilter, substrateFilter, willCallOnly, searchQuery, sortBy]);

  const activeVisualizerPreset = useMemo(
    () => VISUALIZER_PRESETS.find((p) => p.id === activePresetId) || VISUALIZER_PRESETS[0],
    [activePresetId]
  );

  const selectedVaultProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedVaultProductId) || PRODUCTS[0],
    [selectedVaultProductId]
  );

  // Copy Itemized Requisition List to Clipboard
  const handleCopyOrderSummary = () => {
    const lines = [
      `EPOXY DEPOT CALIFORNIA — PHONE ORDER REQUISITION`,
      `Reference Code: REF #${orderReferenceCode}`,
      `Dispatch Desk: (661) 516-7201 | luisc@epoxydepotusa.com`,
      `Fulfillment: ${fulfillmentMode === 'willcall' ? 'Same-Day Will-Call (1113 W Columbus St, Bakersfield)' : '24-48hr Jobsite Freight'}`,
      `Pricing Tier: ${isProMode ? 'VIP Contractor Pro (-15% Phone Order Applied)' : 'Standard DIY Retail'}`,
      `----------------------------------------`,
      ...orderList.map(
        (item) =>
          `${item.quantity}x [${item.sku}] ${item.name} (${item.variantLabel}) — ${formatCurrency(
            getActivePrice(item.retailUnitPrice) * item.quantity
          )}`
      ),
      `----------------------------------------`,
      `Retail Subtotal: ${formatCurrency(orderTotals.retailSubtotal)}`,
      ...(isProMode ? [`15% Contractor Phone Savings: -${formatCurrency(orderTotals.proSavings)}`] : []),
      `ESTIMATED PHONE ORDER TOTAL: ${formatCurrency(orderTotals.activeSubtotal)}`,
    ];
    navigator.clipboard?.writeText(lines.join('\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Trigger Quick-Call Modal for Single Product
  const openProductCallModal = (product: Product) => {
    const varId = selectedVariants[product.id] || product.variants[0].id;
    const variant = product.variants.find((v) => v.id === varId) || product.variants[0];
    const activeUnitPrice = getActivePrice(variant.price);
    setCallModalContext({
      title: `Direct Phone Order · ${product.shortTitle}`,
      referenceCode: `SKU #${product.sku}${variant.skuSuffix}`,
      subtitle: isProMode
        ? '15% Contractor Pro Discount Active — Mention SKU to Luis or Tech Desk Rep'
        : 'Toggle Contractor Pro Mode ON anytime to save 15% on your phone order',
      items: [
        {
          sku: `${product.sku}${variant.skuSuffix}`,
          label: `${product.shortTitle} — ${variant.label}`,
          qty: '1 Unit',
          price: formatCurrency(activeUnitPrice),
        },
      ],
    });
  };

  // Trigger Quick-Call Modal for Class Booking
  const openClassBookingModal = (cls: TrainingClass) => {
    const tuition = isProMode ? cls.tuitionRetail * 0.85 : cls.tuitionRetail;
    setCallModalContext({
      title: `Reserve Training Seat · ${cls.code}`,
      referenceCode: cls.code,
      subtitle: `${cls.dateRange} · Bakersfield Warehouse Training Center (Only ${cls.seatsLeft} seats left)`,
      items: [
        {
          sku: cls.code,
          label: cls.title,
          qty: '1 Seat',
          price: formatCurrency(tuition),
        },
      ],
    });
  };

  // Add Visualizer Color System to Phone Order List
  const handleAddVisualizerSystem = () => {
    activeVisualizerPreset.linkedProductIds.forEach((pid) => {
      const prod = PRODUCTS.find((p) => p.id === pid);
      if (prod) {
        addToOrderList(prod, prod.variants[0].id, 1, false);
      }
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 pb-16 lg:pb-0">
      {/* =====================================================================
          TOP NAVIGATION BAR (Clean 3-Zone Contract)
      ====================================================================== */}
      <header className="sticky top-0 z-40 bg-slate-950 text-white border-b border-slate-800 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-amber-500"
          >
            EPOXY DEPOT CALIFORNIA
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#warehouse-catalog"
              className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Warehouse Catalog
            </a>
            <a
              href="#sqft-calculator"
              className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Sq. Ft. Calculator
            </a>
            <a
              href="#color-visualizer"
              className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Color Visualizer
            </a>
            <a
              href="#training-classes"
              className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Training Classes
            </a>
            <a
              href="#tds-vault"
              className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              TDS/SDS Vault
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center shrink-0">
            <a
              href="tel:6615167201"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call (661) 516-7201</span>
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          ENTERPRISE MARKETPLACE COMMAND WORKSPACE BAR (3-Tier Dispatch & Search)
      ====================================================================== */}
      <section id="top" className="bg-white border-b border-slate-200 shadow-xs no-print">
        {/* Sub-Bar 1: Live Bakersfield Dispatch & Verified Google Rating Strip */}
        <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-amber-400 font-bold tracking-tight">★★★★★ 4.9/5</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium">273+ Verified Google Reviews</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline text-slate-300">Lot-Traceable Pro Batches</span>
            </div>

            <div className="hidden xl:flex items-center gap-2 text-slate-200">
              <span className="text-emerald-400 font-semibold">Bakersfield Dispatch Desk OPEN (Mon–Fri 7a–5p PT)</span>
              <span aria-hidden="true">·</span>
              <span>Same-Day Will-Call &amp; 24–48hr California Freight</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300 font-mono">
              <a href="mailto:luisc@epoxydepotusa.com" className="hover:text-amber-400 transition-colors whitespace-nowrap">
                luisc@epoxydepotusa.com
              </a>
              <span aria-hidden="true">·</span>
              <a href="tel:6615167201" className="text-amber-400 font-semibold hover:underline whitespace-nowrap">
                (661) 516-7201
              </a>
            </div>
          </div>
        </div>

        {/* Sub-Bar 2: Main Marketplace Search, Fulfillment Toggle, VIP 15% Pro Switch & Order Drawer Trigger */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
          {/* Brand Lockup + Fulfillment Mode Switch */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2.5 pr-2">
              <BrandLogoDrop className="w-10 h-10 shrink-0" />
              <div className="leading-tight">
                <div className="text-xs font-mono font-bold text-slate-900">1113 W COLUMBUS ST</div>
                <div className="text-[11px] text-slate-500">Bakersfield, CA 93301</div>
              </div>
            </div>

            {/* Interactive Fulfillment Segmented Control */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setFulfillmentMode('willcall')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  fulfillmentMode === 'willcall'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Same-Day Will-Call</span>
              </button>
              <button
                type="button"
                onClick={() => setFulfillmentMode('freight')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  fulfillmentMode === 'freight'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>24–48hr CA Freight</span>
              </button>
            </div>
          </div>

          {/* Amazon-Grade Smart Search Bar */}
          <div className="flex-1 min-w-[260px] max-w-2xl flex items-center border-2 border-slate-900 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-amber-500">
            <select
              aria-label="Filter search by category"
              value={searchCategory}
              onChange={(e) => {
                setSearchCategory(e.target.value);
                setActiveCategory(e.target.value);
              }}
              className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-2.5 border-r border-slate-300 focus:outline-none hidden sm:block"
            >
              {WAREHOUSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 100% solids epoxy, polyaspartic, flake, SKU (e.g. E4E-100)..."
                className="w-full px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mr-2 text-slate-400 hover:text-slate-700 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <a
              href="#warehouse-catalog"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 transition-colors whitespace-nowrap shrink-0"
            >
              Search
            </a>
          </div>

          {/* VIP Contractor Pro (-15%) Master Toggle Switch + Phone Order Requisition Drawer Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsProMode(!isProMode)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg border transition-all whitespace-nowrap shrink-0 ${
                isProMode
                  ? 'bg-amber-50 border-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              aria-pressed={isProMode}
            >
              <div
                className={`w-9 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                  isProMode ? 'bg-amber-500 justify-end' : 'bg-slate-400 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </div>
              <div className="text-left leading-none">
                <div className="text-xs font-extrabold tracking-tight">
                  {isProMode ? 'Contractor Pro (-15% ON)' : 'Standard DIY Pricing'}
                </div>
                <div className="text-[10px] font-mono text-slate-600 mt-0.5">
                  {isProMode ? '15% Phone Discount Active' : 'Click for -15% Phone Rate'}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-slate-700"
            >
              <ClipboardList className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left leading-none">
                <div className="text-xs font-bold">
                  Phone Order List ({orderTotals.totalUnits})
                </div>
                <div className="text-[11px] font-mono text-amber-400 tabular-nums mt-0.5">
                  {formatCurrency(orderTotals.activeSubtotal)} · REF #{orderReferenceCode}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Sub-Bar 3: Category Mega-Navigation Filter Tabs */}
        <div className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-1.5">
              {WAREHOUSE_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                const count =
                  category === 'All Warehouse'
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.category === category).length;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setSearchCategory(category);
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>

            <div className="hidden xl:flex items-center gap-4 text-xs font-semibold text-slate-700 shrink-0">
              <a
                href="#sqft-calculator"
                className="flex items-center gap-1.5 hover:text-amber-600 transition-colors whitespace-nowrap"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-600" />
                <span>Sq. Ft. Kit Calculator</span>
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a
                href="#color-visualizer"
                className="flex items-center gap-1.5 hover:text-amber-600 transition-colors whitespace-nowrap"
              >
                <Palette className="w-3.5 h-3.5 text-amber-600" />
                <span>Color Visualizer</span>
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a
                href="#training-classes"
                className="flex items-center gap-1.5 hover:text-amber-600 transition-colors whitespace-nowrap"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>Book Training Class</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ABOVE-THE-FOLD: ASYMMETRIC BENTO HERO + "THREE WAYS TO WORK WITH US"
      ====================================================================== */}
      <section className="bg-slate-50 border-b border-slate-200 py-8 lg:py-10 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left (65% Width -> 8 Cols): High-Conversion Warehouse Hero */}
            <div className="lg:col-span-8 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="text-xs font-mono font-semibold text-amber-400 tracking-wide">
                  California&apos;s #1 Factory-Direct Floor Coating Warehouse · Bakersfield, CA
                </div>

                <h1
                  className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.12]"
                  style={{ textWrap: 'balance' }}
                >
                  Epoxy Flooring Supplies &amp; Professional Floor Coating Systems.
                </h1>

                <p className="mt-4 text-slate-300 text-base leading-relaxed max-w-2xl">
                  Contractor-grade 100% solids epoxy, UV polyaspartic, aliphatic urethane, decorative vinyl flake,
                  3D metallic pigments, and diamond prep tooling—all under one California roof. Build your itemized
                  requisition list online to calculate exact coverage and pricing, then call our tech desk for same-day
                  will-call or 24–48hr freight dispatch with{' '}
                  <span className="text-amber-400 font-semibold">15% contractor pricing applied on every phone order</span>.
                </p>

                {/* Primary & Secondary Hero CTAs */}
                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <a
                    href="tel:6615167201"
                    className="inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-sm"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>Call (661) 516-7201 to Order Now</span>
                  </a>

                  <a
                    href="#sqft-calculator"
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm px-5 py-3.5 rounded-xl border border-slate-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Calculator className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Build Order List &amp; Calculate Sq. Ft.</span>
                  </a>
                </div>
              </div>

              {/* 4 Quantitative Warehouse Proof Metrics */}
              <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div>
                  <div className="text-lg font-mono font-bold text-amber-400 tabular-nums">24–48 Hrs</div>
                  <div className="text-xs text-slate-400 mt-0.5">CA &amp; Nationwide Dispatch</div>
                </div>
                <div>
                  <div className="text-lg font-mono font-bold text-emerald-400 tabular-nums">-15% Pro Rate</div>
                  <div className="text-xs text-slate-400 mt-0.5">On Every Phone Order</div>
                </div>
                <div>
                  <div className="text-lg font-mono font-bold text-white tabular-nums">Real Tech Reps</div>
                  <div className="text-xs text-slate-400 mt-0.5">Master Installers · No Scripts</div>
                </div>
                <div>
                  <div className="text-lg font-mono font-bold text-white tabular-nums">100% Solids</div>
                  <div className="text-xs text-slate-400 mt-0.5">Lot-Traceable Zero-VOC Resin</div>
                </div>
              </div>
            </div>

            {/* Right (35% Width -> 4 Cols): "Three Ways to Work With Us" Interactive Action Cards */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              {/* Path 1: DIY & Pro Supply */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between flex-1 hover:border-slate-300 transition-colors">
                <div>
                  <div className="text-xs font-mono font-semibold text-amber-700">
                    01. DIY &amp; Contractor Material Supply
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">
                    Factory-Direct Kits &amp; Bulk Pails
                  </h2>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Build your requisition list online with live 15% contractor pricing, get an instant Reference Code,
                    and call (661) 516-7201 for 30-second dispatch.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-700 font-semibold">In Stock at Bakersfield</span>
                  <a
                    href="#warehouse-catalog"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors whitespace-nowrap"
                  >
                    <span>Browse Warehouse</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Path 2: Have Us Install */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between flex-1 hover:border-slate-300 transition-colors">
                <div>
                  <div className="text-xs font-mono font-semibold text-amber-700">
                    02. Turnkey Certified Installation Crews
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">
                    Have Our Crews Coat Your Floor
                  </h2>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    We diamond-grind and coat residential garages, aircraft hangars, auto shops, and commercial
                    showrooms across Kern County &amp; California.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">1-Day Garage Turnaround</span>
                  <button
                    type="button"
                    onClick={() => setInstallEstimatorOpen(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors whitespace-nowrap"
                  >
                    <span>Prepare Install Estimate &amp; Call</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Path 3: Learn at a Class */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between flex-1 hover:border-slate-300 transition-colors">
                <div>
                  <div className="text-xs font-mono font-semibold text-amber-700">
                    03. Hands-On Bakersfield Academy
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">
                    Learn at a Certification Class
                  </h2>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Train with real grinders, 100% solids epoxy, flake broadcasts, and 3D metallics. Includes $150
                    material credit and lifetime tech support.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-700 font-semibold">Next Class: 4 Seats Left</span>
                  <a
                    href="#training-classes"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors whitespace-nowrap"
                  >
                    <span>Check Dates &amp; Call to Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SIGNATURE ENGINE #1: INTERACTIVE SQ. FT. COVERAGE & PHONE QUOTE CALCULATOR
      ====================================================================== */}
      <section id="sqft-calculator" className="py-12 bg-white border-b border-slate-200 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-semibold text-amber-700">
                Interactive Material Engineering &amp; Requisition Tool
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Sq. Ft. Coverage &amp; Instant Phone Quote Calculator
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-xl">
              Dial in your slab dimensions and concrete condition below. Our system calculates the exact gallons, flake
              boxes, and tools required—ready to add to your Phone Order List in one click.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            {/* Left 6 Cols: Interactive Inputs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Input 1: Floor Area Slider + Numeric Input + Presets */}
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <label htmlFor="sqft-input" className="text-sm font-bold text-slate-900">
                    1. Total Floor Area (Sq. Ft.)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="sqft-input"
                      type="number"
                      min={100}
                      max={10000}
                      step={50}
                      value={calcSqFt}
                      onChange={(e) => setCalcSqFt(Number(e.target.value) || 100)}
                      className="w-28 px-3 py-1.5 text-right font-mono font-bold text-base bg-slate-100 border border-slate-300 rounded-lg focus:outline-2 focus:outline-amber-500 tabular-nums"
                    />
                    <span className="text-xs font-mono font-semibold text-slate-500">SQ. FT.</span>
                  </div>
                </div>

                <input
                  type="range"
                  aria-label="Floor Area Slider"
                  min={100}
                  max={5000}
                  step={50}
                  value={Math.min(5000, calcSqFt)}
                  onChange={(e) => setCalcSqFt(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />

                {/* Quick Presets */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {[
                    { label: '1-Car (250 sqft)', val: 250 },
                    { label: '2-Car (500 sqft)', val: 500 },
                    { label: '3-Car (750 sqft)', val: 750 },
                    { label: 'Commercial (2,500 sqft)', val: 2500 },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setCalcSqFt(preset.val)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 border ${
                        calcSqFt === preset.val
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input 2: Coating System Type */}
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="text-sm font-bold text-slate-900 mb-3">2. Select Floor Coating System</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'flake' as SystemType,
                      title: 'Full-Broadcast Flake',
                      desc: '100% Solids Base + 1/4" Flake + UV Polyaspartic',
                    },
                    {
                      id: 'metallic' as SystemType,
                      title: 'Showroom Metallic 3D',
                      desc: 'Clear Flood Coat + Mica Pigment + Urethane Armor',
                    },
                    {
                      id: 'commercial' as SystemType,
                      title: 'Commercial Heavy-Duty',
                      desc: 'High-Build 16-Mil Epoxy + Satin Traction Urethane',
                    },
                  ].map((sys) => (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => setCalcSystem(sys.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        calcSystem === sys.id
                          ? 'bg-amber-50/70 border-amber-500 ring-1 ring-amber-500'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{sys.title}</div>
                      <div className="text-[11px] text-slate-600 mt-1 leading-snug">{sys.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input 3: Concrete Condition */}
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="text-sm font-bold text-slate-900 mb-3">3. Concrete Slab Condition</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'standard' as ConcreteCondition,
                      title: 'Standard Slab',
                      desc: 'Clean, dry concrete ready for diamond grinding',
                    },
                    {
                      id: 'porous' as ConcreteCondition,
                      title: 'Porous / Thirsty Slab',
                      desc: 'Adds penetrating primer to prevent dry spots',
                    },
                    {
                      id: 'moisture' as ConcreteCondition,
                      title: 'High Moisture / Cracked',
                      desc: 'Adds 20-lb MVB Vapor Primer + Polyurea Crack Weld',
                    },
                  ].map((cond) => (
                    <button
                      key={cond.id}
                      type="button"
                      onClick={() => setCalcCondition(cond.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        calcCondition === cond.id
                          ? 'bg-amber-50/70 border-amber-500 ring-1 ring-amber-500'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{cond.title}</div>
                      <div className="text-[11px] text-slate-600 mt-1 leading-snug">{cond.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Live Engineered System Output Panel */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <div className="text-xs font-mono text-amber-400">
                      QUICK-CALL SYSTEM CODE: {calculatorBreakdown.systemCode}
                    </div>
                    <h3 className="text-lg font-extrabold text-white mt-0.5">
                      Engineered Material Bill of Quantities ({calculatorBreakdown.sqFt.toLocaleString()} Sq. Ft.)
                    </h3>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs text-slate-400">Est. Cost / Sq.Ft.</div>
                    <div className="text-base font-bold text-emerald-400 tabular-nums">
                      {formatCurrency(calculatorBreakdown.costPerSqFt)} / sq.ft.
                    </div>
                  </div>
                </div>

                {/* Itemized Material Breakdown */}
                <div className="mt-4 divide-y divide-slate-800/80">
                  {calculatorBreakdown.items.map((entry, idx) => {
                    const variant =
                      entry.product.variants.find((v) => v.id === entry.variantId) || entry.product.variants[0];
                    const linePrice = getActivePrice(variant.price) * entry.qty;
                    return (
                      <div key={idx} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-mono font-semibold text-amber-400">{entry.roleLabel}</div>
                          <div className="text-sm font-bold text-white mt-0.5">{entry.product.shortTitle}</div>
                          <div className="text-xs text-slate-400">{entry.coverageDesc}</div>
                        </div>
                        <div className="text-right font-mono shrink-0">
                          <div className="text-xs text-slate-300">Qty: {entry.qty}</div>
                          <div className="text-sm font-bold text-white tabular-nums">{formatCurrency(linePrice)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Totals & Dual Action Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-400">
                      {isProMode
                        ? 'Estimated Kit Total (15% Contractor Phone Discount Applied)'
                        : 'Standard DIY Retail Total (Toggle Pro Mode for -15%)'}
                    </div>
                    {isProMode && (
                      <div className="text-xs font-mono text-emerald-400 mt-0.5 tabular-nums">
                        Retail {formatCurrency(calculatorBreakdown.retailTotal)} · You Save{' '}
                        {formatCurrency(calculatorBreakdown.retailTotal - calculatorBreakdown.proTotal)}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400 tabular-nums">
                    {formatCurrency(calculatorBreakdown.activeTotal)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAddCalculatedSystemToOrder}
                    className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm px-4 py-3.5 rounded-xl transition-colors whitespace-nowrap"
                  >
                    {calcAddedToast ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" />
                        <span>System Added to Phone List!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 shrink-0" />
                        <span>Add Full System to Phone List</span>
                      </>
                    )}
                  </button>

                  <a
                    href="tel:6615167201"
                    className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm px-4 py-3.5 rounded-xl border border-slate-700 transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Call Tech Rep: (661) 516-7201</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SIGNATURE ENGINE #2: AMAZON-PRO PRODUCT CATALOG (12 REAL PRODUCTS)
      ====================================================================== */}
      <section id="warehouse-catalog" className="py-12 bg-slate-50 border-b border-slate-200 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          {/* Catalog Section Header + Sort Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-semibold text-amber-700">
                Bakersfield Factory Warehouse · Same-Day Will-Call &amp; 24–48hr Freight
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Professional Floor Coating &amp; Prep Catalog ({filteredProducts.length} Products)
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span className="font-semibold">Sort By:</span>
              </div>
              <select
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'bestsellers' | 'price-asc' | 'price-desc')}
                className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-2 focus:outline-amber-500"
              >
                <option value="bestsellers">Crew Reorder Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar Filters (3 Cols on Desktop) */}
            <aside className="lg:col-span-3 bg-white rounded-xl p-5 border border-slate-200 space-y-6">
              {/* Filter 1: Warehouse Category */}
              <div>
                <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-3">
                  System Category
                </h3>
                <div className="space-y-1">
                  {WAREHOUSE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
                        setSearchCategory(cat);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                        activeCategory === cat
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      <span className="font-mono text-[11px] opacity-75">
                        {cat === 'All Warehouse'
                          ? PRODUCTS.length
                          : PRODUCTS.filter((p) => p.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 2: Cure Speed */}
              <div className="pt-5 border-t border-slate-200">
                <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Cure Speed &amp; Return
                </h3>
                <div className="space-y-1.5">
                  {['All', 'Fast-Cure (Same Day)', 'Standard (12-24 Hr)', 'Deep Cure (48 Hr)', 'Hardware / Prep'].map(
                    (speed) => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => setCureFilter(speed)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          cureFilter === speed
                            ? 'bg-amber-100 text-slate-950 font-bold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {speed}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Filter 3: Will-Call Availability */}
              <div className="pt-5 border-t border-slate-200">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={willCallOnly}
                    onChange={(e) => setWillCallOnly(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Same-Day Bakersfield Will-Call Ready
                  </span>
                </label>
              </div>

              {/* Reset Filters */}
              {(activeCategory !== 'All Warehouse' ||
                cureFilter !== 'All' ||
                substrateFilter !== 'All' ||
                searchQuery !== '') && (
                <div className="pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('All Warehouse');
                      setSearchCategory('All Warehouse');
                      setCureFilter('All');
                      setSubstrateFilter('All');
                      setSearchQuery('');
                    }}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Direct Tech Rep Sidebar Call Card */}
              <div className="pt-5 border-t border-slate-200">
                <div className="bg-slate-900 text-white rounded-xl p-4">
                  <div className="text-xs font-mono text-amber-400 font-semibold">Need a Custom Pallet Quote?</div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Ordering 5+ kits or 55-gallon drums? Call Luis at the Bakersfield dispatch desk for volume pallet
                    freight rates.
                  </p>
                  <a
                    href="tel:6615167201"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2.5 px-3 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>(661) 516-7201</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Product Grid (9 Cols -> 3-Column Enterprise Product Cards) */}
            <div className="lg:col-span-9">
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                  <p className="text-base font-bold text-slate-900">No warehouse products match your current filter.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Reset filters or call our Bakersfield desk at (661) 516-7201 for special-order formulations.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('All Warehouse');
                      setSearchCategory('All Warehouse');
                      setCureFilter('All');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg"
                  >
                    Show All 12 Warehouse Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const activeVarId = selectedVariants[product.id] || product.variants[0].id;
                    const activeVariant =
                      product.variants.find((v) => v.id === activeVarId) || product.variants[0];
                    const retailPrice = activeVariant.price;
                    const proPrice = retailPrice * 0.85;
                    const isAdded = justAddedId === product.id;

                    return (
                      <article
                        key={product.id}
                        className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
                      >
                        <div>
                          {/* Card Top Header: Unboxed Metadata Kicker + Direct [TDS] [SDS] Buttons */}
                          <div className="px-4 pt-3.5 pb-2 flex items-center justify-between gap-2 border-b border-slate-100">
                            <span className="text-[11px] font-mono text-slate-500 truncate">
                              {product.sku}
                              {activeVariant.skuSuffix} · {product.willCallStock} in stock
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setQuickViewProduct(product);
                                  setQuickViewDocTab('tds');
                                }}
                                className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                                title="View Technical Data Sheet"
                              >
                                [TDS]
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setQuickViewProduct(product);
                                  setQuickViewDocTab('sds');
                                }}
                                className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                                title="View Safety Data Sheet"
                              >
                                [SDS]
                              </button>
                            </div>
                          </div>

                          {/* Clickable Custom SVG Packaging Illustration */}
                          <button
                            type="button"
                            onClick={() => {
                              setQuickViewProduct(product);
                              setQuickViewDocTab('specs');
                            }}
                            className="w-full h-48 bg-slate-50/70 hover:bg-slate-100/70 transition-colors p-3 flex items-center justify-center relative group cursor-pointer"
                          >
                            <ProductPackagingSvg
                              type={product.illustrationType}
                              accentHex={activeVariant.swatchHex || '#F59E0B'}
                              sku={product.sku}
                            />
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 right-2 bg-slate-900/90 text-white text-[10px] font-mono px-2.5 py-1 rounded">
                              Quick-View Specs
                            </span>
                          </button>

                          {/* Product Title, Unboxed Technical Line & Interactive Variant Selector */}
                          <div className="p-4">
                            <div className="text-[11px] text-emerald-700 font-medium">
                              {product.kickerText}
                            </div>

                            <h3 className="mt-1 text-base font-bold text-slate-900 leading-snug">
                              <button
                                type="button"
                                onClick={() => {
                                  setQuickViewProduct(product);
                                  setQuickViewDocTab('specs');
                                }}
                                className="text-left hover:text-amber-700 transition-colors"
                              >
                                {product.name}
                              </button>
                            </h3>

                            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                              <span className="text-amber-500 font-bold">★ {product.rating.toFixed(1)}</span>
                              <span aria-hidden="true">·</span>
                              <span>{product.reviewsCount} contractor reviews</span>
                              <span aria-hidden="true">·</span>
                              <span>{activeVariant.coverageNote}</span>
                            </div>

                            {/* Variant Selector Buttons */}
                            <div className="mt-3">
                              <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
                                Select Option ({product.variants.length}):
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {product.variants.map((variant) => {
                                  const selected = variant.id === activeVariant.id;
                                  return (
                                    <button
                                      key={variant.id}
                                      type="button"
                                      onClick={() =>
                                        setSelectedVariants((prev) => ({ ...prev, [product.id]: variant.id }))
                                      }
                                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                                        selected
                                          ? 'bg-slate-900 text-white border-slate-900'
                                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                                      }`}
                                    >
                                      {variant.swatchHex && (
                                        <span
                                          className="w-2.5 h-2.5 rounded-full border border-white/40 shrink-0"
                                          style={{ backgroundColor: variant.swatchHex }}
                                        />
                                      )}
                                      <span>{variant.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Contiguous Pricing & Dual Phone Action Module */}
                        <div className="px-4 pb-4 pt-3 border-t border-slate-100 bg-slate-50/50">
                          <div className="flex items-baseline justify-between gap-2 mb-3">
                            <div>
                              <div className="text-[11px] text-slate-500">
                                {isProMode ? '15% Off Contractor Phone Price' : 'Standard Retail Price'}
                              </div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-mono font-extrabold text-slate-900 tabular-nums">
                                  {formatCurrency(isProMode ? proPrice : retailPrice)}
                                </span>
                                {isProMode && (
                                  <span className="text-xs font-mono text-slate-400 line-through tabular-nums">
                                    {formatCurrency(retailPrice)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[11px] font-mono font-semibold text-amber-700">
                                {isProMode
                                  ? `Save ${formatCurrency(retailPrice - proPrice)}`
                                  : `Pro Phone: ${formatCurrency(proPrice)}`}
                              </span>
                            </div>
                          </div>

                          {/* Dual Action Buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => openProductCallModal(product)}
                              className="flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs py-2.5 px-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
                            >
                              <Phone className="w-3.5 h-3.5 shrink-0" />
                              <span>Call to Order</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => addToOrderList(product, activeVariant.id, 1, false)}
                              className={`flex items-center justify-center gap-1.5 font-bold text-xs py-2.5 px-3 rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                                isAdded
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 shrink-0" />
                                  <span>Added to List</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5 shrink-0" />
                                  <span>Add to Phone List</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SIGNATURE ENGINE #3: LIVE METALLIC & FLAKE FLOOR COLOR VISUALIZER
      ====================================================================== */}
      <section id="color-visualizer" className="py-12 bg-white border-b border-slate-200 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-semibold text-amber-700">
                Interactive Architectural Swatch &amp; System Recipe Studio
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Live Metallic &amp; Vinyl Flake Floor Visualizer
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-xl">
              Preview our top-selling 3D pearlescent metallic pigments and full-broadcast 1/4&quot; vinyl flake systems.
              Inspect the 3-step coating schedule and add the complete color bundle to your Phone Order List.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 5 Cols: Swatch Selector & Lighting Controls */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Select Metallic or Flake Finish ({VISUALIZER_PRESETS.length} Systems)
                </div>

                <div className="space-y-2.5">
                  {VISUALIZER_PRESETS.map((preset) => {
                    const isSelected = preset.id === activeVisualizerPreset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setActivePresetId(preset.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className="w-9 h-9 rounded-lg border border-white/30 shrink-0 shadow-inner"
                            style={{ background: preset.cssBackground }}
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate">{preset.name}</div>
                            <div
                              className={`text-[11px] truncate ${
                                isSelected ? 'text-amber-400' : 'text-slate-500'
                              }`}
                            >
                              {preset.family} · {preset.tag}
                            </div>
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ambient Lighting Simulation Switch */}
              <div className="pt-4 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-700 mb-2">Simulate Bay Lighting Reflection:</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'daylight', label: 'Open Garage Door' },
                    { id: 'showroom', label: 'Showroom LED' },
                    { id: 'warm', label: 'Warm Shop Light' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setLightingMode(mode.id as 'daylight' | 'showroom' | 'warm')}
                      className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap ${
                        lightingMode === mode.id
                          ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Live Procedural Floor Preview + 3-Step Recipe */}
            <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between">
              {/* Interactive Glossy Slab Viewport */}
              <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
                <div
                  className="w-full h-full transition-all duration-300"
                  style={{ background: activeVisualizerPreset.cssBackground }}
                >
                  {activeVisualizerPreset.chipPattern && (
                    <FlakeTextureSvgOverlay pattern={activeVisualizerPreset.chipPattern} />
                  )}
                </div>

                {/* Specular Gloss Reflection Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background:
                      lightingMode === 'showroom'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.25) 100%)'
                        : lightingMode === 'daylight'
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.0) 60%)'
                        : 'radial-gradient(circle at 50% 20%, rgba(254,243,199,0.28), rgba(0,0,0,0.35))',
                  }}
                />

                {/* Bottom Overlay Spec Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-transparent p-4 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <div className="text-xs font-mono text-amber-400">
                      {activeVisualizerPreset.family} · {activeVisualizerPreset.glossLevel}
                    </div>
                    <div className="text-xl font-extrabold text-white">{activeVisualizerPreset.name}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs text-slate-300">Est. Material Cost</div>
                    <div className="text-sm font-bold text-emerald-400 tabular-nums">
                      {formatCurrency(
                        isProMode
                          ? activeVisualizerPreset.systemPricePerSqFt * 0.85
                          : activeVisualizerPreset.systemPricePerSqFt
                      )}{' '}
                      / sq.ft.
                    </div>
                  </div>
                </div>
              </div>

              {/* 3-Step Official Bakersfield Tech Desk Recipe */}
              <div className="mt-6 space-y-3">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  3-Step Certified Application Schedule
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700">
                    <div className="text-xs font-mono font-bold text-amber-400">01. Base / Primer</div>
                    <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                      {activeVisualizerPreset.recipe.step1}
                    </p>
                  </div>
                  <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700">
                    <div className="text-xs font-mono font-bold text-amber-400">02. Color / Broadcast</div>
                    <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                      {activeVisualizerPreset.recipe.step2}
                    </p>
                  </div>
                  <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700">
                    <div className="text-xs font-mono font-bold text-amber-400">03. Armor Topcoat</div>
                    <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                      {activeVisualizerPreset.recipe.step3}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-300">
                  Bundles all required resins, pigments/flakes, and topcoats into your Phone Requisition List.
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAddVisualizerSystem}
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-4 py-3 rounded-xl transition-colors whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4 shrink-0" />
                    <span>Add {activeVisualizerPreset.name} Bundle to Phone List</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SIGNATURE ENGINE #4: HANDS-ON TRAINING CLASSES & TDS/SDS VAULT
      ====================================================================== */}
      <section id="training-classes" className="py-12 bg-slate-50 border-b border-slate-200 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          {/* Part A: Hands-On Certification Classes */}
          <div className="mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-xs font-mono font-semibold text-amber-700">
                  Epoxy Depot California Training Academy · 1113 W Columbus St, Bakersfield
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Hands-On Epoxy &amp; Polyaspartic Certification Classes
                </h2>
              </div>
              <p className="text-sm text-slate-600 max-w-xl">
                Stop learning by trial-and-error on paying client slabs. Train hands-on with our master installers in
                Bakersfield and leave with permanent 15% VIP contractor pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {TRAINING_CLASSES.map((cls) => {
                const activeTuition = isProMode ? cls.tuitionRetail * 0.85 : cls.tuitionRetail;
                return (
                  <div
                    key={cls.id}
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="text-amber-700 font-bold">{cls.code}</span>
                        <span className="text-emerald-700 font-semibold">
                          Live Availability: {cls.seatsLeft} of {cls.seatsTotal} Seats Remaining
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-900 mt-2">{cls.title}</h3>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="font-semibold text-slate-900">{cls.dateRange}</span>
                        <span aria-hidden="true">·</span>
                        <span>{cls.duration}</span>
                        <span aria-hidden="true">·</span>
                        <span>Instructor: {cls.instructor}</span>
                      </div>

                      <div className="mt-5 space-y-2">
                        <div className="text-xs font-mono font-bold text-slate-700 uppercase">
                          Hands-On Floor Curriculum:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {cls.modules.map((mod, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{mod}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-slate-800">
                        <span className="font-bold">Included Bonus: </span>
                        {cls.takeHomePerks}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-slate-500">
                          {isProMode ? '15% Pro Phone Registration Rate' : 'Standard Seat Tuition'}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-mono font-extrabold text-slate-900 tabular-nums">
                            {formatCurrency(activeTuition)}
                          </span>
                          {isProMode && (
                            <span className="text-xs font-mono text-slate-400 line-through tabular-nums">
                              {formatCurrency(cls.tuitionRetail)}
                            </span>
                          )}
                          <span className="text-xs text-slate-500">/ person</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => openClassBookingModal(cls)}
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap shrink-0"
                      >
                        <Phone className="w-4 h-4 shrink-0" />
                        <span>Call (661) 516-7201 to Reserve Seat</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Part B: Interactive TDS / SDS & Concrete Prep Vault */}
          <div id="tds-vault" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="text-xs font-mono font-semibold text-amber-700">
                  Architectural &amp; OSHA Jobsite Compliance Library
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  Specs, Technical Data Sheets (TDS), SDS &amp; Concrete Prep SOP Vault
                </h2>
              </div>

              {/* Vault Mode Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start">
                <button
                  type="button"
                  onClick={() => setVaultTab('tds')}
                  className={`px-3.5 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap ${
                    vaultTab === 'tds' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Technical Data Sheets (TDS)
                </button>
                <button
                  type="button"
                  onClick={() => setVaultTab('sds')}
                  className={`px-3.5 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap ${
                    vaultTab === 'sds' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Safety Data Sheets (SDS)
                </button>
                <button
                  type="button"
                  onClick={() => setVaultTab('sop')}
                  className={`px-3.5 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap ${
                    vaultTab === 'sop' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  CSP Concrete Prep Guide
                </button>
              </div>
            </div>

            {vaultTab === 'sop' ? (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono font-bold text-amber-700">STEP 01 · MECHANICAL PROFILE</div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    Diamond Grind to ICRI CSP 2–3 (Never Acid Etch)
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Acid etching leaves calcium salts in concrete capillaries and causes hot-tire delamination. Always
                    grind with 30/40-grit metal-bond diamonds until slab feels like 80-grit sandpaper and absorbs water
                    droplets within 5 seconds.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono font-bold text-amber-700">STEP 02 · CRACK &amp; JOINT WELDING</div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    V-Chase Shrinkage Cracks &amp; Polyurea Fill
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Open all cracks with a dry diamond V-blade, vacuum with a HEPA extractor, inject EDC-CRK600 Fast-Set
                    Polyurea with dry silica sand, and grind flush in 25 minutes before rolling primer.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono font-bold text-amber-700">STEP 03 · MIXING &amp; DEW POINT</div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    3-Minute Mechanical Mix &amp; Immediate Ribbon Pour
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Verify slab temperature is at least 5°F above ambient dew point. Mix Part A + Part B for 3 minutes at
                    350 RPM, then pour immediately in a ribbon onto the slab—never leave mixed 100% solids epoxy sitting
                    in the pail.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Product Selector Column */}
                <div className="lg:col-span-4 space-y-1.5 max-h-80 overflow-y-auto pr-1">
                  {PRODUCTS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedVaultProductId(p.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedVaultProduct.id === p.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{p.shortTitle}</span>
                      <span className="font-mono text-[11px] opacity-75 shrink-0 ml-2">{p.sku}</span>
                    </button>
                  ))}
                </div>

                {/* Live Spec Sheet Viewer */}
                <div className="lg:col-span-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                    <div>
                      <div className="text-xs font-mono font-bold text-amber-700">
                        {vaultTab === 'tds' ? 'OFFICIAL TECHNICAL DATA SHEET (TDS)' : 'OSHA SAFETY DATA SHEET (SDS)'} ·{' '}
                        {selectedVaultProduct.sku}
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">{selectedVaultProduct.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Spec Sheet</span>
                    </button>
                  </div>

                  {vaultTab === 'tds' ? (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="text-[11px] text-slate-500">Mix Ratio</div>
                          <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                            {selectedVaultProduct.specs.mixRatio}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="text-[11px] text-slate-500">Pot Life (75°F)</div>
                          <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                            {selectedVaultProduct.specs.potLife}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="text-[11px] text-slate-500">Coverage Rate</div>
                          <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                            {selectedVaultProduct.specs.coveragePerUnit}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="text-[11px] text-slate-500">Cure Schedule</div>
                          <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                            {selectedVaultProduct.specs.cureSchedule}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="text-[11px] text-slate-500">Solids Content</div>
                          <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                            {selectedVaultProduct.specs.solidsContent}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="text-[11px] text-slate-500">VOC Compliance</div>
                          <div className="text-xs font-mono font-bold text-emerald-700 mt-0.5">
                            {selectedVaultProduct.specs.vocContent}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="text-xs font-mono font-bold text-slate-800 mb-2">
                          Application &amp; Performance Notes:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {selectedVaultProduct.tdsHighlights.map((note, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="text-[11px] text-slate-500">GHS Signal Word &amp; Hazard Summary</div>
                        <div className="text-xs font-mono font-bold text-amber-700 mt-1">
                          {selectedVaultProduct.sdsSummary.signalWord}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="text-[11px] text-slate-500">Required Installer PPE</div>
                        <div className="text-xs font-mono font-bold text-slate-900 mt-1">
                          {selectedVaultProduct.sdsSummary.ppeRequired}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="text-[11px] text-slate-500">Warehouse Storage Conditions</div>
                        <div className="text-xs font-mono font-bold text-slate-900 mt-1">
                          {selectedVaultProduct.sdsSummary.storageTemp}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="text-[11px] text-slate-500">DOT / Freight Classification</div>
                        <div className="text-xs font-mono font-bold text-slate-900 mt-1">
                          {selectedVaultProduct.sdsSummary.unNumber}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          ATTRIBUTABLE CONTRACTOR SOCIAL PROOF & FOOTER
      ====================================================================== */}
      <section className="py-12 bg-white border-b border-slate-200 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-xs font-mono font-semibold text-amber-700">
            Verified California Contractor &amp; Homeowner Outcomes
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1 mb-6">
            Why 273+ Google Reviewers Call Bakersfield Direct Instead of Big-Box Stores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <blockquote className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                &ldquo;Before switching to Epoxy Depot California, we lost two days waiting on out-of-state freight and
                paid $240+ per kit. Calling Luis with our Reference Code cut our reorder time to 30 seconds, saved 15%
                on 15-gallon E4E-100 orders, and increased our crew&apos;s weekly output from 3 garages to 5.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-slate-200 text-xs">
                <div className="font-bold text-slate-900">Marco Villarreal, Owner &amp; Lead Installer</div>
                <div className="text-slate-500">Kern Valley Garage &amp; Industrial Coatings · Bakersfield, CA</div>
              </footer>
            </blockquote>

            <blockquote className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                &ldquo;I used the Sq. Ft. Calculator for my 750 sq. ft. 3-car garage in Fresno, toggled the high-moisture
                primer option, and called (661) 516-7201. The tech rep walked me through mixing ratios and dew point
                timing—zero bubbles, zero hot-tire pickup after 14 months.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-slate-200 text-xs">
                <div className="font-bold text-slate-900">Darren &amp; Elena Kowalski, Homeowners</div>
                <div className="text-slate-500">3-Car Domino Flake System · Fresno, CA</div>
              </footer>
            </blockquote>

            <blockquote className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                &ldquo;Took the 2-Day Bakersfield Certification Class before bidding our first 4,200 sq. ft. auto
                dealership showroom. The Copper Penny metallic recipe and Polyaspartic 85 topcoat cured glass-smooth and
                landed us $38,000 in repeat commercial contracts.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-slate-200 text-xs">
                <div className="font-bold text-slate-900">Devon St. Clair, Managing Partner</div>
                <div className="text-slate-500">Sierra Concrete Surface Prep · Visalia, CA</div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER
      ====================================================================== */}
      <footer className="bg-slate-950 text-slate-400 py-12 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <BrandLogoDrop className="w-9 h-9" />
                <span className="text-lg font-extrabold text-white tracking-tight">EPOXY DEPOT CALIFORNIA</span>
              </div>
              <p className="mt-3 text-xs text-slate-400 max-w-md leading-relaxed">
                Factory-direct floor coating warehouse, equipment showroom, and certified installer training facility. All
                orders, pallet quotes, and class bookings are handled personally over the phone so you get exact batch
                matching and 15% contractor pricing.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                <span>1113 W Columbus St, Bakersfield, CA 93301</span>
                <span aria-hidden="true">·</span>
                <a href="tel:6615167201" className="text-amber-400 font-bold hover:underline">
                  (661) 516-7201
                </a>
                <span aria-hidden="true">·</span>
                <a href="mailto:luisc@epoxydepotusa.com" className="hover:text-white">
                  luisc@epoxydepotusa.com
                </a>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
                Warehouse Sections
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#warehouse-catalog" className="hover:text-white transition-colors">
                    100% Solids Epoxy Systems
                  </a>
                </li>
                <li>
                  <a href="#warehouse-catalog" className="hover:text-white transition-colors">
                    Polyaspartic 85% UV Topcoats
                  </a>
                </li>
                <li>
                  <a href="#sqft-calculator" className="hover:text-white transition-colors">
                    Sq. Ft. Material Calculator
                  </a>
                </li>
                <li>
                  <a href="#color-visualizer" className="hover:text-white transition-colors">
                    Metallic &amp; Flake Visualizer
                  </a>
                </li>
                <li>
                  <a href="#training-classes" className="hover:text-white transition-colors">
                    Bakersfield Certification Classes
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
                Bakersfield Dispatch Hours
              </div>
              <div className="text-xs space-y-1.5">
                <div>Monday – Friday: 7:00 AM – 5:00 PM PT</div>
                <div>Saturday: Training Workshops &amp; Scheduled Will-Call</div>
                <div className="pt-2">
                  <a
                    href="tel:6615167201"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Desk: (661) 516-7201</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div>© {new Date().getFullYear()} Epoxy Depot California (epoxydepotcalifornia.com). All rights reserved.</div>
            <div>Phone-First Contractor Requisition Platform · No Online Credit Card Surcharges</div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          SLIDE-OUT "PHONE ORDER REQUISITION BUILDER" & PRINTABLE QUOTE DRAWER
      ====================================================================== */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs no-print">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Drawer Header */}
            <div className="p-5 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold text-amber-400">
                  PHONE ORDER REFERENCE ID: REF #{orderReferenceCode}
                </div>
                <h2 className="text-lg font-extrabold text-white mt-0.5">
                  Phone Order Requisition &amp; Quote Builder
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                aria-label="Close requisition drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Fulfillment & Pro Discount Toggle Inside Drawer */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFulfillmentMode('willcall')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-colors ${
                      fulfillmentMode === 'willcall'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Bakersfield Will-Call</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillmentMode('freight')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-colors ${
                      fulfillmentMode === 'freight'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Jobsite Freight</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs font-semibold text-slate-700">
                    15% Contractor Phone Order Discount:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsProMode(!isProMode)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                      isProMode ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isProMode ? 'ACTIVE (-15% APPLIED)' : 'CLICK TO ACTIVATE -15%'}
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                  <label htmlFor="job-name-input" className="text-xs text-slate-600 shrink-0">
                    Project / PO Tag:
                  </label>
                  <input
                    id="job-name-input"
                    type="text"
                    value={contractorJobName}
                    onChange={(e) => setContractorJobName(e.target.value)}
                    className="flex-1 text-right text-xs font-mono font-semibold bg-white border border-slate-300 rounded px-2 py-1"
                  />
                </div>
              </div>

              {/* Itemized Requisition List */}
              {orderList.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm font-bold text-slate-800">Your Phone Order Requisition List is empty.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Add products from the catalog or use the Sq. Ft. Calculator to build your kit.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  {orderList.map((item) => {
                    const unitActive = getActivePrice(item.retailUnitPrice);
                    return (
                      <div key={item.sku} className="p-3.5 bg-white flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[11px] font-mono font-bold text-amber-700">{item.sku}</div>
                          <div className="text-xs font-bold text-slate-900 mt-0.5">{item.name}</div>
                          <div className="text-[11px] text-slate-500">{item.variantLabel}</div>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateOrderQuantity(item.sku, -1)}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold px-1.5 tabular-nums">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateOrderQuantity(item.sku, 1)}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeOrderItem(item.sku)}
                              className="ml-2 text-slate-400 hover:text-red-600 p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right font-mono shrink-0">
                          <div className="text-xs font-bold text-slate-900 tabular-nums">
                            {formatCurrency(unitActive * item.quantity)}
                          </div>
                          {isProMode && (
                            <div className="text-[10px] text-slate-400 line-through tabular-nums">
                              {formatCurrency(item.retailUnitPrice * item.quantity)}
                            </div>
                          )}
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {formatCurrency(unitActive)} / unit
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* How Phone Dispatch Works Notice */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-800 space-y-1">
                <div className="font-bold text-slate-900">
                  30-Second Phone Dispatch Instructions (No Online Credit Card Needed):
                </div>
                <p className="leading-relaxed">
                  Call <span className="font-mono font-bold">(661) 516-7201</span> and read Luis or your Tech Rep your
                  Reference Code <span className="font-mono font-bold">REF #{orderReferenceCode}</span> or the SKU list
                  above. We verify batch lot numbers, apply your 15% contractor discount, and stage your order for
                  will-call or freight immediately.
                </p>
              </div>
            </div>

            {/* Drawer Footer: Subtotal, Savings & 3 Primary Action Buttons */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Standard Retail Subtotal:</span>
                  <span className="tabular-nums">{formatCurrency(orderTotals.retailSubtotal)}</span>
                </div>
                {isProMode && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>15% Contractor Phone Order Savings:</span>
                    <span className="tabular-nums">-{formatCurrency(orderTotals.proSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>Estimated Phone Order Total:</span>
                  <span className="tabular-nums">{formatCurrency(orderTotals.activeSubtotal)}</span>
                </div>
              </div>

              {/* Action 1: Call Now */}
              <a
                href="tel:6615167201"
                onClick={() => {
                  setCallModalContext({
                    title: `Place Phone Order · REF #${orderReferenceCode}`,
                    referenceCode: `REF #${orderReferenceCode}`,
                    subtitle: `Tell Luis or your Bakersfield Tech Rep your Reference Code #${orderReferenceCode} or read the itemized SKUs below`,
                    items: orderList.map((i) => ({
                      sku: i.sku,
                      label: `${i.name} (${i.variantLabel})`,
                      qty: `${i.quantity}x`,
                      price: formatCurrency(getActivePrice(i.retailUnitPrice) * i.quantity),
                    })),
                  });
                }}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm py-3.5 px-4 rounded-xl transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call (661) 516-7201 Now to Place This Order</span>
              </a>

              {/* Actions 2 & 3: Copy Itemized Summary + Print Official PDF Quote Sheet */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyOrderSummary}
                  className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-2.5 px-3 rounded-lg border border-slate-300 transition-colors whitespace-nowrap"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Copied SKU List!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 shrink-0" />
                      <span>Copy Order Summary</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3 rounded-lg transition-colors whitespace-nowrap"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Print / Save PDF Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          AMAZON-STYLE PRODUCT DETAIL QUICK-VIEW MODAL (Specs + TDS + SDS)
      ====================================================================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-amber-400">
                  {quickViewProduct.sku} · {quickViewProduct.category}
                </div>
                <h2 className="text-lg font-extrabold text-white mt-0.5">{quickViewProduct.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-5 bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center">
                <div className="w-full h-48">
                  <ProductPackagingSvg
                    type={quickViewProduct.illustrationType}
                    sku={quickViewProduct.sku}
                  />
                </div>
                <div className="mt-3 text-center">
                  <div className="text-xs font-mono font-bold text-emerald-700">
                    {quickViewProduct.willCallStock} Units Ready at Bakersfield Warehouse
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">1113 W Columbus St, Bakersfield, CA</div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                {/* Modal Sub-Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  {(['specs', 'tds', 'sds'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setQuickViewDocTab(tab)}
                      className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold uppercase transition-colors ${
                        quickViewDocTab === tab ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab === 'specs' ? 'Technical Specs' : tab === 'tds' ? 'TDS Sheet' : 'SDS Safety'}
                    </button>
                  ))}
                </div>

                {quickViewDocTab === 'specs' && (
                  <>
                    <p className="text-xs text-slate-600 leading-relaxed">{quickViewProduct.summary}</p>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-[10px] text-slate-500">Mix Ratio</div>
                        <div className="font-mono font-bold text-slate-900">{quickViewProduct.specs.mixRatio}</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-[10px] text-slate-500">Pot Life</div>
                        <div className="font-mono font-bold text-slate-900">{quickViewProduct.specs.potLife}</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-[10px] text-slate-500">Coverage</div>
                        <div className="font-mono font-bold text-slate-900">
                          {quickViewProduct.specs.coveragePerUnit}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-[10px] text-slate-500">Cure Schedule</div>
                        <div className="font-mono font-bold text-slate-900">{quickViewProduct.specs.cureSchedule}</div>
                      </div>
                    </div>
                  </>
                )}

                {quickViewDocTab === 'tds' && (
                  <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="text-xs font-mono font-bold text-slate-900">
                      Bakersfield Tech Desk Application Directives:
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {quickViewProduct.tdsHighlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {quickViewDocTab === 'sds' && (
                  <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-slate-900">Signal Word: </span>
                      <span className="font-mono text-amber-700 font-bold">
                        {quickViewProduct.sdsSummary.signalWord}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Required PPE: </span>
                      <span>{quickViewProduct.sdsSummary.ppeRequired}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Storage Temperature: </span>
                      <span>{quickViewProduct.sdsSummary.storageTemp}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Freight Classification: </span>
                      <span className="font-mono">{quickViewProduct.sdsSummary.unNumber}</span>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-500">15% Contractor Phone Order Price</div>
                    <div className="text-2xl font-mono font-extrabold text-slate-900 tabular-nums">
                      {formatCurrency(quickViewProduct.price * 0.85)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        addToOrderList(quickViewProduct, quickViewProduct.variants[0].id, 1, true);
                        setQuickViewProduct(null);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
                    >
                      + Add to Phone List
                    </button>
                    <a
                      href="tel:6615167201"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call (661) 516-7201</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TURNKEY CALIFORNIA INSTALLATION ESTIMATOR MODAL (PATH 2)
      ====================================================================== */}
      {installEstimatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-amber-400">PATH 2 · CERTIFIED CALIFORNIA INSTALL CREWS</div>
                <h2 className="text-lg font-extrabold text-white mt-0.5">
                  Turnkey Installation Estimate &amp; Dispatch Call
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setInstallEstimatorOpen(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  California Service Region:
                </label>
                <select
                  value={installCity}
                  onChange={(e) => setInstallCity(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold"
                >
                  <option>Bakersfield / Kern County</option>
                  <option>Fresno / Central Valley</option>
                  <option>Los Angeles / Santa Clarita / San Fernando Valley</option>
                  <option>Inland Empire / Orange County</option>
                  <option>Central Coast / San Luis Obispo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Approximate Slab Size (Sq. Ft.):
                </label>
                <input
                  type="number"
                  min={200}
                  max={25000}
                  step={50}
                  value={installSqFt}
                  onChange={(e) => setInstallSqFt(Number(e.target.value) || 400)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Desired Turnkey System:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'flake', label: '1-Day Flake Garage', rate: '$6.50–$8.50/sf' },
                    { id: 'metallic', label: 'Showroom Metallic', rate: '$9.50–$13.00/sf' },
                    { id: 'commercial', label: 'Commercial Bay', rate: '$5.75–$8.00/sf' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setInstallFinish(opt.id as 'flake' | 'metallic' | 'commercial')}
                      className={`p-2.5 rounded-lg border text-left ${
                        installFinish === opt.id
                          ? 'bg-amber-50 border-amber-500'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                      <div className="text-[10px] font-mono text-amber-700 mt-0.5">{opt.rate}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-400">
                    INSTALL SPEC CODE: #INST-{installFinish.toUpperCase()}-{installSqFt}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Includes diamond grinding, crack weld, moisture primer &amp; UV topcoat
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs text-slate-400">Est. Turnkey Range</div>
                  <div className="text-lg font-extrabold text-emerald-400 tabular-nums">
                    {formatCurrency(
                      installSqFt * (installFinish === 'metallic' ? 9.5 : installFinish === 'flake' ? 6.5 : 5.75)
                    )}{' '}
                    –{' '}
                    {formatCurrency(
                      installSqFt * (installFinish === 'metallic' ? 12.5 : installFinish === 'flake' ? 8.5 : 7.75)
                    )}
                  </div>
                </div>
              </div>

              <a
                href="tel:6615167201"
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm py-3.5 px-4 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call (661) 516-7201 to Schedule Site Walk / Lock Estimate</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          QUICK-CALL DISPATCH SCRIPT MODAL (FOR PRODUCTS, CLASSES & ORDERS)
      ====================================================================== */}
      {callModalContext && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-amber-400">{callModalContext.referenceCode}</div>
                <h2 className="text-lg font-extrabold text-white mt-0.5">{callModalContext.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setCallModalContext(null)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">{callModalContext.subtitle}</p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 divide-y divide-slate-200">
                {callModalContext.items.map((it, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-amber-700 mr-2">[{it.sku}]</span>
                      <span className="font-semibold text-slate-900">{it.label}</span>
                    </div>
                    <div className="font-mono font-bold text-slate-900 shrink-0 tabular-nums">
                      {it.qty} · {it.price}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="tel:6615167201"
                className="w-full flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-base py-4 px-5 rounded-xl transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5" />
                <span>Dial (661) 516-7201 Now</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MOBILE BOTTOM STICKY APP BAR (<= 15% Viewport Height Cap)
      ====================================================================== */}
      <nav
        aria-label="Mobile quick actions"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950 text-white border-t border-slate-800 h-14 px-2 flex items-center justify-around no-print"
      >
        <a
          href="#warehouse-catalog"
          className="flex flex-col items-center justify-center text-[10px] font-semibold text-slate-300 hover:text-white"
        >
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>Shop</span>
        </a>
        <a
          href="#sqft-calculator"
          className="flex flex-col items-center justify-center text-[10px] font-semibold text-slate-300 hover:text-white"
        >
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>Sq.Ft. Calc</span>
        </a>
        <button
          type="button"
          onClick={() => setIsProMode(!isProMode)}
          className="flex flex-col items-center justify-center text-[10px] font-bold text-amber-400"
        >
          <Award className="w-4 h-4" />
          <span>{isProMode ? '15% Pro ON' : '15% Pro OFF'}</span>
        </button>
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center justify-center text-[10px] font-semibold text-slate-300 hover:text-white"
        >
          <ClipboardList className="w-4 h-4 text-amber-400" />
          <span>List ({orderTotals.totalUnits})</span>
        </button>
        <a
          href="tel:6615167201"
          className="flex items-center gap-1 bg-amber-500 text-slate-950 font-extrabold text-xs px-3 py-2 rounded-lg"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Desk</span>
        </a>
      </nav>

      {/* =====================================================================
          PRINTABLE OFFICIAL PDF QUOTE SHEET (VISIBLE WHEN PRINTING)
      ====================================================================== */}
      <div className="hidden print-only p-8 text-black bg-white">
        <div className="flex items-start justify-between border-b-2 border-black pb-4">
          <div>
            <h1 className="text-2xl font-extrabold">EPOXY DEPOT CALIFORNIA — OFFICIAL PHONE REQUISITION &amp; QUOTE</h1>
            <p className="text-sm font-mono mt-1">
              1113 W Columbus St, Bakersfield, CA 93301 · Phone Dispatch: (661) 516-7201 · luisc@epoxydepotusa.com
            </p>
          </div>
          <div className="text-right font-mono">
            <div className="text-lg font-bold">REF #{orderReferenceCode}</div>
            <div className="text-xs">Project: {contractorJobName}</div>
            <div className="text-xs">
              Fulfillment: {fulfillmentMode === 'willcall' ? 'Same-Day Bakersfield Will-Call' : '24-48hr CA Freight'}
            </div>
          </div>
        </div>

        <table className="w-full mt-6 border-collapse text-sm">
          <thead>
            <tr className="border-b border-black text-left font-mono">
              <th className="py-2">SKU</th>
              <th className="py-2">Product &amp; Variant</th>
              <th className="py-2 text-right">Qty</th>
              <th className="py-2 text-right">Retail Unit</th>
              <th className="py-2 text-right">15% Pro Rate</th>
              <th className="py-2 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((item) => (
              <tr key={item.sku} className="border-b border-slate-300 font-mono">
                <td className="py-2 font-bold">{item.sku}</td>
                <td className="py-2">
                  {item.name} — {item.variantLabel}
                </td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">{formatCurrency(item.retailUnitPrice)}</td>
                <td className="py-2 text-right">{formatCurrency(item.retailUnitPrice * 0.85)}</td>
                <td className="py-2 text-right font-bold">
                  {formatCurrency(getActivePrice(item.retailUnitPrice) * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-end">
          <div className="w-80 space-y-1 text-sm font-mono">
            <div className="flex justify-between">
              <span>Retail Subtotal:</span>
              <span>{formatCurrency(orderTotals.retailSubtotal)}</span>
            </div>
            {isProMode && (
              <div className="flex justify-between font-bold">
                <span>15% Phone Order Savings:</span>
                <span>-{formatCurrency(orderTotals.proSavings)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-extrabold border-t border-black pt-2">
              <span>Total Phone Order Quote:</span>
              <span>{formatCurrency(orderTotals.activeSubtotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

// Card 1: Food Delivery Platter Illustration
export const FoodDeliveryArt = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="plateShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="dosaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id="chutneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <linearGradient id="sambarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="thaliSilver" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="50%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
    </defs>

    {/* Shadow under thali */}
    <ellipse cx="108" cy="98" rx="84" ry="46" fill="url(#plateShadow)" />

    {/* Silver Thali Platter */}
    <ellipse cx="106" cy="92" rx="80" ry="44" fill="url(#thaliSilver)" stroke="#e2e8f0" strokeWidth="3" />
    <ellipse cx="106" cy="92" rx="74" ry="40" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

    {/* Banana Leaf Bed */}
    <path d="M42 90 C50 68 85 64 125 72 C155 78 172 96 164 108 C150 125 100 124 62 114 Z" fill="#22c55e" opacity="0.9" />
    <path d="M46 92 C80 82 120 86 160 106" stroke="#15803d" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />

    {/* Crispy Golden Masala Dosa */}
    <g transform="rotate(-12 100 85)">
      <path d="M45 80 C60 52 140 50 165 78 C155 96 75 104 45 80 Z" fill="url(#dosaGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
      {/* Roast streaks on Dosa */}
      <path d="M70 68 C85 60 120 62 135 74" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <path d="M85 76 C100 70 125 74 145 84" stroke="#78350f" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </g>

    {/* Coconut Chutney Katori */}
    <ellipse cx="62" cy="110" rx="18" ry="12" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
    <ellipse cx="62" cy="108" rx="16" ry="10" fill="url(#chutneyGrad)" />
    {/* Mustard seeds tadka in chutney */}
    <circle cx="58" cy="107" r="1" fill="#0f172a" />
    <circle cx="64" cy="106" r="1.2" fill="#0f172a" />
    <circle cx="62" cy="110" r="1" fill="#0f172a" />
    <circle cx="67" cy="108" r="0.8" fill="#15803d" />
    <path d="M60 109 C63 108 65 110 66 107" stroke="#15803d" strokeWidth="1" />

    {/* Spicy Tomato Sambar Bowl */}
    <ellipse cx="148" cy="112" rx="20" ry="13" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
    <ellipse cx="148" cy="110" rx="18" ry="11" fill="url(#sambarGrad)" />
    {/* Sambar vegetables garnish */}
    <ellipse cx="144" cy="109" rx="4" ry="2.5" fill="#f59e0b" />
    <circle cx="152" cy="111" r="2" fill="#22c55e" />
    <circle cx="147" cy="113" r="1.5" fill="#78350f" />

    {/* Sweet Gulab Jamun small katori */}
    <ellipse cx="106" cy="122" rx="16" ry="10" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
    <ellipse cx="106" cy="121" rx="14" ry="8" fill="#fef08a" opacity="0.5" />
    <circle cx="106" cy="120" r="6.5" fill="#451a03" stroke="#78350f" strokeWidth="0.8" />
    <circle cx="104" cy="118" r="1.5" fill="#ffffff" opacity="0.4" />
  </svg>
);

// Card 2: Instamart Grocery Basket Illustration
export const InstamartArt = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="basketShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="crateWood" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id="milkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#bfdbfe" />
      </linearGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="108" cy="136" rx="72" ry="18" fill="url(#basketShadow)" />

    {/* Grocery items peaking out */}
    {/* Celery / Fresh Greens */}
    <g transform="rotate(-15 65 50)">
      <path d="M60 75 C55 45 42 30 35 22 C48 28 58 38 65 75 Z" fill="#22c55e" />
      <path d="M68 75 C68 40 65 24 58 14 C72 24 75 38 72 75 Z" fill="#16a34a" />
      <path d="M74 75 C80 42 88 28 98 18 C88 28 82 42 76 75 Z" fill="#15803d" />
    </g>

    {/* French Baguette Bread */}
    <g transform="rotate(22 135 60)">
      <rect x="130" y="20" width="22" height="65" rx="10" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
      <ellipse cx="141" cy="35" rx="7" ry="2.5" fill="#b45309" opacity="0.6" />
      <ellipse cx="141" cy="48" rx="7" ry="2.5" fill="#b45309" opacity="0.6" />
      <ellipse cx="141" cy="62" rx="7" ry="2.5" fill="#b45309" opacity="0.6" />
    </g>

    {/* Fresh Milk Bottle */}
    <g transform="rotate(-6 100 65)">
      <rect x="92" y="38" width="26" height="48" rx="6" fill="url(#milkGrad)" stroke="#93c5fd" strokeWidth="1.5" />
      <rect x="97" y="30" width="16" height="10" rx="3" fill="#3b82f6" />
      <rect x="94" y="54" width="22" height="16" rx="2" fill="#60a5fa" opacity="0.8" />
      <text x="96" y="65" fill="white" fontSize="8" fontWeight="bold">MILK</text>
    </g>

    {/* Red Ripe Tomatoes */}
    <circle cx="78" cy="92" r="14" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
    <circle cx="74" cy="88" r="3" fill="#ffffff" opacity="0.5" />
    <path d="M78 80 L76 75 L80 77 L83 74 L81 80 Z" fill="#15803d" />

    <circle cx="128" cy="94" r="13" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
    <circle cx="125" cy="90" r="2.5" fill="#ffffff" opacity="0.5" />
    <path d="M128 83 L126 78 L130 80 L133 77 L131 83 Z" fill="#15803d" />

    {/* Fresh Carrot */}
    <g transform="rotate(40 115 88)">
      <polygon points="112,80 120,80 116,112" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
      <path d="M116 80 L114 74 L118 73 L117 80" stroke="#16a34a" strokeWidth="1.5" />
    </g>

    {/* Brown Craft Basket / Wicker Crate */}
    <path d="M48 88 L60 134 C61 138 65 140 69 140 L145 140 C149 140 153 138 154 134 L166 88 Z" fill="url(#crateWood)" stroke="#78350f" strokeWidth="2" />
    {/* Basket slats */}
    <path d="M52 98 L162 98" stroke="#78350f" strokeWidth="2.5" />
    <path d="M56 112 L158 112" stroke="#78350f" strokeWidth="2.5" />
    <path d="M59 126 L154 126" stroke="#78350f" strokeWidth="2.5" />
    {/* Instamart lightning bolt badge on crate */}
    <rect x="94" y="104" width="26" height="22" rx="5" fill="#5a2c91" />
    <path d="M108 107 L102 115 L107 115 L105 123 L113 113 L108 113 Z" fill="#fbbf24" />
  </svg>
);

// Card 3: Dineout Fine Dining Illustration
export const DineoutArt = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="dineShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="silverPlatter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="45%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      <linearGradient id="clocheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor="#e2e8f0" />
        <stop offset="70%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="wineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#be123c" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="106" cy="132" rx="76" ry="20" fill="url(#dineShadow)" />

    {/* Crisp White Linen Napkin Base */}
    <path d="M48 118 L110 94 L164 126 L98 144 Z" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />

    {/* Elegant Silver Tray */}
    <ellipse cx="106" cy="122" rx="66" ry="24" fill="url(#silverPlatter)" stroke="#94a3b8" strokeWidth="2" />
    <ellipse cx="106" cy="120" rx="58" ry="19" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

    {/* Silver Cloche Dome */}
    <path d="M60 114 C60 70 152 70 152 114 Z" fill="url(#clocheGrad)" stroke="#64748b" strokeWidth="1.5" />
    {/* Cloche Rim */}
    <ellipse cx="106" cy="114" rx="46" ry="8" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
    {/* Cloche Handle Knobs */}
    <circle cx="106" cy="68" r="6" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
    <path d="M102 73 C102 77 110 77 110 73" stroke="#475569" strokeWidth="2" />

    {/* Elegant Fork on Left */}
    <g transform="rotate(-15 42 100)">
      <rect x="40" y="80" width="3" height="42" rx="1.5" fill="#94a3b8" />
      <path d="M37 68 L37 80 L46 80 L46 68" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
      <line x1="40" y1="68" x2="40" y2="78" stroke="#94a3b8" strokeWidth="1.2" />
      <line x1="43" y1="68" x2="43" y2="78" stroke="#94a3b8" strokeWidth="1.2" />
    </g>

    {/* Knife on Right */}
    <g transform="rotate(18 168 100)">
      <rect x="166" y="82" width="3" height="40" rx="1.5" fill="#94a3b8" />
      <path d="M166 65 C170 70 170 82 166 82 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
    </g>

    {/* Wine Glass */}
    <g transform="translate(138, 38)">
      <ellipse cx="16" cy="48" rx="9" ry="3" fill="#cbd5e1" />
      <line x1="16" y1="28" x2="16" y2="48" stroke="#cbd5e1" strokeWidth="2" />
      <path d="M8 8 C8 26 24 26 24 8 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.7" />
      <path d="M10 14 C10 24 22 24 22 14 Z" fill="url(#wineGrad)" opacity="0.85" />
    </g>
  </svg>
);

// Decorative Left Veggies Bag
export const VeggiesDecorativeArt = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Craft paper grocery bag */}
    <path d="M40 90 L80 230 L190 230 L220 90 Z" fill="#d97706" opacity="0.9" stroke="#b45309" strokeWidth="3" />
    <path d="M35 90 L225 90 L215 105 L45 105 Z" fill="#b45309" />
    {/* Bag folds */}
    <line x1="80" y1="105" x2="105" y2="230" stroke="#92400e" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
    <line x1="175" y1="105" x2="160" y2="230" stroke="#92400e" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />

    {/* Spilling fresh vegetables */}
    {/* Broccoli head */}
    <g transform="translate(45, 40)">
      <circle cx="28" cy="28" r="16" fill="#15803d" />
      <circle cx="44" cy="22" r="14" fill="#16a34a" />
      <circle cx="20" cy="40" r="14" fill="#22c55e" />
      <circle cx="36" cy="40" r="16" fill="#15803d" />
      <path d="M32 50 L32 75" stroke="#86efac" strokeWidth="8" strokeLinecap="round" />
    </g>

    {/* Ripe red bell peppers / tomatoes */}
    <circle cx="115" cy="70" r="26" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
    <circle cx="108" cy="62" r="6" fill="#ffffff" opacity="0.5" />
    <path d="M115 48 C115 40 125 38 122 34" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />

    <circle cx="160" cy="78" r="24" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
    <circle cx="154" cy="72" r="5" fill="#ffffff" opacity="0.5" />
    <path d="M160 56 C160 50 168 48 166 44" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />

    {/* Carrots */}
    <g transform="rotate(35 150 40)">
      <polygon points="140,20 156,20 148,85" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
      <path d="M148 20 L144 5 L152 2 L148 20" stroke="#16a34a" strokeWidth="3" />
    </g>

    {/* Celery leaves */}
    <path d="M180 85 C195 40 215 30 230 15 C215 35 210 55 195 90 Z" fill="#4ade80" />
    <path d="M170 85 C185 30 200 20 210 5 C200 28 190 50 180 90 Z" fill="#22c55e" />
  </svg>
);

// Decorative Right Sushi Board
export const SushiDecorativeArt = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wooden Bamboo Sushi Platter */}
    <g transform="rotate(-15 120 120)">
      <rect x="30" y="70" width="180" height="95" rx="8" fill="#78350f" stroke="#451a03" strokeWidth="3" />
      <rect x="34" y="74" width="172" height="87" rx="6" fill="#92400e" />
      {/* Wood grain */}
      <line x1="36" y1="95" x2="204" y2="95" stroke="#78350f" strokeWidth="1.5" opacity="0.6" />
      <line x1="36" y1="120" x2="204" y2="120" stroke="#78350f" strokeWidth="1.5" opacity="0.6" />
      <line x1="36" y1="145" x2="204" y2="145" stroke="#78350f" strokeWidth="1.5" opacity="0.6" />

      {/* Salmon Nigiri 1 */}
      <ellipse cx="65" cy="100" rx="18" ry="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <ellipse cx="65" cy="97" rx="19" ry="8" fill="#fb923c" stroke="#ea580c" strokeWidth="1.5" />
      <line x1="52" y1="97" x2="78" y2="97" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />

      {/* Salmon Nigiri 2 */}
      <ellipse cx="110" cy="100" rx="18" ry="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <ellipse cx="110" cy="97" rx="19" ry="8" fill="#fb923c" stroke="#ea580c" strokeWidth="1.5" />
      <line x1="97" y1="97" x2="123" y2="97" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />

      {/* California Maki Rolls */}
      <g transform="translate(145, 85)">
        <circle cx="16" cy="16" r="14" fill="#0f172a" stroke="#000000" strokeWidth="2" />
        <circle cx="16" cy="16" r="11" fill="#ffffff" />
        <circle cx="16" cy="16" r="6" fill="#f97316" />
        <circle cx="14" cy="14" r="3" fill="#22c55e" />
      </g>

      <g transform="translate(60, 120)">
        <circle cx="16" cy="16" r="14" fill="#0f172a" stroke="#000000" strokeWidth="2" />
        <circle cx="16" cy="16" r="11" fill="#ffffff" />
        <circle cx="16" cy="16" r="6" fill="#ef4444" />
        <circle cx="17" cy="14" r="3" fill="#eab308" />
      </g>

      {/* Wasabi dollop */}
      <circle cx="120" cy="132" r="8" fill="#84cc16" stroke="#65a30d" strokeWidth="1" />
      {/* Ginger slice */}
      <path d="M140 130 C146 125 152 135 145 138 Z" fill="#fda4af" />

      {/* Chopsticks */}
      <line x1="20" y1="60" x2="210" y2="78" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="54" x2="210" y2="74" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

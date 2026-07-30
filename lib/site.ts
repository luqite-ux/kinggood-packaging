// KINGGOOD Packaging — single source of truth for all site content

/** CDN image constants – all authentic customer assets */
export const IMAGES = {
  logo: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/logo.png',
  factoryExterior:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/factory-exterior.png',
  productionWorkshop:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/production-workshop.png',
  employeeCanteen:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/employee-canteen.png',
  palletSingle:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/pallet-single.jpg',
  palletStack:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/pallet-stack.jpg',
  openFrameCrates:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/open-frame-crates.jpg',
  plywoodCrates:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/plywood-crates.jpg',
  crateWarehouse:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/crate-warehouse.jpg',
  cableReelLarge:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/cable-reel-large.jpg',
  cableReelMedium:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/cable-reel-medium.jpg',
  cableReelFlanges:
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/cable-reel-flanges.jpg',
} as const

export const company = {
  brand: 'KINGGOOD',
  legalName: 'Kinggood Packaging Materials (Nantong) Co., Ltd.',
  cnName: '\u91d1\u56fa\u5fb7\u5305\u88c5\u6750\u6599\uff08\u5357\u901a\uff09\u80a1\u4efd\u6709\u9650\u516c\u53f8',
  tagline: 'Engineered Wood Packaging for Global Logistics',
  founded: '2010',
  facilityArea: '36,300',
  workshops: '5',
  productionLinesTotal: '12',
  productionLinesNote: '5 automated lines + 7 customized lines',
  palletCapacity: '3,000',
  phone: '+86 138 6190 8717',
  phoneRaw: '+8613861908717',
  email: 'kinggood66@163.com',
  address: "Group 10, Qianzhuang Village, Yazhou Town, Hai\u2019an, Nantong, Jiangsu, China",
  addressShort: "Hai\u2019an, Nantong, Jiangsu, China",
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Custom Packaging', href: '/custom-packaging' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
]

export const stats = [
  { value: '2010', label: 'Founded', suffix: '' },
  { value: '36,300', label: 'Facility Area', suffix: ' m\u00b2' },
  { value: '5', label: 'Workshops', suffix: '' },
  { value: '12', label: 'Production Lines', suffix: '', note: '5 automated + 7 customized' },
  { value: '3,000', label: 'Pallets / Day', suffix: '+' },
]

export type ProductSpec = { label: string; value: string }
export type ProductHighlight = { title: string; description: string }
export type Product = {
  slug: string
  name: string
  category: 'pallets' | 'crates' | 'cable-reels'
  categoryLabel: string
  image: string
  gallery: string[]
  tagline: string
  summary: string
  highlights: ProductHighlight[]
  overview: string
  materials: string[]
  dimensions: string
  applications: string[]
  handlingNotes: string[]
  specs: ProductSpec[]
}

export const products: Product[] = [
  {
    slug: 'eu-standard-solid-wood-pallet',
    name: 'European Standard Solid Wood Pallet',
    category: 'pallets',
    categoryLabel: 'Pallets',
    image: IMAGES.palletSingle,
    gallery: [IMAGES.palletSingle, IMAGES.palletStack],
    tagline: 'Robust solid wood construction for European and international logistics.',
    summary:
      'KINGGOOD produces solid wood pallets aligned to European standard dimensions, built from kiln-dried timber processed through our own log-to-assembly supply chain. Treatment and export documentation can be arranged according to destination requirements and applicable import regulations.',
    highlights: [
      {
        title: 'Solid Timber Construction',
        description:
          'Kiln-dried solid wood delivers high structural rigidity, repairability and long service life under standard warehousing and forklift conditions.',
      },
      {
        title: 'Configurable Treatment',
        description:
          'Phytosanitary treatment type and documentation are confirmed per destination and applicable import regulations.',
      },
      {
        title: 'Repairability',
        description:
          'Individual deck boards and bearers are replaceable in the field, extending service life and reducing replacement cost.',
      },
    ],
    overview:
      'These pallets follow European standard footprint dimensions and are manufactured with solid timber deck boards and four-way entry bearers. Board thickness, deck board count and bearer dimensions can be adjusted within structural bounds per order requirements.',
    materials: [
      'Kiln-dried solid timber (pine, poplar or equivalent)',
      'Galvanised or standard nails and fasteners as specified',
      'Treatment: confirmed per destination requirements',
    ],
    dimensions:
      'Standard European footprint available; specific dimensions, board thickness and load configuration confirmed per project.',
    applications: [
      'General warehousing and distribution',
      'Export consolidation and container loading',
      'Automated logistics and racking systems (dimension-dependent)',
      'Heavy goods requiring a sturdy flat base',
    ],
    handlingNotes: [
      'Store on a level, dry surface; avoid prolonged outdoor exposure.',
      'Inspect for damaged boards before each reuse cycle.',
      'Forklift tine width and approach direction must match the entry configuration.',
      'Treatment requirements for destination countries should be confirmed before ordering.',
    ],
    specs: [
      { label: 'Construction', value: 'Solid timber' },
      { label: 'Entry', value: '4-way / 2-way (configurable)' },
      { label: 'Footprint', value: 'European standard; custom available' },
      { label: 'Treatment', value: 'Confirmed per destination' },
      { label: 'Load capacity', value: 'Confirmed per project specification' },
    ],
  },
  {
    slug: 'international-standard-plywood-pallet',
    name: 'International Standard Plywood Pallet',
    category: 'pallets',
    categoryLabel: 'Pallets',
    image: IMAGES.palletStack,
    gallery: [IMAGES.palletStack, IMAGES.palletSingle],
    tagline: 'Engineered plywood panels for dimensional stability and lighter weight.',
    summary:
      'Manufactured using hot-pressed multi-layer plywood, these pallets offer dimensional stability, anti-warping properties and lighter weight than equivalent solid wood construction. Export suitability including any applicable treatment or documentation is assessed per project based on destination and cargo requirements.',
    highlights: [
      {
        title: 'Dimensional Stability',
        description:
          'Multi-layer cross-ply construction resists warping and maintains consistent flat deck geometry under varying humidity and load.',
      },
      {
        title: 'Lighter Weight',
        description:
          'Engineered plywood construction reduces self-weight versus solid wood, lowering overall freight cost per shipment.',
      },
      {
        title: 'Precision Machining',
        description:
          'CNC-cut panels and consistent thickness support compatibility with standard forklifts, AGVs and racking systems.',
      },
    ],
    overview:
      'The plywood pallet deck is produced from hot-pressed multi-layer panels, cut to the specified footprint and assembled with solid wood or plywood bearer blocks. Flat deck surface geometry and consistent tolerances make these suitable for automated handling lines and stereoscopic warehousing.',
    materials: [
      'Multi-layer hot-pressed plywood panels (poplar, birch or equivalent)',
      'Bearer blocks: solid wood or plywood laminate as specified',
      'Adhesives: low-formaldehyde grades where required',
    ],
    dimensions:
      'ISO footprint dimensions available; custom footprints, board thickness and bearer configurations confirmed per project.',
    applications: [
      'Automated warehousing and AGV systems',
      'Racking systems requiring a flat, consistent deck surface',
      'Export shipments requiring lighter-weight pallet base',
      'Precision goods and electronics distribution',
    ],
    handlingNotes: [
      'Avoid dragging or dropping pallets to prevent edge delamination.',
      'Store in a dry environment; avoid prolonged exposure to standing water.',
      'Treatment and documentation requirements are confirmed per destination and applicable regulations.',
      'Inspect panel faces and bearer bonds before each reuse.',
    ],
    specs: [
      { label: 'Construction', value: 'Multi-layer plywood' },
      { label: 'Entry', value: '4-way / 2-way (configurable)' },
      { label: 'Footprint', value: 'ISO standard; custom available' },
      { label: 'Treatment', value: 'Confirmed per destination' },
      { label: 'Load capacity', value: 'Confirmed per project specification' },
    ],
  },
  {
    slug: 'custom-sized-pallet',
    name: 'Custom-Sized Pallet',
    category: 'pallets',
    categoryLabel: 'Pallets',
    image: IMAGES.palletSingle,
    gallery: [IMAGES.palletSingle, IMAGES.palletStack],
    tagline: 'Configured around your cargo, handling equipment and logistics requirements.',
    summary:
      'Custom pallets are designed from the ground up to match your cargo footprint, carton layout, forklift or AGV specifications, racking dimensions, production line pitch and container or truck inner dimensions. Precise tolerances prevent shifting, jamming and loading failures in automated environments.',
    highlights: [
      {
        title: 'Fit to Cargo and Equipment',
        description:
          'Dimensions are set to match your cargo footprint, carton layout, forklift tine spread, AGV guide requirements and racking bay dimensions.',
      },
      {
        title: 'Container and Truck Optimisation',
        description:
          'Footprint is calculated against truck and container inner dimensions to maximise single-vehicle loading and reduce freight cost.',
      },
      {
        title: 'Automation-Grade Tolerances',
        description:
          'Tight tolerances on flatness, thickness and squareness maintain reliable continuous operation on automated and robotic lines.',
      },
    ],
    overview:
      'Where standard pallet sizes create wasted deck space, overhang risk or compatibility issues with your handling equipment, custom pallets resolve those constraints directly. Boards and bearers are machined to specified dimensions, and tolerances are agreed in advance to match your line requirements.',
    materials: [
      'Solid timber: pine, poplar or equivalent per specification',
      'Plywood panels: multi-layer hot-pressed, grade as specified',
      'Fasteners and treatment: confirmed per project',
    ],
    dimensions:
      'All dimensions specified by customer. Send cargo footprint, carton layout, forklift/AGV specs and container or truck inner dimensions for a proposal.',
    applications: [
      'Automated production lines and robotic handling cells',
      'AGV-based warehousing and smart logistics systems',
      'Custom racking bays and stereoscopic warehouses',
      'Truck and container optimisation for specific cargo configurations',
    ],
    handlingNotes: [
      'Provide forklift tine dimensions and approach direction when enquiring.',
      'Confirm AGV track gauge and sensor clearance requirements during design.',
      'Treatment requirements are confirmed per destination.',
      'A drawing or sample can be approved before production where required.',
    ],
    specs: [
      { label: 'Construction', value: 'Solid wood or plywood (customer choice)' },
      { label: 'Dimensions', value: 'Fully specified per customer requirement' },
      { label: 'Entry', value: '2-way / 4-way as designed' },
      { label: 'Tolerances', value: 'Confirmed per application' },
      { label: 'Treatment', value: 'Confirmed per destination' },
    ],
  },
  {
    slug: 'solid-wood-crate',
    name: 'Solid Wood Crate',
    category: 'crates',
    categoryLabel: 'Heavy-Duty Wood Crates',
    image: IMAGES.crateWarehouse,
    gallery: [IMAGES.crateWarehouse, IMAGES.openFrameCrates],
    tagline: 'High structural rigidity for heavy machinery and demanding export conditions.',
    summary:
      'Solid wood crates offer high structural rigidity through natural timber construction combined with reinforced joinery. They are suited to heavy machinery, capital equipment and high-value cargo where robust protection is required throughout multimodal export handling. Actual load capacity depends on the structural specification confirmed for each project.',
    highlights: [
      {
        title: 'Structural Rigidity',
        description:
          'Solid timber framing and reinforced joinery resist compression, racking and impact forces throughout multimodal handling and stacking.',
      },
      {
        title: 'Configurable Protection',
        description:
          'Moisture-resistant linings, shock-absorbing inserts and internal dunnage can be specified according to cargo sensitivity and route conditions.',
      },
      {
        title: 'Field-Repaired and Reused',
        description:
          'Individual panels and members can be replaced on-site, supporting crate reuse where structure, load and handling conditions permit.',
      },
    ],
    overview:
      'Solid wood crates are constructed with a solid timber base frame, vertical corner posts and horizontal or diagonal wall members. Panel boards are nail-fixed or bolted depending on load requirements. The base integrates forklift entry. The structural design, wall thickness and board dimensions are confirmed per project based on cargo weight, stacking requirements and handling methods.',
    materials: [
      'Solid timber frame members and panel boards (pine or equivalent)',
      'Metal corner clips and bolt fasteners where specified',
      'Moisture-resistant lining, foam or EPE insert as required',
    ],
    dimensions:
      'All internal and external dimensions confirmed per project. Contact our team with cargo length, width, height and weight for a structural proposal.',
    applications: [
      'Heavy industrial machinery and capital equipment',
      'Motors, compressors and large mechanical assemblies',
      'High-value equipment requiring maximum structural protection',
      'Multimodal export shipments with significant stacking loads',
    ],
    handlingNotes: [
      'Lifting method must be specified during design to ensure correct structural detailing.',
      'Stacking load and layers must be confirmed at ordering stage.',
      'Treatment requirements for export destinations are confirmed per applicable regulations.',
      'Inspect crate integrity after each handling cycle before reuse.',
    ],
    specs: [
      { label: 'Construction', value: 'Solid timber frame and panels' },
      { label: 'Joinery', value: 'Nails, bolts or clips as specified' },
      { label: 'Load capacity', value: 'Confirmed per structural specification' },
      { label: 'Wall thickness', value: 'Confirmed per project' },
      { label: 'Treatment', value: 'Confirmed per destination' },
    ],
  },
  {
    slug: 'plywood-crate',
    name: 'Plywood Crate',
    category: 'crates',
    categoryLabel: 'Heavy-Duty Wood Crates',
    image: IMAGES.plywoodCrates,
    gallery: [IMAGES.plywoodCrates, IMAGES.crateWarehouse],
    tagline: 'Lighter weight, dimensional customisation and efficient handling.',
    summary:
      'Plywood crates offer structural enclosure with lower self-weight than equivalent solid wood construction, reducing overall freight cost. Panel sizes and overall dimensions can be customised including extra-wide, extra-long and split-type formats. Treatment requirements depend on the material composition, destination and applicable import regulations.',
    highlights: [
      {
        title: 'Lower Self-Weight',
        description:
          'Engineered plywood panels deliver structural enclosure at reduced weight versus solid wood, lowering freight cost per shipment.',
      },
      {
        title: 'Flexible Sizing',
        description:
          'Standard and non-standard dimensions including extra-wide, extra-long and split-type configurations are available.',
      },
      {
        title: 'Smooth Panel Surface',
        description:
          'Flat plywood panels support marking, stencilling and labelling without surface irregularity.',
      },
    ],
    overview:
      'Plywood crates consist of a solid wood or plywood frame with plywood panel faces fixed by metal butterfly clips, nail fasteners or bolt-through connections. The base integrates forklift entry. Split-type construction allows multi-piece assembly and disassembly for ease of handling or reuse.',
    materials: [
      'Plywood panels: multi-layer, grade and thickness per specification',
      'Frame members: solid wood or laminated wood',
      'Metal clips, nails or bolt fasteners as required',
    ],
    dimensions:
      'All dimensions specified per project. Non-standard formats including split-type are supported.',
    applications: [
      'Light-to-medium weight industrial components',
      'Stone, tile and flat-pack goods requiring custom sizing',
      'Electronics and instruments requiring smooth-surface enclosure',
      'Oversized goods requiring split-type construction',
    ],
    handlingNotes: [
      'Confirm intended handling method during design.',
      'Avoid panel impact from sharp edges which can cause delamination.',
      'Check treatment requirements for destination before ordering.',
      'Split-type crates should be assembled following the supplied sequence.',
    ],
    specs: [
      { label: 'Construction', value: 'Plywood panels on wood frame' },
      { label: 'Fastening', value: 'Clips, nails or bolts as specified' },
      { label: 'Load capacity', value: 'Confirmed per project specification' },
      { label: 'Format options', value: 'Standard or split-type' },
      { label: 'Treatment', value: 'Confirmed per destination and material' },
    ],
  },
  {
    slug: 'open-frame-crate',
    name: 'Open-Frame Crate',
    category: 'crates',
    categoryLabel: 'Heavy-Duty Wood Crates',
    image: IMAGES.openFrameCrates,
    gallery: [IMAGES.openFrameCrates, IMAGES.crateWarehouse],
    tagline: 'Structural frame access for oversized, irregular and protruding cargo.',
    summary:
      'Open-frame crates consist of a load-bearing base frame and corner post structure without fixed side or top panels. This allows direct access for loading irregular or oversized cargo that cannot be enclosed in a conventional box, and accommodates protruding components that would be damaged by rigid side panels.',
    highlights: [
      {
        title: 'Direct Loading Access',
        description:
          'No fixed side panels means loading and unloading can be performed from any side without dismantling.',
      },
      {
        title: 'Fits Irregular Shapes',
        description:
          'The open frame structure adapts to irregular outlines, asymmetric loads and protruding machinery parts.',
      },
      {
        title: 'Custom Restraints and Brackets',
        description:
          'Anti-slip pads, lashing rings, cargo brackets and load-securing fixtures are designed into the base per cargo geometry.',
      },
    ],
    overview:
      'The structural base frame is manufactured from solid timber, plywood laminate or a combination, providing the required load-bearing capacity and forklift entry. Corner posts and cross-bracing maintain the structural envelope during transit. Cargo is secured directly to the base frame through bolted fixtures, anti-slip padding or lashing points.',
    materials: [
      'Base frame: solid timber or plywood laminate as specified',
      'Posts and bracing: solid timber',
      'Restraint hardware: lashing rings, bolt fixtures, anti-slip material as required',
    ],
    dimensions:
      'All dimensions and post configurations specified per cargo geometry. Share cargo outline, weight and handling method for a structural design proposal.',
    applications: [
      'Oversized industrial machinery with irregular outline',
      'Equipment with protruding shafts, pipes or frames',
      'Components too large or complex for box crate enclosure',
      'Cargo requiring side or top access during transit or delivery',
    ],
    handlingNotes: [
      'Cargo securing method must be confirmed during design.',
      'Confirm permitted stacking load; open-frame crates are generally not designed for vertical stacking.',
      'Identify all protruding elements at design stage to allow correct bracket positioning.',
      'Treatment requirements confirmed per destination and applicable regulations.',
    ],
    specs: [
      { label: 'Structure', value: 'Base frame + corner posts (no fixed panels)' },
      { label: 'Entry', value: '4-way forklift standard; crane/sling as designed' },
      { label: 'Load capacity', value: 'Confirmed per project specification' },
      { label: 'Restraints', value: 'Custom brackets, lashing rings, anti-slip' },
      { label: 'Treatment', value: 'Confirmed per destination' },
    ],
  },
  {
    slug: 'wooden-cable-reels',
    name: 'Wooden Cable Reels',
    category: 'cable-reels',
    categoryLabel: 'Cable Reels',
    image: IMAGES.cableReelLarge,
    gallery: [IMAGES.cableReelLarge, IMAGES.cableReelMedium, IMAGES.cableReelFlanges],
    tagline: 'Purpose-built wooden reel structures for cable handling, storage and transport.',
    summary:
      'KINGGOOD manufactures wooden cable reels comprising flanged disc sides and a central barrel arbour constructed from solid timber. Reel dimensions, arbour diameter, flange thickness and structural detailing are all specified per the cable type, weight, paying-off method and transportation requirements of each project.',
    highlights: [
      {
        title: 'Project-Specific Design',
        description:
          'Flange diameter, barrel length, arbour diameter and timber grade are selected to match the cable specification, total loaded weight and handling equipment used.',
      },
      {
        title: 'Cross-Ply Flange Construction',
        description:
          'Flanges are built from layered solid timber boards in cross-ply orientation for dimensional stability and resistance to splitting during rolling and paying-off.',
      },
      {
        title: 'Compatible with Paying-Off Equipment',
        description:
          'Arbour dimensions and flange hole patterns are designed to suit standard reel-stand spindle and paying-off equipment specifications where provided.',
      },
    ],
    overview:
      'Wooden cable reels consist of two flanged disc sides and a central barrel section. The flanges are manufactured from layered timber boards in a cross-ply pattern and are machined to the specified outer diameter, with a central arbour hole and paying-off apertures. The barrel is constructed from solid stave sections assembled around the arbour and fixed to both flanges with structural fasteners.',
    materials: [
      'Flanges: solid timber boards in cross-ply layered construction',
      'Barrel staves: solid timber',
      'Fasteners: galvanised bolts, rods and washers as specified',
    ],
    dimensions:
      'All reel dimensions (flange diameter, barrel length, arbour diameter) are project-specific. Contact us with cable type, unit weight and handling equipment specifications.',
    applications: [
      'Power cables and high-voltage cables for electrical infrastructure',
      'Telecommunications and fibre optic cable',
      'Industrial hose and flexible conduit',
      'Armoured cable and umbilical for offshore or subsea applications',
    ],
    handlingNotes: [
      'Maximum loaded weight and rolling conditions must be specified at design stage.',
      'Reels must be stored upright on the flange; do not store flat on the flange face.',
      'Protect flange edges from impact to prevent splitting during transport.',
      'Treatment requirements confirmed per destination and applicable regulations.',
    ],
    specs: [
      { label: 'Construction', value: 'Cross-ply timber flanges + solid barrel' },
      { label: 'Flange diameter', value: 'Confirmed per project' },
      { label: 'Barrel length', value: 'Confirmed per project' },
      { label: 'Loaded weight', value: 'Confirmed per project specification' },
      { label: 'Treatment', value: 'Confirmed per destination' },
    ],
  },
]

export const categories = [
  {
    key: 'pallets' as const,
    name: 'Wooden Pallets',
    description:
      'European standard, ISO standard and custom-sized solid wood and plywood pallets for global warehousing and export logistics.',
    image: IMAGES.palletStack,
    products: products.filter((p) => p.category === 'pallets'),
  },
  {
    key: 'crates' as const,
    name: 'Heavy-Duty Wood Crates',
    description:
      'Solid wood, plywood and open-frame crates for machinery, equipment and oversized industrial cargo.',
    image: IMAGES.crateWarehouse,
    products: products.filter((p) => p.category === 'crates'),
  },
  {
    key: 'cable-reels' as const,
    name: 'Cable Reels',
    description:
      'Project-specified wooden reel structures for cable storage, handling and transportation.',
    image: IMAGES.cableReelLarge,
    products: products.filter((p) => p.category === 'cable-reels'),
  },
]

export const advantages = [
  {
    title: 'Custom Design Support',
    description:
      'Every project starts with your cargo, handling equipment and destination. Our team works with your engineers to propose the right structure before production.',
    icon: 'Ruler',
  },
  {
    title: 'Scalable Manufacturing',
    description:
      '5 automated lines handle volume pallet orders. 7 customised lines are configured for non-standard crates, reels and bespoke dimensions.',
    icon: 'Factory',
  },
  {
    title: 'In-Process Quality Inspection',
    description:
      'Incoming materials, in-process checks and outgoing inspection are carried out as standard. Third-party inspection can be arranged.',
    icon: 'ClipboardCheck',
  },
  {
    title: 'Repairability and Reuse',
    description:
      'Products are designed for field repair and reuse where load, handling and storage conditions allow — reducing total packaging cost over time.',
    icon: 'Wrench',
  },
  {
    title: 'Cost Control Through Supply Chain',
    description:
      'Direct access to local timber processing and a concentrated wood industry supply chain gives stable material pricing and controlled input costs.',
    icon: 'TrendingDown',
  },
]

export const customPackagingSteps = [
  {
    step: '01',
    title: 'Share Your Requirements',
    description:
      'Provide cargo dimensions, weight, quantity, destination, handling method and any special requirements. The more detail you share, the more accurate our proposal.',
  },
  {
    step: '02',
    title: 'Packaging Assessment and Structural Proposal',
    description:
      'Our team reviews your requirements and proposes a packaging structure, material selection and approximate dimensions. We advise on any handling, stacking or export considerations.',
  },
  {
    step: '03',
    title: 'Material and Treatment Confirmation',
    description:
      'Wood species, panel grade, fastener type and any required phytosanitary treatment are confirmed based on destination and applicable regulations.',
  },
  {
    step: '04',
    title: 'Drawing or Sample Approval',
    description:
      'Where required, a production drawing or physical sample is prepared for your review and approval before mass production is authorised.',
  },
  {
    step: '05',
    title: 'Production and Quality Inspection',
    description:
      'Production proceeds on the confirmed specification. In-process checks and outgoing quality inspection are carried out. Third-party inspection can be arranged.',
  },
  {
    step: '06',
    title: 'Packing and Shipment Coordination',
    description:
      'Finished products are packed and prepared for dispatch. Shipment coordination and loading advice is provided. MOQ, lead time and delivery terms are confirmed per order.',
  },
]

export const industries = [
  {
    key: 'machinery',
    title: 'Machinery and Industrial Equipment',
    description:
      'Heavy-duty solid wood and plywood crates configured for the size, weight, lifting method and export route of industrial machinery, production equipment and tools.',
    icon: 'Cog',
  },
  {
    key: 'automotive',
    title: 'Automotive Components',
    description:
      'Dimensionally accurate pallets and custom crates for automotive parts, assemblies, drivetrain components and body panels requiring consistent, damage-free handling.',
    icon: 'Car',
  },
  {
    key: 'electrical',
    title: 'Electrical and Cable Products',
    description:
      'Wooden cable reels, drum components and purpose-built crates for electrical cables, switchgear, transformers and other electrical products.',
    icon: 'Zap',
  },
  {
    key: 'electronics',
    title: 'Electronics and Precision Instruments',
    description:
      'Custom wooden packaging with shock-absorbing inserts and smooth-surface enclosures for sensitive electronics, scientific instruments and precision optics.',
    icon: 'Cpu',
  },
  {
    key: 'logistics',
    title: 'Warehousing and Export Logistics',
    description:
      'Standard and custom wooden pallets for distribution centres, export consolidation, AGV-based warehouses and container loading operations.',
    icon: 'Package',
  },
  {
    key: 'oversized',
    title: 'Oversized and Irregular Cargo',
    description:
      'Open-frame crates and bespoke structural bases for cargo that cannot be enclosed in standard box packaging, including protruding components and asymmetric loads.',
    icon: 'Maximize',
  },
]

export type FaqQuestion = { q: string; a: string }
export type FaqCategory = { category: string; items: FaqQuestion[] }

export const faq: FaqCategory[] = [
  {
    category: 'Products and Specifications',
    items: [
      {
        q: 'What types of wooden packaging do you produce?',
        a: 'We produce wooden pallets (European standard, ISO standard and custom-sized), heavy-duty wood crates (solid wood, plywood and open-frame), and wooden cable reels. All products can be customised to project specifications.',
      },
      {
        q: 'What wood species and materials do you use?',
        a: 'We work with domestically sourced solid timber (typically pine or poplar) and multi-layer hot-pressed plywood panels. Specific wood species, panel grade and adhesive type can be discussed and confirmed per project.',
      },
      {
        q: 'Do you provide IPPC / phytosanitary treatment?',
        a: 'Phytosanitary treatment can be arranged for applicable solid wood products. The required treatment type, documentation and marking depend on the destination country regulations. We confirm this on a per-order basis.',
      },
    ],
  },
  {
    category: 'Customisation and Samples',
    items: [
      {
        q: 'Can you produce custom dimensions, structures or branded packaging?',
        a: 'Yes. Custom dimensions, structural configurations, load requirements, internal dunnage, surface marking and OEM or ODM arrangements are all supported.',
      },
      {
        q: 'Are samples available before mass production?',
        a: 'Samples can be provided. Sample production typically takes 3-10 days depending on design complexity. Samples are normally charged; any credit or refund arrangement is confirmed per project before the sample order is placed.',
      },
      {
        q: 'Can we approve a drawing or prototype before full production?',
        a: 'Yes. For non-standard products, a production drawing or a physical prototype can be prepared and approved before mass production is authorised.',
      },
    ],
  },
  {
    category: 'Pricing and MOQ',
    items: [
      {
        q: 'What is your minimum order quantity?',
        a: 'MOQ varies by product type, dimensions and specifications. There is no single fixed MOQ that applies across all products. Please submit a request with your specific requirements for a tailored response.',
      },
      {
        q: 'How is pricing determined?',
        a: 'Pricing reflects material selection, dimensions, treatment, quantity and agreed delivery terms. Quotations are prepared per project. Send your RFQ with cargo details, quantity, destination and any special requirements for a specific response.',
      },
    ],
  },
  {
    category: 'Production and Delivery',
    items: [
      {
        q: 'What is the production lead time?',
        a: 'Lead times depend on product type, design complexity, quantity and current production scheduling. They are discussed and confirmed during the quotation process.',
      },
      {
        q: 'Can I receive production progress updates?',
        a: 'Production progress feedback is supported. Pre-shipment quality inspection and third-party inspection can be arranged if agreed in advance.',
      },
    ],
  },
  {
    category: 'Quality and Inspection',
    items: [
      {
        q: 'What quality controls are in place?',
        a: 'We carry out incoming material checks, in-process dimensional and structural inspections, and outgoing quality checks before despatch. Third-party inspection can be accommodated if arranged and agreed before production begins.',
      },
      {
        q: 'Are your products certified to international standards?',
        a: 'Treatment and documentation requirements can be arranged per applicable regulations. The scope of documentation depends on the product, destination and import requirements. Please confirm your certification requirements at enquiry stage.',
      },
    ],
  },
  {
    category: 'Reuse and After-Sales',
    items: [
      {
        q: 'Can wooden pallets be reused?',
        a: 'Wooden pallets can be reused under suitable loading, storage and forklift handling conditions. Actual service cycles depend on load weight, handling frequency, environmental exposure and maintenance.',
      },
      {
        q: 'Can wooden crates be reused?',
        a: 'Crate reuse depends on construction type, original load, subsequent handling, environmental conditions and maintenance. Consult our team for guidance on your specific application.',
      },
      {
        q: 'What does a quotation cover?',
        a: 'Quotation scope including packaging cost, applicable shipping charges and taxes is confirmed for each order. Ask your sales contact to clarify which elements are included when reviewing a proposal.',
      },
    ],
  },
]

// ── Backward-compat aliases used in page components ──────────────────────────
// Products with shortName for footer/category lists
export const productsWithShortName = products.map((p) => ({
  ...p,
  shortName: p.name,
  categoryEn: p.categoryLabel,
}))

// Category / process / why / metrics / faq aliases
export const productCategories = categories
export const customSteps = customPackagingSteps
export const whyUs = advantages
export const metrics = stats
export const faqGroups = faq

// Industries with legacy 'slug' and 'name' fields
export const industriesList = industries.map((ind) => ({
  ...ind,
  slug: ind.key,
  name: ind.title,
  description: ind.description,
}))

// ── News / articles ──────────────────────────────────────────────────────────
export type NewsArticle = {
  slug: string
  title: string
  date: string            // ISO date string
  category: string
  excerpt: string
  body: string            // plain paragraphs separated by \n\n
  image: string
  tags: string[]
}

export const news: NewsArticle[] = [
  /*
  {
    slug: 'ispm-15-heat-treatment-explained',
    title: 'ISPM 15 Heat Treatment: What Exporters Need to Know',
    date: '2025-06-10',
    category: 'Compliance',
    excerpt:
      'ISPM 15 sets the international standard for treating wood packaging used in export. Here is what the regulation requires, which countries enforce it, and how KINGGOOD supports compliance on every qualifying shipment.',
    body: `ISPM 15 (International Standards for Phytosanitary Measures No. 15) is a set of international phytosanitary measures developed by the International Plant Protection Convention (IPPC) to protect global agriculture from the spread of invasive insects and plant diseases through wood packaging material.\n\nThe regulation applies to solid wood packaging material — including pallets, crates, cable reels and dunnage — used in international trade. It does not apply to packaging made entirely from processed wood products such as plywood, oriented strand board (OSB) or particleboard, as these are manufactured at temperatures sufficient to eliminate pests during production.\n\nCompliant wood packaging must be treated using an approved method (most commonly heat treatment, which requires the wood to reach a core temperature of 56 °C for a continuous 30-minute period) and must bear the IPPC mark — an internationally recognised symbol that confirms the packaging has been treated and certified by an approved facility.\n\nMost major importing regions enforce ISPM 15, including the European Union, the United States, Canada, Australia and many others. Non-compliant wood packaging may be refused entry, fumigated at the importer's cost, or destroyed at the port of entry.\n\nAt KINGGOOD, heat treatment is standard on all solid wood packaging designated for export to ISPM 15-regulated destinations. Our treatment facilities operate to the temperatures and durations required by the standard, and we can provide documentation confirming treatment on request. If your destination requires methyl bromide fumigation instead of heat treatment — or if you are unsure which treatment applies to your export route — contact our team to confirm before production begins.`,
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/pallet-stack.jpg',
    tags: ['ISPM 15', 'Compliance', 'Export', 'Heat Treatment'],
  },
  {
    slug: 'choosing-pallet-type-for-export',
    title: 'How to Choose the Right Pallet for Your Export Shipment',
    date: '2025-05-22',
    category: 'Products',
    excerpt:
      'EU standard, ISO standard, custom-sized or plywood deck — the right pallet depends on your cargo weight, container dimensions, forklift type and destination. This guide explains the key decision factors.',
    body: `Choosing the right pallet for an export shipment involves more than matching a weight rating. The pallet must fit the container, support the carton layout, work with the forklifts at origin and destination, and comply with any import regulations at the receiving country.\n\nThe two most common standard sizes in international trade are the EUR/EPAL pallet (1200 × 800 mm) and the ISO pallet (1200 × 1000 mm). EUR pallets are dominant in European inbound logistics, while ISO pallets are more common in the Asia-Pacific region and North America. If your buyer's warehouse operates on standardised rack systems, confirming the pallet size before ordering can prevent expensive handling modifications at destination.\n\nLoad capacity is a function of the pallet's structural design, wood species and moisture content — not just its label rating. A well-manufactured solid timber pallet with properly dried components will maintain its rated capacity through multiple load cycles; a poorly made one may fail on the first use. Ask your supplier for the static and dynamic load ratings under their standard construction, and confirm whether these are consistent with your cargo weight and stacking method.\n\nFor non-standard container inner dimensions or unusual carton layouts, a custom-sized pallet is often more cost-effective than trying to adapt a standard format. The small additional cost of designing to your exact footprint is usually recovered in container utilisation, reduced load movement and fewer cargo claims.\n\nAt KINGGOOD, we manufacture EU standard, ISO standard, North American and custom-dimensioned pallets. If you share your cargo weight, carton dimensions, container type and destination, we can recommend the most suitable format and confirm whether ISPM 15 treatment is required for your export route.`,
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/pallet-single.jpg',
    tags: ['Pallets', 'Export', 'Standards', 'Container'],
  },
  {
    slug: 'wooden-crates-for-machinery-export',
    title: 'Wooden Crates for Machinery Export: Design Considerations',
    date: '2025-04-15',
    category: 'Products',
    excerpt:
      'Heavy industrial machinery presents unique packaging challenges — high weight, irregular geometry and sensitivity to vibration. This article covers the structural decisions that matter most when specifying a crate for machinery export.',
    body: `Exporting industrial machinery requires packaging that can distribute concentrated loads, resist the dynamic forces of sea freight and road transport, and allow the machinery to be safely extracted at destination without damaging the crate structure or the equipment itself.\n\nThe base frame is the most critical structural element of a machinery crate. It must support the full static weight of the machine, accommodate the forklift tine spread used at origin and destination, and resist racking forces during container loading and unloading. Solid hardwood or LVL (laminated veneer lumber) base bearers are used for high-load applications; softwood is acceptable for lighter cargo.\n\nWall and top panel requirements depend on whether the machinery needs full enclosure for protection from moisture, dust and handling impacts, or whether an open-frame structure is preferable for oversized or irregularly shaped cargo that cannot be enclosed. Open-frame crates provide the structural protection of corner posts and cross-bracing without the restriction of fixed panels, which is useful when components protrude beyond the main body of the machine.\n\nCargo fixing is often overlooked in the early specification phase. The method of securing the machinery to the crate base — whether through bolted fixtures, welded brackets, anti-vibration mounts or timber blocking — determines whether the machine moves during transit. Movement under dynamic loads is one of the most common causes of machinery damage in export shipments.\n\nAt KINGGOOD, our engineering team reviews cargo dimensions, weight, centre of gravity and handling method before proposing a crate design. We can supply production drawings for customer approval before manufacturing begins, and we support third-party inspection at the factory if required by the buyer or their insurance provider.`,
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/open-frame-crates.jpg',
    tags: ['Crates', 'Machinery', 'Export', 'Design'],
  },
  {
    slug: 'cable-reel-sizing-guide',
    title: 'Wooden Cable Reel Sizing: A Practical Guide',
    date: '2025-03-08',
    category: 'Products',
    excerpt:
      'Sizing a wooden cable reel correctly ensures the cable is wound without damage, the reel survives transit and the paying-off process at destination is efficient. This guide covers the key dimensions and how to specify them.',
    body: `A wooden cable reel has three primary structural dimensions: flange diameter, barrel diameter and traverse (the width between the inner faces of the two flanges). These three dimensions determine how much cable the reel can hold, at what bend radius it is wound, and whether it is compatible with the paying-off equipment at the destination.\n\nFlange diameter should be selected to allow sufficient cable capacity while keeping the reel within the practical handling limits of the site. Larger flanges allow more cable per reel but increase the reel's weight and may require crane handling rather than manual movement.\n\nBarrel diameter is constrained by the minimum bend radius of the cable. Winding a cable at a bend radius tighter than its specification causes internal conductor damage that may not be visible externally but reduces the cable's electrical and mechanical performance. The cable manufacturer's minimum bend radius specification should be confirmed and used to establish the minimum acceptable barrel diameter before sizing the reel.\n\nTraverse is determined by the cable cross-section and the number of layers to be wound. Calculating traverse accurately prevents under-filling (which leaves unused reel capacity) and over-filling (which causes the outer layers to protrude beyond the flanges and risk damage during transit or handling).\n\nAt KINGGOOD, we manufacture wooden cable reels to customer-supplied specifications. If you provide the cable outer diameter, minimum bend radius, total length, and destination paying-off equipment constraints, we can size the reel and confirm the construction before manufacturing. We also produce drum flanges and barrel components for customers who maintain their own reel assembly operations.`,
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/cable-reel-large.jpg',
    tags: ['Cable Reels', 'Sizing', 'Products', 'Electrical'],
  },
  {
    slug: 'custom-packaging-process-overview',
    title: 'How Our Custom Packaging Process Works',
    date: '2025-02-18',
    category: 'Process',
    excerpt:
      'From the first enquiry to finished goods on site, the KINGGOOD custom packaging process is designed to keep both sides aligned at each stage — requirements, design, materials, approval and production.',
    body: `Custom packaging projects differ from standard product orders in one important respect: the specification does not exist until we create it together. That means the process needs to be structured enough to prevent misunderstandings at production time, while being flexible enough to accommodate the range of requirements that different cargo types and customers bring.\n\nThe process begins with requirement capture. The more information a customer can share at this stage — cargo dimensions, weight, stacking height, handling method, container type, destination and any regulatory requirements — the more accurate the initial proposal will be. Customers who share a technical drawing or photograph of the cargo allow us to begin the structural design immediately; those with less documentation can work through a structured enquiry with our team.\n\nOnce requirements are agreed, we propose a packaging structure, confirm the material selection, and establish the approximate dimensions. This proposal is shared with the customer before any production commitment is made. For complex or high-value cargo, a production drawing is prepared at this stage for formal approval.\n\nMaterial and treatment confirmation follows. Wood species, panel grade, fastener type and phytosanitary treatment requirements are confirmed based on the cargo, structural requirements and destination regulations. Where applicable, ISPM 15 heat treatment is scheduled and documented.\n\nFor new customers or new product types, a physical pre-production sample or prototype can be manufactured for approval before mass production begins. This step adds lead time but reduces the risk of specification errors at full production volume.\n\nProduction then proceeds to the confirmed specification, with in-process quality checks and an outgoing inspection before goods are prepared for despatch. We provide shipment coordination support and can introduce freight forwarding partners for customers who need end-to-end logistics assistance.`,
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/v0-design/kinggood-packaging/plywood-crates.jpg',
    tags: ['Process', 'Custom', 'Quality', 'Production'],
  },
  */
]

export function getRelatedProducts(currentSlug: string, count = 3): Product[] {
  const current = products.find((p) => p.slug === currentSlug)
  if (!current) return products.slice(0, count)
  return products
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .concat(products.filter((p) => p.slug !== currentSlug && p.category !== current.category))
    .slice(0, count)
}

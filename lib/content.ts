/**
 * Content data — services, process, testimonials, projects, FAQs.
 * Items marked PLACEHOLDER should be replaced with your genuine content before launch.
 */
import { photos } from './photos';

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string; // key into components/Icon.tsx
  features: string[];
};

/** Core "upholstery repair & services" offering — the heart of the site. */
export const services: Service[] = [
  {
    slug: 'reupholstery',
    title: 'Reupholstery',
    short: 'A complete new life for tired sofas, chairs & lounge suites.',
    description:
      'We strip your furniture back to the frame, repair or rebuild the foundation, and re-cover it in the fabric or leather of your choice. Your favourite lounge suite returns looking better than new — and built to last another generation.',
    icon: 'sofa',
    features: [
      'Sofas, couches & full lounge suites',
      'Armchairs, wingbacks & occasional chairs',
      'Dining & carver chairs',
      'Ottomans, benches & footstools',
    ],
  },
  {
    slug: 'upholstery-repair',
    title: 'Upholstery Repair',
    short: 'Rips, tears, sagging seats, broken frames & worn foam — restored.',
    description:
      'Not everything needs a full re-cover. Our repair service tackles rips and tears, sagging or collapsed seats, broken springs and frames, and flattened foam — extending the life of pieces you love at a fraction of replacement cost.',
    icon: 'wrench',
    features: [
      'Seam, rip & tear repairs',
      'Sagging seat & cushion rebuilds',
      'Spring re-tying & frame repair',
      'Foam & fibre replacement',
    ],
  },
  {
    slug: 'headboards-beds',
    title: 'Headboards & Beds',
    short: 'Custom upholstered headboards and bed bases, made to measure.',
    description:
      'Bespoke upholstered headboards and bed bases in any size, shape or fabric — from clean contemporary panels to deep diamond-buttoned statement pieces that anchor the room.',
    icon: 'bed',
    features: [
      'Made-to-measure headboards',
      'Diamond & deep buttoning',
      'Upholstered bed bases & ottomans',
      'Matching scatter cushions',
    ],
  },
  {
    slug: 'loose-covers',
    title: 'Loose Covers & Slipcovers',
    short: 'Tailored, removable covers for a fresh look and easy cleaning.',
    description:
      'Precision-fitted removable covers that let you refresh a room, protect against wear, and launder with ease — a practical, cost-effective alternative to a full re-cover.',
    icon: 'layers',
    features: [
      'Tailored, snug-fit covers',
      'Washable & swappable',
      'Sofas, chairs & dining seats',
      'Seasonal fabric options',
    ],
  },
  {
    slug: 'antique-restoration',
    title: 'Antique & Heritage Restoration',
    short: 'Traditional techniques that honour a piece’s original character.',
    description:
      'Cape Dutch heirlooms, Victorian chairs and mid-century classics deserve traditional hands. We restore antiques using period-correct methods — hand-tied springs, hessian, coir and traditional stitching — preserving provenance while renewing comfort.',
    icon: 'crown',
    features: [
      'Hand-tied coil-spring foundations',
      'Traditional stuffing & stitched edges',
      'Frame & timber restoration',
      'Insurance assessments & quotes',
    ],
  },
  {
    slug: 'outdoor-patio',
    title: 'Outdoor & Patio',
    short: 'Weatherproof cushions and covers built for the Cape climate.',
    description:
      'Sun, salt air and southeasters are hard on outdoor furniture. We rebuild patio and poolside pieces with UV-stable, water-resistant fabrics and quick-dry reticulated foam that shrug off the elements.',
    icon: 'sun',
    features: [
      'UV & water-resistant fabrics',
      'Quick-dry reticulated foam',
      'Patio, poolside & boat seating',
      'Custom outdoor scatter cushions',
    ],
  },
  {
    slug: 'bespoke-furniture',
    title: 'Bespoke Furniture',
    short: 'Custom pieces designed and built to your exact specification.',
    description:
      'When nothing off-the-shelf will do, we design and build from scratch — sizing, frame, fill and finish tailored to your space, your posture and your architect’s vision.',
    icon: 'ruler',
    features: [
      'Made-to-measure sizing',
      'Kiln-dried hardwood frames',
      'Designer & trade collaboration',
      'Curated fabric & leather library',
    ],
  },
  {
    slug: 'commercial-contract',
    title: 'Commercial & Contract',
    short: 'High-traffic seating for hotels, restaurants, offices & venues.',
    description:
      'Contract-grade upholstery engineered for the 24/7 demands of hospitality and workplace — from lobby statement pieces and restaurant banquettes to boardroom and office chairs, built to survive spills, friction and heavy use.',
    icon: 'building',
    features: [
      'Hotels, lodges & guesthouses',
      'Restaurants, bars & banquettes',
      'Office & boardroom seating',
      'Contract-grade, fire-retardant fabrics',
    ],
  },
];

/** The transparent, white-glove process — a strong trust element. */
export const processSteps = [
  {
    title: 'Free Quote & Consultation',
    body: 'Send us photos or book a free home visit anywhere in Cape Town. We assess the piece, discuss options and give you a clear, no-obligation quote.',
  },
  {
    title: 'Fabric & Design Selection',
    body: 'Explore our curated library of premium fabrics and leathers — or supply your own. We guide you on durability, colour and care for your specific use.',
  },
  {
    title: 'Collection & Craftsmanship',
    body: 'We collect and deliver across the Cape. In the atelier, master upholsterers strip, rebuild and re-cover your piece with meticulous, hand-finished detail.',
  },
  {
    title: 'White-Glove Delivery',
    body: 'Your finished piece is inspected against our quality checklist and delivered back to its place in your home or venue — protected and pristine.',
  },
];

/** Reasons to choose GD — trust pillars. */
export const trustPillars = [
  {
    icon: 'shield',
    title: 'Lifetime Frame Guarantee',
    body: 'Kiln-dried hardwood frames backed by our lifetime structural warranty against warping and splitting.',
  },
  {
    icon: 'wrench',
    title: 'Free Quotes & Home Visits',
    body: 'No-obligation quotes and in-home assessments across Cape Town, with collection and delivery included.',
  },
  {
    icon: 'crown',
    title: 'Master Artisans',
    body: 'Two decades of specialised expertise — 8-way hand-tied springs, precision pattern-matching and hand finishing.',
  },
  {
    icon: 'leaf',
    title: 'Responsibly Sourced',
    body: 'Sustainably harvested Cape timber and locally tanned leathers, honouring ethical, low-waste craftsmanship.',
  },
];

/**
 * PLACEHOLDER testimonials — replace every one with a genuine, verifiable client review.
 * Publishing invented reviews as real is deceptive and against advertising standards.
 */
export const testimonials = [
  {
    quote:
      'Golden Diamond reupholstered our two heirloom wingbacks and they came back better than the day they were bought. Structural integrity and finish were flawless.',
    name: 'Client Name', // PLACEHOLDER
    role: 'Homeowner, Constantia', // PLACEHOLDER
    placeholder: true,
  },
  {
    quote:
      'They refitted the banquettes and lounge seating for our boutique hotel on time and to an exceptional standard. The fabrics have held up beautifully to heavy use.',
    name: 'Client Name', // PLACEHOLDER
    role: 'Operations Manager, Boutique Hotel', // PLACEHOLDER
    placeholder: true,
  },
  {
    quote:
      'From the free home visit to the white-glove delivery, the whole process was seamless. Our tired old couch feels brand new — highly recommended.',
    name: 'Client Name', // PLACEHOLDER
    role: 'Homeowner, Sea Point', // PLACEHOLDER
    placeholder: true,
  },
];

/**
 * PLACEHOLDER portfolio projects — replace with your real projects and photos.
 * Each `swatch` drives an on-brand fabric-texture tile until a real image is added
 * at /public/images/portfolio/<slug>.jpg.
 */
export const projects = [
  {
    slug: 'constantia-estate',
    title: 'Constantia Estate Restoration',
    category: 'Residential',
    swatch: 'emerald',
    image: photos.velvetSeating,
    summary:
      'A multi-piece restoration of mid-century heirlooms for a historic wine-estate home — Italian mohair velvet over traditional hand-tied coil-spring construction.',
    materials: ['Italian mohair velvet', 'Hand-tied coil springs', 'Kiln-dried oak frame'],
  },
  {
    slug: 'camps-bay-villa',
    title: 'Camps Bay Villa',
    category: 'Residential',
    swatch: 'navy',
    image: photos.loungeSuite,
    summary:
      'Custom lounging areas engineered for coastal living — UV-resistant fabrics and high-density contract-grade foam that keep their structure year-round.',
    materials: ['UV-resistant weave', 'High-density foam', 'Marine-grade thread'],
  },
  {
    slug: 'boutique-hotel-refit',
    title: 'Boutique Hotel Refit',
    category: 'Commercial',
    swatch: 'gold',
    image: photos.boutiqueInterior,
    summary:
      'A full seating refit for a City Bowl boutique hotel — lobby statement pieces and 40+ guest-suite chairs in easy-clean, stain-resistant contract fabrics.',
    materials: ['Crypton contract fabric', '100k+ double-rub weave', 'Reinforced suspension'],
  },
  {
    slug: 'winelands-tasting-room',
    title: 'Winelands Tasting Room',
    category: 'Commercial',
    swatch: 'sand',
    image: photos.diningSeating,
    summary:
      'Bespoke dining chairs in historically accurate silk for a Stellenbosch wine estate — custom-milled edge bindings on every single chair.',
    materials: ['Bespoke silk', 'Custom edge binding', 'Solid hardwood frame'],
  },
  {
    slug: 'cape-dutch-heirloom',
    title: 'Cape Dutch Heirloom',
    category: 'Heritage',
    swatch: 'rust',
    image: photos.armchairDetail,
    summary:
      'Sympathetic restoration of an antique yellowwood-framed chair — traditional foundation rebuilt beneath a hard-wearing textured rust wool, heritage intact.',
    materials: ['Textured wool', 'Traditional coir & hessian', 'Yellowwood frame repair'],
  },
  {
    slug: 'waterfront-penthouse',
    title: 'Waterfront Penthouse',
    category: 'Residential',
    swatch: 'bone',
    image: photos.modernSofa,
    summary:
      'A low-profile modular sofa in high-density Italian bouclé — razor-sharp architectural lines with plush, sag-free comfort that holds over time.',
    materials: ['Italian bouclé', 'Multi-density foam core', 'Concealed steel frame'],
  },
];

/** FAQ — doubles as FAQPage schema for rich results. */
export const faqs = [
  {
    q: 'Do you offer free quotes and home visits in Cape Town?',
    a: 'Yes. We provide free, no-obligation quotes across Cape Town and the Western Cape. Send us photos and dimensions for a quick estimate, or book an in-home assessment and we’ll come to you.',
  },
  {
    q: 'How much does it cost to reupholster a couch?',
    a: 'Cost depends on the size and construction of the piece and your fabric choice. After a quick assessment we give you a clear written quote with no surprises. Repairs are often far more affordable than a full re-cover.',
  },
  {
    q: 'Can I use my own fabric?',
    a: 'Absolutely. You’re welcome to supply your own fabric, or choose from our curated library of premium upholstery fabrics and leathers. We’ll advise on durability and suitability for how the piece will be used.',
  },
  {
    q: 'How long does reupholstery take?',
    a: 'Most residential pieces are completed within 1–3 weeks depending on complexity, fabric availability and current workload. We confirm a realistic timeline with your quote.',
  },
  {
    q: 'Do you collect and deliver?',
    a: 'Yes — we offer collection and white-glove delivery throughout the Cape Town metro, so you never have to transport heavy furniture yourself.',
  },
  {
    q: 'Do you handle antique and insurance restorations?',
    a: 'We do. Our artisans use traditional techniques to restore antiques and heirlooms, and we provide detailed assessments and quotes suitable for insurance claims.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'We serve homes and businesses across Cape Town — including the Southern Suburbs, Atlantic Seaboard, City Bowl, Northern Suburbs and the Winelands. If you’re nearby, just ask.',
  },
];

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
      'Custom-made upholstered headboards and bed bases in any size, shape or fabric — from clean contemporary panels to deep diamond-buttoned statement pieces that anchor the room.',
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
    slug: 'custom-furniture',
    title: 'Custom Furniture',
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
    body: 'We collect and deliver across the Cape. In our Cape Town workshop, our upholsterers strip, rebuild and re-cover your piece by hand.',
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

export type Testimonial = {
  /** The review exactly as the customer wrote it. Do not edit it for tone. */
  quote: string;
  /** Reviewer name as it appears publicly on the review. */
  name: string;
  /** Optional context, e.g. 'Homeowner, Constantia'. */
  role?: string;
  /** Stars the reviewer actually gave, 1-5. Omit if you do not know. */
  rating?: number;
  /** Where the review was left — shown to the reader as attribution. */
  source?: 'Google' | 'Facebook';
  /** Link to the review listing, so a reader can verify it. */
  sourceUrl?: string;
  /** While true the entry is illustrative only and will NOT be published. */
  placeholder?: boolean;
};

/**
 * PLACEHOLDER testimonials — replace every one with a genuine, verifiable client review.
 * Publishing invented reviews as real is deceptive and against advertising standards.
 *
 * To publish a real Google review, copy it across verbatim and drop the
 * `placeholder` flag — the carousel appears automatically once one entry is real:
 *
 *   {
 *     quote: 'They collected our couch on the Monday and it was back by Friday…',
 *     name: 'Thandiwe M.',
 *     role: 'Khayelitsha',
 *     rating: 5,
 *     source: 'Google',
 *     sourceUrl: 'https://share.google/1kwOHPmOLefAIkLhC',
 *   },
 */
export const testimonials: Testimonial[] = [
  {
    // The owner's public reply to this review confirms it was 5 stars.
    quote: 'Elegant and slick designs. These guys don’t disappoint',
    name: 'Lincoln Matwaya',
    rating: 5,
    source: 'Google',
    sourceUrl: 'https://share.google/1kwOHPmOLefAIkLhC',
  },
  {
    quote: 'You wanna see good furniture, why not visit them with their best designs they’ll live you speechless',
    name: 'Bongani Soko',
    role: 'Google Local Guide',
    source: 'Google',
    sourceUrl: 'https://share.google/1kwOHPmOLefAIkLhC',
  },
  {
    quote: 'Good work guys you are so talented 👏... Order yours they won’t disappoint you..',
    name: 'Charmaine Mutero',
    source: 'Google',
    sourceUrl: 'https://share.google/1kwOHPmOLefAIkLhC',
  },
  {
    quote: 'Yoo these guys are so talented .if u are looking for quality jus go for golden diamond upholstery',
    name: 'Peter Kelvin',
    source: 'Google',
    sourceUrl: 'https://share.google/1kwOHPmOLefAIkLhC',
  },
  {
    quote: 'Very good quality, I was impressed.',
    name: 'Gladmore Mutyanda',
    source: 'Google',
    sourceUrl: 'https://share.google/1kwOHPmOLefAIkLhC',
  },
];

/**
 * Only testimonials without `placeholder: true` are published. Invented reviews
 * must never reach the live site: the Consumer Protection Act and the ASA Code
 * both treat fabricated endorsements as misleading advertising, and Google's
 * spam policies treat them as a quality signal against the whole domain.
 * Delete the `placeholder` flag from an entry once it is a genuine, verifiable
 * review — the testimonial sections reappear automatically.
 */
export const publishedTestimonials = testimonials.filter((t) => !t.placeholder);
export const hasTestimonials = publishedTestimonials.length > 0;

/**
 * Real pieces made by Golden Diamond Upholstery, grouped by what they are.
 *
 * Descriptions state only what is visible in the photograph — the form, the
 * fabric type and the finish. No client names, locations or material claims are
 * asserted, because none of those can be verified from the images. Add them
 * yourself where you know them; do not invent them.
 */
export const projects = [
  // ---- Sofas & seating ----
  {
    slug: 'cream-scalloped-curved-sofa',
    title: 'Cream scalloped curved sofa',
    category: 'Sofas & Seating',
    swatch: 'bone',
    image: photos.heroSofa,
    summary: 'A curved two-seater with a scalloped shell back, built on a shaped frame and finished in a soft cream weave over slim metal legs.',
    materials: ['Scalloped shell back', 'Shaped curved frame', 'Metal legs'],
  },
  {
    slug: 'gold-velvet-curved-sofa',
    title: 'Gold velvet curved sofa',
    category: 'Sofas & Seating',
    swatch: 'gold',
    image: photos.velvetSeating,
    summary: 'A deep round-backed sofa in gold crushed velvet, with a continuous curved seat and rolled arm that wraps the full width of the piece.',
    materials: ['Crushed velvet', 'Continuous curved seat', 'Tapered legs'],
  },
  {
    slug: 'olive-green-crescent-sofa',
    title: 'Olive green crescent sofa',
    category: 'Sofas & Seating',
    swatch: 'emerald',
    image: photos.loungeSuite,
    summary: 'A crescent-shaped sofa in olive velvet, shaped as a single sweeping curve with a bolstered back roll and no visible seams across the front.',
    materials: ['Olive velvet', 'Crescent frame', 'Bolstered back roll'],
  },
  {
    slug: 'charcoal-curved-sofa',
    title: 'Charcoal curved sofa',
    category: 'Sofas & Seating',
    swatch: 'navy',
    image: photos.modernSofa,
    summary: 'A low curved sofa in charcoal, photographed in the apartment it was delivered to — a soft profile with a deep seat and a rounded back.',
    materials: ['Charcoal weave', 'Low curved profile', 'Deep seat'],
  },
  {
    slug: 'navy-buttoned-velvet-sofa',
    title: 'Navy buttoned velvet sofa',
    category: 'Sofas & Seating',
    swatch: 'navy',
    image: photos.diningSeating,
    summary: 'A navy velvet sofa with deep buttoning through the back and a contrast trim along the arm, built on a welded metal base.',
    materials: ['Navy velvet', 'Deep buttoning', 'Welded metal base'],
  },
  {
    slug: 'grey-channel-tufted-bench',
    title: 'Grey channel-tufted bench',
    category: 'Sofas & Seating',
    swatch: 'rust',
    image: photos.interiorLounge,
    summary: 'A long bench seat in grey crushed velvet, channel-tufted across the back and seat, raised on slim brass-finish legs.',
    materials: ['Crushed velvet', 'Channel tufting', 'Brass-finish legs'],
  },
  {
    slug: 'velvet-sofa-collection',
    title: 'Velvet sofa collection',
    category: 'Sofas & Seating',
    swatch: 'emerald',
    image: photos.boutiqueInterior,
    summary: 'Several channel-tufted velvet pieces photographed together — teal, navy and gold — showing the same construction carried across a range of colours.',
    materials: ['Channel tufting', 'Velvet range', 'Matched construction'],
  },
  {
    slug: 'cream-sofa-and-bed-base',
    title: 'Cream sofa and matching bed base',
    category: 'Sofas & Seating',
    swatch: 'bone',
    image: photos.livingRoom,
    summary: 'A curved cream sofa made alongside a matching upholstered bed base, both finished in the same fabric so the room reads as one commission.',
    materials: ['Matched fabric', 'Curved sofa', 'Upholstered bed base'],
  },

  // ---- Headboards & beds ----
  {
    slug: 'basketweave-headboard',
    title: 'Basket-weave headboard',
    category: 'Headboards & Beds',
    swatch: 'rust',
    image: photos.basketweaveHeadboard,
    summary: 'A wall-width headboard in grey crushed velvet, hand-woven into a basket pattern with plug points set into the base panels.',
    materials: ['Basket-weave panels', 'Crushed velvet', 'Built-in plug points'],
  },
  {
    slug: 'cream-channel-tufted-bed',
    title: 'Cream channel-tufted bed',
    category: 'Headboards & Beds',
    swatch: 'bone',
    image: photos.tuftedBed,
    summary: 'A full bed suite in cream — tall channel-tufted headboard with a matching padded base surround, made to the room’s width.',
    materials: ['Channel tufting', 'Matching base surround', 'Made to measure'],
  },
  {
    slug: 'diamond-buttoned-headboard',
    title: 'Diamond-buttoned headboard',
    category: 'Headboards & Beds',
    swatch: 'navy',
    image: photos.diamondHeadboard,
    summary: 'A two-tone headboard in black and cream, diamond-buttoned into a chevron across the centre with piped edges framing the panel.',
    materials: ['Diamond buttoning', 'Two-tone panels', 'Piped edges'],
  },
  {
    slug: 'grey-buttoned-headboard',
    title: 'Tall grey buttoned headboard',
    category: 'Headboards & Beds',
    swatch: 'rust',
    image: photos.buttonedHeadboardRoom,
    summary: 'A tall buttoned headboard in grey, extending well above the bed and wrapping into side wings that frame the bed head.',
    materials: ['Deep buttoning', 'Extended height', 'Wrapped side wings'],
  },
  {
    slug: 'cream-upholstered-bed-suite',
    title: 'Cream upholstered bed suite',
    category: 'Headboards & Beds',
    swatch: 'bone',
    image: photos.upholsteredBedSuite,
    summary: 'A cream bed suite with a channel-tufted headboard and a scalloped base, photographed in place after delivery.',
    materials: ['Channel-tufted headboard', 'Scalloped base', 'Cream weave'],
  },
  {
    slug: 'headboard-installation',
    title: 'Headboard fitting on site',
    category: 'Headboards & Beds',
    swatch: 'navy',
    image: photos.workshopDetail,
    summary: 'Fitting a diamond-buttoned headboard in the customer’s bedroom — headboards are hung and levelled on site rather than left leaning.',
    materials: ['On-site fitting', 'Levelled and hung', 'Diamond buttoning'],
  },

  // ---- Chairs ----
  {
    slug: 'gold-velvet-tub-armchair',
    title: 'Gold velvet tub armchair',
    category: 'Chairs',
    swatch: 'gold',
    image: photos.armchairDetail,
    summary: 'A round tub armchair in gold crushed velvet, with a single wrapped back and seat cushion, raised on a thin black frame.',
    materials: ['Crushed velvet', 'Wrapped tub back', 'Slim metal frame'],
  },
  {
    slug: 'cream-scalloped-tub-chair',
    title: 'Cream scalloped tub chair',
    category: 'Chairs',
    swatch: 'bone',
    image: photos.fabricChair,
    summary: 'A wide scalloped tub chair in cream, with a shell-shaped back, a loose scatter cushion and a deep rounded seat.',
    materials: ['Scalloped shell back', 'Loose scatter cushion', 'Deep rounded seat'],
  },
];

/** FAQ — doubles as FAQPage schema for rich results. */
export const faqs = [
  {
    q: 'Do you offer free quotes and home visits in Cape Town?',
    a: 'Yes. We provide free, no-obligation quotes across Cape Town and the Western Cape. Send us photos and dimensions for a quick estimate, or book an in-home assessment and we’ll come to you.',
  },
  {
    q: 'How much does it cost to reupholster a couch in Cape Town?',
    a: 'Cost depends on the size and construction of the piece and the fabric you choose. After a quick assessment we give you a clear written quote with no surprises. A repair is often far cheaper than a full re-cover, and we will tell you honestly which one your piece needs.',
  },
  {
    q: 'Is it cheaper to reupholster a couch or buy a new one?',
    a: 'If the frame is solid, reupholstering is usually cheaper than replacing a comparable couch — and you keep the size, shape and comfort you already know. Older furniture is often built better than new budget furniture, so it is worth restoring. If the frame is beyond saving we will tell you rather than sell you work you do not need.',
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
    a: 'We serve homes and businesses across Cape Town — Khayelitsha, Mitchells Plain, Delft, Blue Downs and the surrounding areas, plus the Southern Suburbs, Atlantic Seaboard, City Bowl, Northern Suburbs, the Helderberg and the Winelands. If you are nearby, just ask.',
  },
  {
    q: 'Where is your workshop?',
    a: 'Our workshop is at the Khayelitsha Training Centre, Shop 2, Block C, 50 Lwandle Road, Village 2 North, Cape Town, 7784. Visits are by appointment so someone is free to talk you through fabrics and options.',
  },
  {
    q: 'Can you fix a sagging couch seat?',
    a: 'Yes. Sagging seats are one of the most common repairs we do. Depending on the cause we re-tie or replace the springs, rebuild the seat platform, and replace flattened foam or fibre — usually without needing to re-cover the whole piece.',
  },
];

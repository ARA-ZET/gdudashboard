import type { BusinessSettings } from './db';

/**
 * Real business + banking details. Used as the DEFAULT on quotes/invoices and to
 * prefill the admin Settings page. Anything saved in Settings (Firestore
 * meta/business) overrides these.
 */
export const defaultBusiness: BusinessSettings = {
  name: 'Golden Diamond Upholstery',
  addressLines: 'Khayelitsha Training Centre, Shop 2, Block C\n50 Lwandle Rd, Village 2 North, Cape Town, 7784',
  phone: '+27 81 572 3431',
  email: '', // no business email supplied yet
  website: 'goldendiamond.co.za',
  regNo: '',
  vatNo: '',
  bankName: 'First National Bank (FNB)',
  accountName: 'Golden Diamond Upholstery',
  accountNumber: '63055298351',
  branchCode: '250655', // FNB universal branch code — change if yours differs
  accountType: '',
  paymentTerms: '50% deposit to confirm. Balance due on completion.',
};

/**
 * Common line-item descriptions for quotes & invoices — used for the
 * "Add common service" dropdown and the description autocomplete.
 * Edit this list to match the services you offer most.
 */
export const commonLineItems: string[] = [
  'Reupholstery — 2-seater sofa (incl. fabric)',
  'Reupholstery — 3-seater sofa (incl. fabric)',
  'Reupholstery — lounge suite',
  'Reupholstery — armchair / wingback',
  'Reupholstery — dining chair (per chair)',
  'Reupholstery — ottoman / bench',
  'Upholstery repair — rips & tears',
  'Upholstery repair — seam restitch',
  'Sagging seat rebuild',
  'Spring re-tying / replacement',
  'Foam replacement',
  'Fibre / feather cushion refill',
  'Headboard — made to measure',
  'Loose covers / slipcovers',
  'Scatter cushions',
  'Antique / heritage restoration',
  'Diamond buttoning',
  'Outdoor / patio cushions',
  'Car / auto seat trimming',
  'Office / boardroom chair',
  'Fabric supply (per metre)',
  'Collection & delivery',
  'Callout / assessment fee',
];

/** Scenario units: 365-day years, US liquid gallons, IT electrical capacity. */
export const DAYS = 365;
export const HOURS = DAYS * 24;
// NIST HB44–2026: 231 cubic inches/gallon, 2.54 cm/inch, both exact.
export const LITERS_PER_GALLON = 3.785411784;
export const REPORTED_GALLONS = 13_299_000;
export const LINCOLN_GPD = 37_600_000;
export const NYC_REFERENCE_GPD = 1_000_000_000;
export const HOUSEHOLD_YEAR_GALLONS = 82 * 4 * DAYS;
export const ACCOUNT_YEAR_KWH = 863 * 12;

export const number = (n: number, digits = 1) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(n);

export function volume(people: number, dailyPerPerson: number) {
  const householdYear = people * dailyPerPerson * DAYS;
  return {
    householdYear,
    householdYears: REPORTED_GALLONS / householdYear,
    lincolnHours: REPORTED_GALLONS / LINCOLN_GPD * 24,
    nycMinutes: REPORTED_GALLONS / NYC_REFERENCE_GPD * 1440,
  };
}

export function campus(mw: number, averageLoadPercent: number, withdrawalWue: number) {
  const itKwh = mw * 1000 * HOURS * averageLoadPercent / 100;
  const gallons = itKwh * withdrawalWue / LITERS_PER_GALLON;
  return {
    itKwh,
    twh: itKwh / 1e9,
    gallons,
    millionGallons: gallons / 1e6,
    householdYears: gallons / HOUSEHOLD_YEAR_GALLONS,
    accountYears: itKwh / ACCOUNT_YEAR_KWH,
  };
}

/** Toy utility-delivery model: all water is supplied by this utility. */
export function season(annualMillionGallons: number, summerFactor: number, headroom: number) {
  const average = annualMillionGallons / DAYS;
  const summer = average * summerFactor;
  const otherMonths = average * (12 - 3 * summerFactor) / 9;
  // Twelve equal-duration blocks; months 6–8 are the three peak blocks.
  const monthly = Array.from({ length: 12 }, (_, i) => i >= 5 && i <= 7 ? summer : otherMonths);
  return { average, summer, otherMonths, monthly, exceeds: summer > headroom + 1e-10,
    excess: Math.max(0, summer - headroom) };
}

export function carbon(averageLoadPercent: number, pue: number, gramsPerKwh: number) {
  const itKwh = campus(1000, averageLoadPercent, 0).itKwh;
  const facilityKwh = itKwh * pue;
  return {
    facilityKwh,
    facilityTwh: facilityKwh / 1e9,
    millionTonnes: facilityKwh * gramsPerKwh / 1e12,
    accountYears: facilityKwh / ACCOUNT_YEAR_KWH,
  };
}

/** Fixed workload mix; output is required IT energy, not equipment throughput. */
export function growth(taskMultiple: number, energyFraction: number) {
  const requiredMultiple = taskMultiple * energyFraction;
  return { requiredMultiple, requiredTwh: 8.76 * requiredMultiple,
    thresholdFraction: 1 / taskMultiple,
    exceedsBaseline: requiredMultiple > 1 + 1e-10 };
}

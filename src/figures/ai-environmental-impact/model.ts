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

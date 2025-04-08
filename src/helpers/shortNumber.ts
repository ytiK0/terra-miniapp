export function shortNumber(number: number, fractionDigits = 1) {
  const formatter = new Intl.NumberFormat("en", {notation: "compact", maximumFractionDigits: fractionDigits});

  return formatter.format(number).toLowerCase();
}
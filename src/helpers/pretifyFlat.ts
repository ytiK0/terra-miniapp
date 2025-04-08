export function prettifyFloat (num: number) {
  const numLength = Math.trunc(num).toString().length;

  const fractionDigits = numLength >= 4 ? (numLength >= 5 ? 0 : 1) : 2;

  return fractionDigits === 0 ? Math.trunc(num) : parseFloat(num.toFixed(fractionDigits))
}
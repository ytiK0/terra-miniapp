import {UserBackend} from "@/api/getUserWallet.ts";

function parseFloatToFixed(string: string, fractionDigits: number) {
  return parseFloat(parseFloat(string).toFixed(fractionDigits));
}

export function mapUserToWallet(user: UserBackend) {
  const usdt = parseFloatToFixed(user.usdt, 2);
  const terroCoins = parseFloatToFixed(user.coins, 2);
  const earnedUsdt = parseFloatToFixed(user.earnedUsdt, 2);
  const depositedUsdt = parseFloatToFixed(user.depositedUsdt, 2);
  const todayProfit = parseFloat((usdt * (user.previousDayProfit?.percent || 0)).toFixed(2));
  return { usdt, terroCoins, earnedUsdt, depositedUsdt, todayProfit };
}
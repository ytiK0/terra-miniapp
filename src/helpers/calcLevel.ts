export const levels: {level: number, coins: number}[] = [
  { level: 1, coins: 0 },
  { level: 2, coins: 25 },
  { level: 3, coins: 50 },
  { level: 4, coins: 75 },
  { level: 5, coins: 100 },
  { level: 6, coins: 150 },
  { level: 7, coins: 250 },
  { level: 8, coins: 300 },
  { level: 9, coins: 400 },
  { level: 10, coins: 500 },
  { level: 11, coins: 650 },
  { level: 12, coins: 800 },
  { level: 13, coins: 1000 },
  { level: 14, coins: 1250 },
  { level: 15, coins: 1500 },
  { level: 16, coins: 2000 },
  { level: 17, coins: 2500 },
  { level: 18, coins: 3000 },
  { level: 19, coins: 4000 },
  { level: 20, coins: 5000 },
  { level: 21, coins: 10000 },
  { level: 22, coins: 12000 },
  { level: 23, coins: 15000 },
  { level: 24, coins: 17500 },
  { level: 25, coins: 20000 },
  { level: 26, coins: 25000 }
];

export function calcLevel(coins: number) {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (coins >= levels[i].coins) {
      return levels[i].level;
    }
  }

  return 0;
}
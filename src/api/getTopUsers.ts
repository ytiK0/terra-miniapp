import {UserBackend} from "@/api/getUserWallet.ts";

export async function getTopUsers() {
  const response = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/findTop`);
  const resJson: UserBackend[] = await response.json();
  return resJson.map((user) => ({name: user.name, coins: user.coins, id: user.telegramId, photoURL: user.photoURL}));
}

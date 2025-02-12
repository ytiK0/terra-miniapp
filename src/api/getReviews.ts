import {User} from "@/api/getUserWallet.ts";

export interface Review {
  id: number,
  text: string,
  amount: string,
  user: User
}

export async function getReviews(page: number, limit: number,  signal?: AbortSignal) {
  const params = new URLSearchParams({
    limit: limit.toString(), page: page.toString()
  });

  return  fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/feedback/findAll?${params.toString()}`, {signal})
    .then((res) => res.json() as Promise<Review[]>);
}
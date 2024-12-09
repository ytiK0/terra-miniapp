import {Review} from "@/pages/ReviewsPage/ReviewsPage.tsx";

export async function getReviews() {
  const res = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/feedback/findAll`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return await res.json() as Review[]
}
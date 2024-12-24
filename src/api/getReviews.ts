import {Review} from "@/pages/ReviewsPage/ReviewsPage.tsx";

export async function getReviews(signal?: AbortSignal) {
  return  fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/feedback/findAll`, {signal})
    .then((res) => res.json() as Promise<Review[]>);
}
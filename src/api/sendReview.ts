export interface SendReviewPayload {
  amount: string,
  text: string,
  tgId: number
}

export async function sendReview(payload: SendReviewPayload) {
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/feedback/create`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

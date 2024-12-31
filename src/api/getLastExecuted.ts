export interface Deal {
  id: number
  profitPercent: number,
  isExecuted: boolean

}

export async function getLastExecuted(signal?: AbortSignal) {
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/deal/findExecuted`, {signal})
    .then((res) => res.json() as Promise<Deal[]>)
    .then((resJson) => resJson.slice(resJson.length - 60 * 3).reverse());
}
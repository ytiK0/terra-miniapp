export function createWithdraw(tgId: number, amount: string) {
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/cash-out/create`, {
    method: "POST",
    body: JSON.stringify({tgId, amount}),
    headers: {
      "Content-type":"application/json;charset=utf-8"
    }
  }).then((res) => res.json())
    .catch((err) => {
      throw new Error("Cannot create withdraw: " + err.toString())
    })
}
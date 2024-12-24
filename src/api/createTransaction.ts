async function getLastActiveTransaction(id: number) {
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/payment/findByTg?tgId=${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Create transaction failed with ${res.status}`);
      }
      return res.json()
    })
    .then((resJson) => ({payUrl: resJson.payURL, miniAppUrl: resJson.miniAppInvoiceURL}))
    .catch((err) => {throw err});
}

export async function createTransaction(id: number, amount: string) {
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/payment/create`, {
    method: "POST",
    body: JSON.stringify({
      tgId: id, amount
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  }).then((res) => {
    if (!res.ok) {

      throw new Error(`Create transaction failed with ${res.status}`);
    }

    return res.json()
  }).then((resJson) => {
    if (resJson.message === "Error creating invoice User already have active payments") {
      return getLastActiveTransaction(id);
    }

    return { payUrl: resJson.payURL, miniAppUrl: resJson.miniAppInvoiceURL }
  });
}
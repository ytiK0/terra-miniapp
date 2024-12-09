async function getLastActiveTransaction(id: number) {
  const res = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/payment/findByTg?tgId=${id}`);

  if (!res.ok) {
    throw new Error(`Create transaction failed with ${res.status}`);
  }

  const resJson = await res.json();
  return {payUrl: resJson.payURL, miniAppUrl: resJson.miniAppInvoiceURL}
}

export async function createTransaction(id: number, amount: string) {
  const res = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/payment/create`, {
    method: "POST",
    body: JSON.stringify({
      tgId: id, amount
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });

  const resJson = await res.json();

  if (!res.ok) {
    if (resJson.message === "Error creating invoice User already have active payments") {
      return await getLastActiveTransaction(id);
    }
    throw new Error(`Create transaction failed with ${res.status}`);
  }

  resJson.error;

  return { payUrl: resJson.payURL, miniAppUrl: resJson.miniAppInvoiceURL };
}
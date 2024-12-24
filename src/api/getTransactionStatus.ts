export async function getTransactionStatus(tgId: string) {
  const params = new URLSearchParams({
    tgId
  });

  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/payment/checkStatusPay?${params.toString()}`)
    .then((res) => res.json())
    .then((resJson) => ({ status: resJson.status, payUrl: resJson.payURL }));
}


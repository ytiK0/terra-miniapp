export async function getTransactionStatus(tgId: string) {
  const params = new URLSearchParams({
    tgId
  });

  const res = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/payment/checkStatusPay?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const resJson = await res.json();

  return { status: resJson.status, payUrl: resJson.payURL };
}


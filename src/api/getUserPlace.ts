export async function getUserPlace(id: string | number) {
  const response = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/findUserRating?tgId=${id}`);
  if (!response.ok) {
    throw new Error("noooooooo")
  }
  const resJson: number = await response.json();
  return resJson;
}
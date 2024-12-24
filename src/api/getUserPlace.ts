export async function getUserPlace(id: string | number) {
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/findUserRating?tgId=${id}`)
    .then((res) => res.json() as Promise<number>);
}
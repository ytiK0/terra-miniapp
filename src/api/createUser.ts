import {UserBackend} from "@/api/getUserWallet.ts";

interface CreateUser {
  telegramId: number
  name: string
  link: string
  photoURL: string
  referId: number
}

export async function createUser(userObj: CreateUser) {
  return fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/createByApp`, {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Cannot create new user")
    }
    return res.json() as Promise<UserBackend>
  });
}
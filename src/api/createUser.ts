import {UserBackend} from "@/api/getUserWallet.ts";

interface CreateUser {
  telegramId: number
  name: string
  link: string
  photoURL: string
  referId: number
}

export async function createUser(userObj: CreateUser) {
  const res = await fetch(`${import.meta.env.VITE_TERRA_API_BASEURL}/user/createByApp`, {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  })

  if (!res.ok) {
    throw new Error("Cannot create new user")
  }

  return await res.json() as UserBackend;
}
import {create} from "zustand";

export interface UserWallet {
  terroCoins: number,
  usdt: number
}

interface AppState {
  userWallet: UserWallet | undefined
  setUserWallet: (w: UserWallet) => void
}

export const useAppStore = create<AppState>()((set) => ({
  userWallet: undefined,
  setUserWallet: (userWallet) => set(() => ({ userWallet }))
}))
import {create} from "zustand";

export interface UserWallet {
  terroCoins: number,
  usdt: number
}

interface AppState {
  userWallet: UserWallet
  setUserWallet: (w: UserWallet) => void
}

export const useAppStore = create<AppState>()((set) => ({
  userWallet: {usdt: 0, terroCoins: 0},
  setUserWallet: (userWallet) => set(() => ({ userWallet }))
}))
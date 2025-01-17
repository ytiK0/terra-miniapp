import {useEffect} from "react";
import {getUserWallet} from "@/api/getUserWallet.ts";
import {useAppStore} from "@/state/appState.ts";
import {initData, useSignal} from "@telegram-apps/sdk-react";


export function useUpdateWallet() {
  const setUserWallet = useAppStore((s) => s.setUserWallet);
  const user = useSignal(initData.user);

  if (user?.id === undefined) {
    throw new Error("Invalid user");
  }

  async function updateWallet(id: string, signal: AbortSignal) {
    if (id === undefined) {
      throw new Error("Invalid user");
    }
    const wallet = await getUserWallet(id, signal);

    setUserWallet(wallet);
  }

  useEffect(() => {
    const abortController = new AbortController();

    const signal = abortController.signal;

    updateWallet(user.id.toString(), signal).then();

    return () => abortController.abort("Component was unmount");
  }, []);
}
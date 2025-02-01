import {useLaunchParams, miniApp, useSignal, initData} from '@telegram-apps/sdk-react';
import {AppRoot, Spinner} from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';

import { routes } from '@/navigation/routes.tsx';

import "./App.css"
import {useEffect, useState} from "react";
import {useAppStore} from "@/state/appState.ts";
import {getUserWallet} from "@/api/getUserWallet.ts";
import {createUser} from "@/api/createUser.ts";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const { setUserWallet } = useAppStore();
  const user = useSignal(initData.user);

  const [isLoading, setIsLoading] = useState(true);

  async function loadUser (signal?: AbortSignal) {
    if (user === undefined || user.id === undefined) {
      throw new Error("Invalid user!");
    }

    try {
      const wallet = await getUserWallet(user.id.toString(), signal);

      setUserWallet(wallet);
    }
    catch (err) {
      if ((err as {message: string}).message === "User was not found") {
        const { coins, usdt, depositedUsdt, earnedUsdt } = await createUser({
          telegramId: user.id,
          photoURL: user.photoUrl || "",
          link: user.username || "",
          name: user.firstName,
          referId: user.id
        });

        setUserWallet({terroCoins: coins, usdt, depositedUsdt, earnedUsdt});
      }
      else {
        throw err
      }
    }
  }

  useEffect(()=>{
    const controller = new AbortController();
    const signal = controller.signal;
    loadUser(signal).then(() => setIsLoading(false));

    return () => controller.abort("Page unmount");
  }, []);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      className="main-container"
    >

      {isLoading ? <Spinner style={{textAlign: "center"}} size={"l"} /> :
        <HashRouter>
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} />)}
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
        </HashRouter>
      }
    </AppRoot>
  );
}

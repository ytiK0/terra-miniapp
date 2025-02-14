import {initData, miniApp, useLaunchParams, useSignal} from '@telegram-apps/sdk-react';
import {AppRoot, Spinner} from '@telegram-apps/telegram-ui';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';

import {routes} from '@/navigation/routes.tsx';

import "./App.css"
import {useEffect, useState} from "react";
import {useAppStore} from "@/state/appState.ts";
import {getUserWallet} from "@/api/getUserWallet.ts";
import {createUser} from "@/api/createUser.ts";
import {TriangleExclamationFill} from "@gravity-ui/icons";

const DEFAULT_ERROR_MESSAGE = "Service is currently unavailable";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const {setUserWallet} = useAppStore();
  const user = useSignal(initData.user);

  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null)

  async function loadUser(signal?: AbortSignal) {
    if (user === undefined || user.id === undefined) {
      throw new Error("Invalid user!");
    }

    await getUserWallet(user.id.toString(), signal)
      .then((wallet) => setUserWallet(wallet))
      .catch(async (err) => {
        if (err !== "Page unmount")
          setErr(DEFAULT_ERROR_MESSAGE)
        if ((err as { message: string }).message === "User was not found") {
          await createUser({
            telegramId: user.id,
            photoURL: user.photoUrl || "",
            link: user.username || "",
            name: user.firstName,
            referId: user.id
          })
            .then(({coins, usdt, depositedUsdt, earnedUsdt}) => setUserWallet(
              {
                terroCoins: coins,
                usdt: parseFloat(usdt),
                depositedUsdt: parseFloat(depositedUsdt),
                earnedUsdt: parseFloat(earnedUsdt)
              }
            ))
            .catch(() => setErr(DEFAULT_ERROR_MESSAGE))
        } else {
          throw err
        }
      })
  }

  useEffect(() => {
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

      {err === null ? isLoading ? <Spinner style={{textAlign: "center"}} size={"l"}/> :
          <HashRouter>
            <Routes>
              {routes.map((route) => <Route key={route.path} {...route} />)}
              <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
          </HashRouter>
        :
        <div style={{verticalAlign: "middle", marginTop: "40vh"}}>
          <span style={{display: "block"}}>{err}</span>
          <TriangleExclamationFill color={"#bc1414"} width={50} height={50}/>
        </div>
      }
    </AppRoot>
  );
}

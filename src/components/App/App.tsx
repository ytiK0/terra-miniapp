import {useLaunchParams, miniApp, useSignal, initData} from '@telegram-apps/sdk-react';
import {AppRoot, Spinner} from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';

import { routes } from '@/navigation/routes.tsx';

import "./App.css"
import {useEffect, useState} from "react";
import {useAppStore} from "@/state/appState.ts";
import {getUserWallet} from "@/api/getUserWallet.ts";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const { setUserWallet } = useAppStore()
  const user = useSignal(initData.user);

  const [isLoading, setIsLoading] = useState(true)

  console.log(user)

  async function loadUser () {
    if (user === undefined || user.id === undefined) {
      throw new Error("Invalid user!")
    }
    const wallet = await getUserWallet(user.id.toString())
    setUserWallet(wallet)
  }

  useEffect(()=>{
    loadUser().then(() => setIsLoading(false))
  }, [])

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

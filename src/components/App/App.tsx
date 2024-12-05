import {useLaunchParams, miniApp, useSignal, initData} from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';

import { routes } from '@/navigation/routes.tsx';

import "./App.css"
import {useEffect} from "react";
import {useAppStore} from "@/state/appState.ts";
import {getUserWallet} from "@/api/getUserWallet.ts";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const { setUserWallet } = useAppStore()
  const user = useSignal(initData.user);

  console.log(user)

  async function loadUser () {
    if (user === undefined || user.id === undefined) {
      throw new Error("Invalid user!")
    }
    const wallet = await getUserWallet(user.id.toString())
    setUserWallet(wallet)
  }

  useEffect(()=>{
    loadUser().then()
  }, [])

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      className="main-container"
    >
      <HashRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </HashRouter>
    </AppRoot>
  );
}

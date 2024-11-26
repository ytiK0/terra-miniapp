import { useNavigate } from 'react-router-dom';
import { backButton } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import {BottomMenu} from "@/components/BottomMenu/BottomMenu.tsx";

export function Page({ children, back = false, hasBottomMenu = true }: PropsWithChildren<{
  back?: boolean,
  hasBottomMenu?: boolean
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
  }, [back]);

  return (<>
    {children}
    {hasBottomMenu && <BottomMenu />}
  </>);
}
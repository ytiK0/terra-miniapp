import {PropsWithChildren} from "react";

import "./Badge.css"
import {classNames} from "@telegram-apps/sdk-react";

export function Badge({children, className}: PropsWithChildren<{className?: string}>) {
  return (
    <div className={classNames(className, "badge")}>{children}</div>
  );
}

import {PropsWithChildren} from "react";

import "./Badge.css"

export function Badge({children}: PropsWithChildren) {
  return (
    <div className="bage">{children}</div>
  );
}

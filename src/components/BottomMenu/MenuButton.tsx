import {Link} from "@/components/Link/Link.tsx";
import {useLocation} from "react-router-dom";

export interface BottomMenuButtonProps {
  width?: number,
  buttonName: "levels" | "profile" | "rating" | "wallet" | "home",
}

export function MenuButton({ width, buttonName }: BottomMenuButtonProps) {
  const pathName = useLocation().pathname
  const src = `menu-buttons/${buttonName}${pathName === `/${buttonName}` ? "-active":""}.png`

  return (
    <Link to={`/${buttonName}`} className={"button"} id={buttonName}>
      <img className={"button-img"} src={src} alt={"btn"} width={width || 30} />
    </Link>
  );
}

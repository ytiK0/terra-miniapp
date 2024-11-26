import "./BottomMenu.css"
import {MenuButton} from "@/components/BottomMenu/MenuButton.tsx";
import {Link} from "@/components/Link/Link.tsx";

export function BottomMenu() {
  return (
    <div className={"button-container"}>
      <div className={"button-group"}>
        <MenuButton buttonName={"wallet"} />
        <MenuButton buttonName={"rating"} />
      </div>
      <Link to={"/home"}>
        <div className={"home-button"}>
          <img src="menu-buttons/home.png" alt="menu button" width={50}/>
        </div>
      </Link>
      <div className={"button-group"}>
        <MenuButton buttonName={"levels"} />
        <MenuButton buttonName={"profile"} width={25} />
      </div>

    </div>
  );
}

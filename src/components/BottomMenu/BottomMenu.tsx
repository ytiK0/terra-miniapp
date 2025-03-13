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
      <div className={"home-button-wrapper"}>
        <Link to={"/home"}>
          <div className={"home-button"}>
            <img className={"home-button_img"} src="menu-buttons/home.png" id={"home"} alt="menu button"/>
          </div>
        </Link>
      </div>
      <div className={"button-group"}>
        <MenuButton buttonName={"levels"} />
        <MenuButton buttonName={"profile"} width={25} />
      </div>

    </div>
  );
}

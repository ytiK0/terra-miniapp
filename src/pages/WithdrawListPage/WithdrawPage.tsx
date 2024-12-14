// import style from "./WithdrawPage.module.css"
import {Page} from "@/components/Page.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";

export function WithdrawPage() {
  return (
    <Page back={true}>
      <header style={{marginTop: 15}}>
        <Logo />
        <span style={{fontSize:45, lineHeight: "100%", marginTop: 5}}>
          Withdrawal List
        </span>
      </header>
      <section>
        { /* TODO */}
      </section>
    </Page>
  );
}

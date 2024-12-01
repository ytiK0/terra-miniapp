/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TERRA_CHANEL_LINK: string;
  readonly VITE_TERRA_TWITTER_LINK: string;
  readonly VITE_TERRA_SUPPORT_LINK: string;
  readonly VITE_TERRA_API_BASEURL: string;
  readonly VITE_TERRA_BOTNAME: string;
  readonly VITE_TERRA_CHANEL_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
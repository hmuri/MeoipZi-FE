import { atom } from "recoil";

export const isModalOpen = atom({
  key: "isModalOpen",
  default: false,
});

export const isLogin = atom<string>({
  key: "isLogin",
  default: "login",
});

export const fontSizeState = atom({
  key: "fontSizeState",
  default: 16,
});

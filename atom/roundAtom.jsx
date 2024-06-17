import { atom } from "recoil";

export const winState = atom({
  key: "winAtom",
  default: 0,
});

export const tieState = atom({
  key: "tieAtom",
  default: 0,
});

export const loseState = atom({
  key: "loseAtom",
  default: 0,
});

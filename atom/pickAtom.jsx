import { atom } from "recoil";

export const pickState = atom({
  key: "pickState",
  default: false,
});

export const withAIState = atom({
  key: "withAIState",
  default: undefined,
});

export const sideState = atom({
  key: "sideState",
  default: 1,
});

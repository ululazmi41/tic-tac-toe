import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const modalConditionState = atom({
  key: "modalConditionState",
  default: false,
});

export const currentTurnState = atom({
  key: "currentTurnState",
  default: 1,
});

export const restartState = atom({
  key: "restartState",
  default: false,
});

export const quitState = atom({
  key: "quitState",
  default: false,
});

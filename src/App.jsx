import React, { useEffect } from "react";

// Components
import Pick from "./components/Pick";
import Play from "./components/Play";

// Recoil
import { useRecoilState } from "recoil";

// Atoms
import { quitState } from "../atom/playAtom";
import { pickState, sideState } from "../atom/pickAtom";
import { loseState, tieState, winState } from "../atom/roundAtom";

function App() {
  const [pick, setPick] = useRecoilState(pickState);
  const [side, setSide] = useRecoilState(sideState);
  const [quit, setQuit] = useRecoilState(quitState);

  const [win, setWin] = useRecoilState(winState);
  const [tie, setTie] = useRecoilState(tieState);
  const [lose, setLose] = useRecoilState(loseState);

  // const data = [
  //   [1, 1, 1],
  //   [1, 1, 4],
  //   [2, 5, undefined],
  // ];

  // data.forEach((ely, y) => {
  //   ely.forEach((elx, x) => {
  //     if (x - 1 < 0) {
  //       // check
  //     } else {
  //       //
  //     }
  //   });
  // });

  useEffect(() => {
    if (quit) {
      setWin(0);
      setTie(0);
      setLose(0);
      setSide(1);

      setQuit(false);
      setPick(false);
    }
  }, [quit]);

  return pick ? <Play /> : <Pick />;
}

export default App;

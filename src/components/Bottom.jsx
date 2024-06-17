import React from "react";
import { useRecoilState } from "recoil";
import { sideState } from "../../atom/pickAtom";
import { loseState, tieState, winState } from "../../atom/roundAtom";

function Bottom() {
  const [side, setSide] = useRecoilState(sideState);

  const [win, setWin] = useRecoilState(winState);
  const [tie, setTie] = useRecoilState(tieState);
  const [lose, setLose] = useRecoilState(loseState);

  return (
    <div className="flex justify-between">
      <div className="w-[80px] h-Fit text-gray-900">
        <div className="p-2 gap-y-1 flex flex-col justify-center bg-blue-800/50 rounded-md shadow-md shadow-black/50">
          <p className="font-extrabold text-xs w-fit h-fit mx-auto">
            {side == 0 ? "O" : "X"} (YOU)
          </p>
          <p className="font-bold text-md w-fit h-fit mx-auto">{win}</p>
        </div>
      </div>
      <div className="w-[80px] h-Fit">
        <div className="p-2 gap-y-1 flex flex-col justify-center bg-white/75 rounded-md shadow-md shadow-black/50">
          <p className="font-extrabold text-xs w-fit h-fit mx-auto">TIE</p>
          <p className="font-bold text-md w-fit h-fit mx-auto">{tie}</p>
        </div>
      </div>
      <div className="w-[80px] h-Fit">
        <div className="p-2 gap-y-1 flex flex-col justify-center bg-yellow-600 rounded-md shadow-md shadow-black/50">
          <p className="font-extrabold text-xs w-fit h-fit mx-auto">
            {side == 1 ? "O" : "X"} (CPU)
          </p>
          <p className="font-bold text-md w-fit h-fit mx-auto">{lose}</p>
        </div>
      </div>
    </div>
  );
}

export default Bottom;

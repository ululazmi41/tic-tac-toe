import React from "react";

import { useRecoilState } from "recoil";
import { pickState, sideState, withAIState } from "../../atom/pickAtom";

function Pick() {
  const [side, setSide] = useRecoilState(sideState);
  const [unused1, setPick] = useRecoilState(pickState);
  const [unused2, setWithAI] = useRecoilState(withAIState);

  const handleClick = (withAI) => {
    setSide(side);
    setPick(true);
    setWithAI(withAI);
  };

  return (
    <div className="flex gap-y-4 flex-col justify-center items-center w-screen h-screen bg-blue-900/75 rounded-md">
      <div className="bg-blue-900/50 p-4 grid gap-y-4 rounded-md">
        <p className="text-white/75 font-bold text-center">PICK SIDE</p>
        <div className="flex gap-x-2 items-center justify-center bg-black/25 rounded-md p-2">
          <button
            className={`py-2 px-12 rounded-md ${
              side === 1 ? "bg-black/50" : ""
            } hover:bg-black/50 transition-all`}
            onClick={() => setSide(1)}
          >
            <svg
              width="51"
              height="51"
              viewBox="0 0 51 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8.48535"
                y="50.9117"
                width="12"
                height="60"
                rx="6"
                transform="rotate(-135 8.48535 50.9117)"
                fill="rgba(165, 165, 165, 1)"
              />
              <rect
                y="8.48529"
                width="12"
                height="60"
                rx="6"
                transform="rotate(-45 0 8.48529)"
                fill="rgba(165, 165, 165, 1)"
              />
            </svg>
          </button>

          <button
            className={`py-2 px-12 rounded-md ${
              side === 0 ? "bg-black/50" : ""
            } hover:bg-black/50 transition-all`}
            onClick={() => setSide(0)}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30ZM12 30C12 39.9411 20.0589 48 30 48C39.9411 48 48 39.9411 48 30C48 20.0589 39.9411 12 30 12C20.0589 12 12 20.0589 12 30Z"
                fill="rgba(165, 165, 165, 1)"
              />
            </svg>
          </button>
        </div>
        <p className="text-white/25 font-bold text-center">
          REMEMBER : X GOES FIRST
        </p>
      </div>

      <div className="grid gap-y-4">
        <button
          className="w-full h-[40px] p-2 gap-y-1 flex flex-col justify-center bg-yellow-600 rounded-md shadow-md shadow-black/50"
          onClick={() => handleClick(1)}
        >
          <p className="font-extrabold text-xs w-fit h-fit mx-auto">
            NEW GAME (VS CPU)
          </p>
        </button>

        <button
          className="w-full h-[40px] p-2 gap-y-1 flex flex-col justify-center bg-teal-600 rounded-md shadow-md shadow-black/50"
          onClick={() => handleClick(0)}
        >
          <p className="font-extrabold text-xs w-fit h-fit mx-auto">
            NEW GAME (VS PLAYER)
          </p>
        </button>
      </div>
    </div>
  );
}

export default Pick;

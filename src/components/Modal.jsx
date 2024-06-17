import React from "react";

// Recoil
import { useRecoilState } from "recoil";
import { modalState, quitState, restartState } from "../../atom/playAtom";

function Modal({ winner, modalCondition }) {
  // Recoil State
  const [unused1, setShowModal] = useRecoilState(modalState);
  const [unused2, setRestart] = useRecoilState(restartState);
  const [unused3, setQuit] = useRecoilState(quitState);

  const handleRestart = () => {
    setRestart(true);
  };

  const handleQuit = () => {
    setQuit(true);
    setRestart(true);
    setShowModal(false);
  };

  return (
    <div className="absolute flex flex-col items-center justify-center left-0 top-0 w-screen h-screen bg-black/50">
      <div className="w-full sm:w-96 h-fit p-6 bg-gray-900 flex flex-col gap-8 items-center justify-center">
        {modalCondition === "won" && (
          <>
            <p className="text-white/75 font-bold">YOU WON!</p>
            <div className="flex text-yellow-600 font-bold text-3xl">
              {winner == 0 ? "O" : "X"} TAKES THE ROUND
            </div>
            <div className="flex gap-x-4">
              <button
                className="w-[60px] h-[40px] p-2 gap-y-1 flex flex-col justify-center bg-white/75 rounded-md shadow-md shadow-black/50"
                onClick={() => handleQuit()}
              >
                <p className="font-extrabold text-xs w-fit h-fit mx-auto">
                  QUIT
                </p>
              </button>
              <button
                className="w-fit h-[40px] p-2 gap-y-1 flex flex-col justify-center bg-yellow-600 rounded-md shadow-md shadow-black/50"
                onClick={() => handleRestart()}
              >
                <p className="font-extrabold text-xs w-fit h-fit mx-auto">
                  NEXT ROUND
                </p>
              </button>
            </div>
          </>
        )}

        {modalCondition === "tie" && (
          <>
            <div className="flex text-yellow-600 font-bold text-3xl">TIE</div>
            <div className="flex gap-x-4">
              <button
                className="w-[60px] h-[40px] p-2 gap-y-1 flex flex-col justify-center bg-white/75 rounded-md shadow-md shadow-black/50"
                onClick={() => handleQuit()}
              >
                <p className="font-extrabold text-xs w-fit h-fit mx-auto">
                  QUIT
                </p>
              </button>
              <button
                className="w-fit h-[40px] p-2 gap-y-1 flex flex-col justify-center bg-yellow-600 rounded-md shadow-md shadow-black/50"
                onClick={() => handleRestart()}
              >
                <p className="font-extrabold text-xs w-fit h-fit mx-auto">
                  NEXT MATCH
                </p>
              </button>
            </div>
          </>
        )}

        {modalCondition === "lost" && (
          <>
            <p className="text-white/75 font-bold">YOU LOST</p>
            <div className="flex text-yellow-600 font-bold text-3xl">
              {winner == 0 ? "O" : "X"} TAKES THE ROUND
            </div>
            <div className="flex gap-x-4">
              <button
                className="w-[60px] h-[40px] p-2 gap-y-1 flex flex-col justify-center bg-white/75 rounded-md shadow-md shadow-black/50"
                onClick={() => handleQuit()}
              >
                <p className="font-extrabold text-xs w-fit h-fit mx-auto">
                  QUIT
                </p>
              </button>
              <button
                className="w-fit h-[40px] p-2 gap-y-1 flex flex-col justify-center bg-yellow-600 rounded-md shadow-md shadow-black/50"
                onClick={() => handleRestart()}
              >
                <p className="font-extrabold text-xs w-fit h-fit mx-auto">
                  NEXT ROUND
                </p>
              </button>
            </div>
          </>
        )}

        {modalCondition === "reset" && (
          <>
            <div className="flex text-white/75 font-bold text-3xl">
              RESTART GAME?
            </div>
            <div className="flex gap-x-4">
              <button
                className="w-fit h-[40px] p-2 gap-y-1 flex flex-col justify-center bg-white/75 rounded-md shadow-md shadow-black/50"
                onClick={() => setShowModal(false)}
              >
                <p className="font-extrabold text-xs w-fit h-fit mx-auto">
                  NO, CANCEL
                </p>
              </button>
              <button
                className="w-fit h-[40px] p-2 gap-y-1 flex flex-col justify-center bg-yellow-600 rounded-md shadow-md shadow-black/50"
                onClick={() => handleRestart()}
              >
                <p className="font-extrabold text-xs w-fit h-fit mx-auto">
                  YES, RESTART
                </p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;

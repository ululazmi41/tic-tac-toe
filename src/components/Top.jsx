import React from "react";
import { useRecoilState } from "recoil";
import {
  currentTurnState,
  modalConditionState,
  modalState,
} from "../../atom/playAtom";

function Top() {
  const [turn, setTurn] = useRecoilState(currentTurnState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [modalCondition, setModalCondition] =
    useRecoilState(modalConditionState);

  const handleClick = () => {
    setShowModal(true);
    setModalCondition("reset");
  };

  return (
    <div className="flex justify-between mb-8">
      <div className="w-[80px] h-fit">
        <div className="flex items-center justify-center gap-x-1 h-[40px]">
          <img
            src="turn_x.svg"
            style={{ width: "30px", height: "30px" }}
          />
          <img
            src="turn_o.svg"
            style={{ width: "30px", height: "30px" }}
          />
        </div>
      </div>
      <div className="w-[80px] h-fit">
        <div className="h-[40px] bg-blue-800/50 flex items-center justify-center rounded-md shadow-md shadow-black/20">
          <p className="w-fit h-fit text-lg font-extrabold text-white/75 cursor-default">
            {turn == 0 ? "O" : "X"} TURN
          </p>
        </div>
      </div>
      <div className="w-[80px] h-fit flex justify-end">
        <img
          className="cursor-pointer"
          src="restart.svg"
          onClick={() => handleClick()}
        />
      </div>
    </div>
  );
}

export default Top;

import React, { useEffect, useState } from "react";

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";

// Recoil Atoms
import { sideState, withAIState } from "../../atom/pickAtom";
import {
  currentTurnState,
  modalConditionState,
  modalState,
  restartState,
} from "../../atom/playAtom";
import { winState, tieState, loseState } from "../../atom/roundAtom";

// Components
import Modal from "./Modal";
import Top from "./Top";
import Bottom from "./Bottom";

function Play() {
  const playerSide = useRecoilValue(sideState);
  const [turn, setTurn] = useRecoilState(currentTurnState);

  const [showModal, setShowModal] = useRecoilState(modalState);
  const [modalCondition, setModalCondition] =
    useRecoilState(modalConditionState);

  // AI Related
  const [withAI, unusedSetWithAI] = useRecoilState(withAIState);
  const [AITurn, setAITurn] = useState(false);
  let delayedTurn = false;
  let endOfTurn = false;

  useEffect(() => {
    if (!withAI) return;

    if (playerSide == 0) setAITurn(true);
  }, []);

  const [data, setData] = useState([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);

  const [restart, setRestart] = useRecoilState(restartState);
  const [winner, setWinner] = useState(false);
  const [win, setWin] = useRecoilState(winState);
  const [tie, setTie] = useRecoilState(tieState);
  const [lose, setLose] = useRecoilState(loseState);

  useEffect(() => {
    if (restart) handleReset();
  }, [restart]);

  const handleEndTurn = (condition) => {
    endOfTurn = true;
    setShowModal(true);
    setModalCondition(condition);

    if (condition == "tie") {
      setTie(tie + 1);
    } else if (condition == "won") {
      setWin(win + 1);
      setWinner(playerSide);
    } else if (condition == "lost") {
      setLose(lose + 1);
      setWinner(!playerSide);
    }
  };

  const checkBoxes = () => {
    let allFilled = data.every((currentY) =>
      currentY.every((currentX) => currentX != undefined)
    );

    if (
      (data[0][0] == playerSide &&
        data[0][1] == playerSide &&
        data[0][2] == playerSide) ||
      (data[1][0] == playerSide &&
        data[1][1] == playerSide &&
        data[1][2] == playerSide) ||
      (data[2][0] == playerSide &&
        data[2][1] == playerSide &&
        data[2][2] == playerSide) ||
      (data[0][0] == playerSide &&
        data[1][0] == playerSide &&
        data[2][0] == playerSide) ||
      (data[0][1] == playerSide &&
        data[1][1] == playerSide &&
        data[2][1] == playerSide) ||
      (data[0][2] == playerSide &&
        data[1][2] == playerSide &&
        data[2][2] == playerSide) ||
      (data[0][0] == playerSide &&
        data[1][1] == playerSide &&
        data[2][2] == playerSide) ||
      (data[0][2] == playerSide &&
        data[1][1] == playerSide &&
        data[2][0] == playerSide)
    ) {
      handleEndTurn("won");
    } else if (
      (data[0][0] == !playerSide &&
        data[0][1] == !playerSide &&
        data[0][2] == !playerSide) ||
      (data[1][0] == !playerSide &&
        data[1][1] == !playerSide &&
        data[1][2] == !playerSide) ||
      (data[2][0] == !playerSide &&
        data[2][1] == !playerSide &&
        data[2][2] == !playerSide) ||
      (data[0][0] == !playerSide &&
        data[1][0] == !playerSide &&
        data[2][0] == !playerSide) ||
      (data[0][1] == !playerSide &&
        data[1][1] == !playerSide &&
        data[2][1] == !playerSide) ||
      (data[0][2] == !playerSide &&
        data[1][2] == !playerSide &&
        data[2][2] == !playerSide) ||
      (data[0][0] == !playerSide &&
        data[1][1] == !playerSide &&
        data[2][2] == !playerSide) ||
      (data[0][2] == !playerSide &&
        data[1][1] == !playerSide &&
        data[2][0] == !playerSide)
    ) {
      handleEndTurn("lost");
    } else if (allFilled) {
      handleEndTurn("tie");
    }
  };

  function handleClick(y, x, id) {
    if (delayedTurn) return;

    let temp = data;

    if (temp[y][x] == 1 || temp[y][x] == 0) return;
    temp[y][x] = turn;

    checkBoxes();
    setData(temp);
    setTurn(turn === 0 ? 1 : 0);

    // AI Related
    if (!withAI) return;

    delayedTurn = true;

    setTimeout(() => {
      delayedTurn = false;
      if (!endOfTurn) setAITurn(true);
    }, 500);
  }

  const handleReset = () => {
    setRestart(false);
    setModalCondition("");
    setWinner(null);
    setShowModal(false);
    setData([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);

    if (withAI && playerSide == 1 && turn == 0) setAITurn(true);
    if (withAI && playerSide == 0 && turn == 1) setAITurn(true);
  };

  useEffect(() => {
    let allFilled = data.every((currentY) =>
      currentY.every((currentX) => currentX != undefined)
    );

    if (allFilled || !AITurn || endOfTurn) return;
    setAITurn(false);

    let temp = data;

    var y;
    var x;

    function recursive() {
      y = Math.round(Math.random() * 2);
      x = Math.round(Math.random() * 2);

      if (temp[y][x] == 1 || temp[y][x] == 0) {
        recursive();
      }
    }
    recursive();

    temp[y][x] = turn;
    setData(temp);

    checkBoxes();
    setTurn(turn === 0 ? 1 : 0);
  }, [AITurn]);

  return (
    <div>
      {showModal && <Modal winner={winner} modalCondition={modalCondition} />}
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-blue-900/75">
        <div className="grid w-fit gap-y-4">
          <Top />
          <div className="flex flex-col gap-y-6">
            <div className="flex gap-x-6">
              <img
                className="shadow-md shadow-black/50"
                src={`${
                  data[0][0] == undefined
                    ? "empty.svg"
                    : data[0][0] == 1
                    ? "x.svg"
                    : "o.svg"
                }`}
                onClick={() => handleClick(0, 0, "aa")}
                id="aa"
              />
              <img
                className="shadow-md shadow-black/50"
                src={`${
                  data[0][1] == undefined
                    ? "empty.svg"
                    : data[0][1] == 1
                    ? "x.svg"
                    : "o.svg"
                }`}
                onClick={() => handleClick(0, 1, "ab")}
                id="ab"
              />
              <img
                className="shadow-md shadow-black/50"
                src={`${
                  data[0][2] == undefined
                    ? "empty.svg"
                    : data[0][2] == 1
                    ? "x.svg"
                    : "o.svg"
                }`}
                onClick={() => handleClick(0, 2, "ac")}
                id="ac"
              />
            </div>

            <div className="flex gap-x-6">
              <img
                className="shadow-md shadow-black/50"
                src={`${
                  data[1][0] == undefined
                    ? "empty.svg"
                    : data[1][0] == 1
                    ? "x.svg"
                    : "o.svg"
                }`}
                onClick={() => handleClick(1, 0, "ba")}
                id="ba"
              />
              <img
                className="shadow-md shadow-black/50"
                src={`${
                  data[1][1] == undefined
                    ? "empty.svg"
                    : data[1][1] == 1
                    ? "x.svg"
                    : "o.svg"
                }`}
                onClick={() => handleClick(1, 1, "bb")}
                id="bb"
              />
              <img
                className="shadow-md shadow-black/50"
                src={`${
                  data[1][2] == undefined
                    ? "empty.svg"
                    : data[1][2] == 1
                    ? "x.svg"
                    : "o.svg"
                }`}
                onClick={() => handleClick(1, 2, "bc")}
                id="bc"
              />
            </div>

            <div className="flex gap-x-6">
              <img
                className="shadow-md shadow-black/50"
                src={`${
                  data[2][0] == undefined
                    ? "empty.svg"
                    : data[2][0] == 1
                    ? "x.svg"
                    : "o.svg"
                }`}
                onClick={() => handleClick(2, 0, "ca")}
                id="ca"
              />
              <img
                className="shadow-md shadow-black/50"
                src={`${
                  data[2][1] == undefined
                    ? "empty.svg"
                    : data[2][1] == 1
                    ? "x.svg"
                    : "o.svg"
                }`}
                onClick={() => handleClick(2, 1, "cb")}
                id="cb"
              />
              <img
                className="shadow-md shadow-black/50"
                src={`${
                  data[2][2] == undefined
                    ? "empty.svg"
                    : data[2][2] == 1
                    ? "x.svg"
                    : "o.svg"
                }`}
                onClick={() => handleClick(2, 2, "cc")}
                id="cc"
              />
            </div>
          </div>
          <Bottom />
        </div>
      </div>
    </div>
  );
}

export default Play;

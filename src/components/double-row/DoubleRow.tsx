import { FC, useState, useEffect } from "react";

import { changeLose, changeDeposit } from "../../store/features/gameSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../store";

import Cell from "../cell/Cell";

import "./DoubleRow.scss";

let _tempValuesOne: Array<string | number> = ["?", "?"];
let _tempValuesTwo: Array<string | number> = ["?", "?", "?"];

export interface IDoubleRow {
  numberRow: number;
  currentCount: number;
  currentFactor: number;
  incrementCount: (currentCount: number) => void;
}

const DoubleRow: FC<IDoubleRow> = ({
  numberRow,
  currentCount,
  currentFactor,
  incrementCount,
}) => {
  const dispatch = useDispatch();

  const deposit = useSelector((state: RootType) => state.gameData.deposit);
  const cheatMode = useSelector((state: RootType) => state.gameData.cheatMode);
  const countCell = useSelector((state: RootType) => state.gameData.countCell);
  const lose = useSelector((state: RootType) => state.gameData.lose);

  // const [gold, setGold] = useState<number>(Math.ceil(Math.random() * 2) - 1);
  const [win, setWin] = useState<number | string>("?");
  const [choose, setChoose] = useState<number | string>("?");
  const [values, setValues] = useState<Array<string | number>>(
    countCell === 1.2 ? _tempValuesOne : _tempValuesTwo
  );

  useEffect(() => {
    if (numberRow < currentCount) {
      _tempValuesOne = JSON.parse(
        localStorage.getItem(String(numberRow)) || "[]"
      );
    }
  }, [numberRow]);

  const clickOnCellHandler = (currentCountValue: number): void => {
    if (currentCount === numberRow) {
      let _temp: number[] = [];
      let fixedArrayOne: number[] = [0, 1];
      let fixedArrayTwo: number[] = [0, 0, 1];

      for (
        let i = 0;
        i < (countCell === 1.2 ? _tempValuesOne.length : _tempValuesTwo.length);
        i++
      ) {
        let randomValue = Math.ceil(Math.random() * 2) - 1;

        if (randomValue === 1 && _temp.includes(1)) {
          _temp.push(0);

          continue;
        }

        if (
          randomValue === 0 &&
          !_temp.includes(1) &&
          i === _tempValuesOne.length - 1
        ) {
          _temp.push(1);

          continue;
        }

        _temp.push(randomValue);
      }

      localStorage.setItem(String(numberRow), JSON.stringify(_temp));

      setChoose(currentCountValue);

      countCell === 1.2
        ? setWin(
            cheatMode ? fixedArrayOne.indexOf(1) + 1 : _temp.indexOf(1) + 1
          )
        : setWin(
            cheatMode ? fixedArrayTwo.indexOf(1) + 1 : _temp.indexOf(1) + 1
          );

      countCell === 1.2
        ? setValues(cheatMode ? fixedArrayOne : _temp)
        : setValues(cheatMode ? fixedArrayTwo : _temp);

      if (choose === win) {
        dispatch(changeDeposit(Math.floor(deposit * currentFactor)));
      }
    }
  };

  return (
    <div className="double-row-wrapper">
      <p>x{currentFactor}</p>
      <div
        className={
          numberRow > currentCount && !lose ? "double-row fill" : "double-row"
        }
        onClick={() => incrementCount(numberRow)}
      >
        {values.map((value, index) => (
          <Cell
            key={index}
            value={
              lose
                ? JSON.parse(localStorage.getItem(String(numberRow))!)[index]
                : value
            }
            currentCountValue={index + 1}
            win={win}
            choose={choose}
            numberCell={index + 1}
            currentFactor={currentFactor}
            clickOnCellHandler={clickOnCellHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default DoubleRow;

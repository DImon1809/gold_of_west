import { FC, useEffect } from "react";

import { changeLose, changeDeposit } from "../../store/features/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../../store";

import { useFillNet } from "../../hooks/useFillNet";

export interface ICell {
  value: string | number;
  currentCountValue: number;
  win: string | number;
  choose: string | number;
  numberCell: number;
  currentFactor: number;
  clickOnCellHandler: (currentCountValue: number) => void;
}

const Cell: FC<ICell> = ({
  value,
  currentCountValue,
  win,
  choose,
  numberCell,
  currentFactor,
  clickOnCellHandler,
}) => {
  const dispatch = useDispatch();
  const lose = useSelector((state: RootType) => state.gameData.lose);
  const deposit = useSelector((state: RootType) => state.gameData.deposit);

  const { fillNet } = useFillNet();

  useEffect(() => {
    // if (win === choose && win !== "?" && choose !== "?") {
    //   console.log("working");
    //   dispatch(changeDeposit(currentFactor * deposit));
    // }

    if (win !== choose) {
      dispatch(changeLose(true));

      fillNet();
    }
  }, [win, choose, fillNet, changeLose, currentFactor, deposit]);

  return (
    <div
      className={
        win !== "?" && win === choose && win === numberCell
          ? "cell win"
          : win !== "?" && win !== choose && choose === numberCell
          ? "cell lose"
          : "cell"
      }
      onClick={() => !lose && clickOnCellHandler(currentCountValue)}
    >
      {value}
    </div>
  );
};

export default Cell;

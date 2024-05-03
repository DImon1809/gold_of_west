import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInitialFactor } from "../../store/features/gameSlice";

import "./Sceen.scss";

import preview from "../../images/preview.png";

export interface ISceen {
  factor: number;
  changeFactorHandler: () => void;
}

const Sceen: FC<ISceen> = ({ factor, changeFactorHandler }) => {
  const dispatch = useDispatch();

  const setFactorHandler = (): void => {
    dispatch(setInitialFactor(factor));

    changeFactorHandler();
  };

  return (
    <div className="sceen-card" onClick={setFactorHandler}>
      <img src={preview} alt="#" />
      <p>x{factor}</p>
    </div>
  );
};

export default Sceen;

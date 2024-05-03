import { FC, useEffect, useState } from "react";

import {
  changeCheatMode,
  increaseAmount,
  changeCountCell,
} from "./store/features/gameSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "./store";

import InputAmount from "./components/input-amount/InputAmount";
import AmountTable from "./components/amount-table/AmountTable";
import Sceen from "./components/sceen/Sceen";
import LoseAlert from "./components/lose-alert/LoseAlert";

import SectionNet from "./components/section-net/SectionNet";

import "./App.scss";

const App: FC = () => {
  const dispatch = useDispatch();
  const lose = useSelector((state: RootType) => state.gameData.lose);
  const deposit = useSelector((state: RootType) => state.gameData.deposit);

  const [inputAmount, setInputAmount] = useState<boolean>(true);
  const [createDeposit, setCreateDeposit] = useState<boolean>(false);

  const [closeFactorAnimation, setCloseFactorAnimation] =
    useState<boolean>(false);
  const [closeLoseAnimation, setCloseLoseAnimation] = useState<boolean>(false);

  const [changeFactor, setChangeFactor] = useState<boolean>(false);
  const [openNet, setOpenNet] = useState<boolean>(false);

  const [openAlertLose, setOpenAlertLose] = useState<boolean>(false);
  const [openAlertWin, setOpenAlertWin] = useState<boolean>(false);

  // const [factor, setFactor] = useState<number>(0);

  const changeInputAmountHandler = (): void => {
    setTimeout(() => {
      setInputAmount(false);

      setChangeFactor(true);
    }, 1300);
  };

  const changeCreateDepositHandler = (comeback: boolean): void => {
    setTimeout(() => {
      !comeback && setOpenNet(true);

      localStorage.clear();

      setCreateDeposit(false);

      comeback && setCloseFactorAnimation(false);
      comeback && setChangeFactor(true);
    }, 1300);
  };

  const changeFactorHandler = (factor: number): void => {
    setCloseFactorAnimation(true);

    dispatch(changeCountCell(factor));

    setTimeout(() => {
      setChangeFactor(!changeFactor);

      setCreateDeposit(true);
    }, 1000);
  };

  const closeLoseAlertHandler = (comeback: boolean): void => {
    setCloseLoseAnimation(true);

    setTimeout(() => {
      setOpenAlertLose(false);
      setOpenAlertWin(false);

      comeback && setCreateDeposit(true);

      !comeback && setCloseFactorAnimation(false);
      !comeback && setChangeFactor(true);
    }, 1000);
  };

  const changeOpenAlertWinHandler = (): void => {
    setCloseLoseAnimation(false);
    setOpenAlertWin(true);

    setOpenNet(false);

    dispatch(increaseAmount(deposit));
  };

  const turnOnCheatMode = () => {
    dispatch(changeCheatMode());
  };

  useEffect(() => {
    if (lose) {
      setCloseLoseAnimation(false);

      setTimeout(() => {
        setOpenAlertLose(true);

        setOpenNet(false);
      }, 1000);
    }
  }, [lose]);

  return (
    <>
      <div className="hidden-button" onClick={turnOnCheatMode}></div>
      {inputAmount && (
        <InputAmount
          changeInputAmountHandler={changeInputAmountHandler}
          isCreateDeposit={false}
        />
      )}

      <AmountTable />

      {changeFactor && (
        <div className={closeFactorAnimation ? "sceens close" : "sceens"}>
          <Sceen
            factor={1.2}
            changeFactorHandler={() => changeFactorHandler(1.2)}
          />
          <Sceen
            factor={2}
            changeFactorHandler={() => changeFactorHandler(2)}
          />
        </div>
      )}

      {createDeposit && (
        <InputAmount
          changeCreateDepositHandler={changeCreateDepositHandler}
          isCreateDeposit={true}
        />
      )}

      {openNet && (
        <SectionNet changeOpenAlertWinHandler={changeOpenAlertWinHandler} />
      )}

      {openAlertLose && (
        <LoseAlert
          closeLoseAlertHandler={closeLoseAlertHandler}
          closeLoseAnimation={closeLoseAnimation}
        />
      )}

      {openAlertWin && (
        <LoseAlert
          closeLoseAlertHandler={closeLoseAlertHandler}
          closeLoseAnimation={closeLoseAnimation}
          openAlertWin={openAlertWin}
        />
      )}
    </>
  );
};

export default App;

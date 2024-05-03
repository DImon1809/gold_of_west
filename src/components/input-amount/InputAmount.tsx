import React, { FC, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setAmount,
  setDeposit,
  changeLose,
} from "../../store/features/gameSlice";
import { RootType } from "../../store";

import "./InputAmount.scss";

export interface IInputAmout {
  isCreateDeposit: boolean;
  changeInputAmountHandler?: () => void;
  changeCreateDepositHandler?: (comeback: boolean) => void;
}

const InputAmount: FC<IInputAmout> = ({
  changeInputAmountHandler,
  changeCreateDepositHandler,
  isCreateDeposit,
}) => {
  const dispatch = useDispatch();

  const amount = useSelector((state: RootType) => state.gameData.amount);

  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [closeAlert, setCloseAlert] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [noFacilities, setNoFacilities] = useState<boolean>(false);

  const changeAmountHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (Number(event.target.value) / 1 === Number(event.target.value)) {
      setCurrentAmount(Number(event.target.value));
    }
  };

  const setAmountHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    dispatch(setAmount(currentAmount));

    changeInputAmountHandler && changeInputAmountHandler();

    setCloseAlert(true);
  };

  const createDepositHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (Number(event.target.value) / 1 === Number(event.target.value)) {
      setCurrentAmount(Number(event.target.value));
    }
  };

  const setDepositHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    if (currentAmount < 10) {
      setError(true);
    }

    if (currentAmount >= 10 && currentAmount <= amount) {
      dispatch(setDeposit(currentAmount));
      dispatch(setAmount(amount - currentAmount));
      dispatch(changeLose(false));

      changeCreateDepositHandler && changeCreateDepositHandler(false);

      setCloseAlert(true);
    }

    if (currentAmount > amount) setNoFacilities(true);
  };

  const closeCreateDepositHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    changeCreateDepositHandler && changeCreateDepositHandler(true);

    setCloseAlert(true);
  };

  useEffect(() => {
    if (error || noFacilities) {
      setError(false);
      setNoFacilities(false);
    }
  }, [currentAmount]);

  return (
    <div
      className={
        closeAlert
          ? isCreateDeposit
            ? "input-alert create-deposit close"
            : "input-alert close"
          : isCreateDeposit
          ? "input-alert create-deposit"
          : "input-alert"
      }
    >
      {isCreateDeposit ? (
        <div
          className={error ? "text-alert-wrapper error" : "text-alert-wrapper"}
        >
          {noFacilities ? (
            <>
              <p style={{ color: "red" }}>Недостаточно средств</p>
            </>
          ) : (
            <>
              <p>Введите сумму депозита</p>
              <p>Учтите, что она не должна быть меньше 10 рублей</p>
            </>
          )}
        </div>
      ) : (
        <div className="text-alert-wrapper">
          <p className="text-alert">Введите сумму, которую хотите внести</p>
        </div>
      )}
      <div className="input-wrapper">
        <input
          type="text"
          value={currentAmount === 0 ? "" : currentAmount}
          onChange={(event) => {
            if (isCreateDeposit) return createDepositHandler(event);

            return changeAmountHandler(event);
          }}
        />
      </div>
      <div className="button-wrapper">
        {isCreateDeposit ? (
          <>
            <button
              onClick={setDepositHandler}
              className="action-button deposit"
            >
              Применить
            </button>
            <button
              className="action-button deposit"
              onClick={closeCreateDepositHandler}
            >
              Выйти
            </button>
          </>
        ) : (
          <button onClick={setAmountHandler} className="action-button">
            Применить
          </button>
        )}
      </div>
    </div>
  );
};

export default InputAmount;

import { FC } from "react";

import { useSelector } from "react-redux";
import { RootType } from "../../store";

import "./LoseAlert.scss";

export interface ILoseAlert {
  closeLoseAnimation?: boolean;
  openAlertWin?: boolean;
  closeLoseAlertHandler?: (comeback: boolean) => void;
}

const LoseAlert: FC<ILoseAlert> = ({
  closeLoseAlertHandler,
  openAlertWin,
  closeLoseAnimation,
}) => {
  const deposit = useSelector((state: RootType) => state.gameData.deposit);

  return (
    <div className={closeLoseAnimation ? "lose-alert close" : "lose-alert"}>
      <div className="lose-text-wrapper">
        {openAlertWin ? (
          <p>Вам начислено {deposit} рублей</p>
        ) : (
          <p>Вы проиграли!</p>
        )}
      </div>

      <div className="wrapper-buttons">
        <button
          className="lose-button"
          onClick={() => closeLoseAlertHandler && closeLoseAlertHandler(true)}
        >
          Заново
        </button>
        <button
          className="lose-button"
          onClick={() => closeLoseAlertHandler && closeLoseAlertHandler(false)}
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default LoseAlert;

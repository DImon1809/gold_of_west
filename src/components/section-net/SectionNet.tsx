import { FC, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../store";

import DoubleRow from "../double-row/DoubleRow";

import "./SectionNet.scss";

const minFactors = [1.2, 1.5, 2, 2.5, 3].reverse();
const maxFactors = [2, 2.5, 3, 3.5, 4].reverse();

export interface ISectionNet {
  changeOpenAlertWinHandler: () => void;
}

const SectionNet: FC<ISectionNet> = ({ changeOpenAlertWinHandler }) => {
  const lose = useSelector((state: RootType) => state.gameData.lose);
  const countCell = useSelector((state: RootType) => state.gameData.countCell);

  const [count, setCount] = useState<number>(0);

  const incrementCount = (currentCount: number): void => {
    if (currentCount === count) setCount(count + 1);
  };

  useEffect(() => {
    if (count >= 5 && !lose) {
      changeOpenAlertWinHandler();
    }
  }, [count]);

  return (
    <section className="section-net">
      {count > 0 && (
        <div className="button-end-wrapper">
          <button
            onClick={() => {
              !lose && changeOpenAlertWinHandler();
            }}
          >
            Завершить игру
          </button>
        </div>
      )}

      {countCell === 1.2 &&
        minFactors.map((_l, index) => (
          <DoubleRow
            key={index}
            numberRow={minFactors.length - index - 1}
            currentCount={count}
            incrementCount={incrementCount}
            currentFactor={_l}
          />
        ))}

      {countCell === 2 &&
        maxFactors.map((_l, index) => (
          <DoubleRow
            key={index}
            numberRow={minFactors.length - index - 1}
            currentCount={count}
            incrementCount={incrementCount}
            currentFactor={_l}
          />
        ))}
    </section>
  );
};

export default SectionNet;

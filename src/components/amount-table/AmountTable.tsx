import { FC } from "react";

import { useSelector } from "react-redux";
import { RootType } from "../../store";

import "./AmountTable.scss";

const AmountTable: FC = () => {
  const amount = useSelector((state: RootType) => state.gameData.amount);

  return (
    <div className="amount-table">
      <h3>В данный момент на вашем счету: {amount} рублей</h3>
    </div>
  );
};

export default AmountTable;

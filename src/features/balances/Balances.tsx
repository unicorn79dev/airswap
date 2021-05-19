import { Fragment, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectBalances } from "./balancesSlice";
import classes from "./Balances.module.css";
import useTokenSet from "../../hooks/useTokenSet";
import { formatUnits } from "@ethersproject/units";

const Balances: FC<{}> = () => {
  const { active } = useWeb3React();
  const { tokenSet, addAddressToTokenSet: addSymbolToTokenSet } = useTokenSet();
  const balances = useAppSelector(selectBalances);

  const [addTokenField, setAddTokenField] = useState<string>("");

  return active ? (
    <div>
      <hr />
      <h4>Token Balances</h4>
      <div className={classes.balancesGrid}>
        {tokenSet.map((tokenInfo) => {
          const tokenBalance = balances.values[tokenInfo.address];
          return (
            <Fragment key={`${tokenInfo.address}-balance`}>
              <span className={classes.token}>{tokenInfo.symbol}:</span>
              <span className={classes.balance}>
                {tokenBalance != null
                  ? formatUnits(tokenBalance, tokenInfo.decimals)
                  : "fetching"}
              </span>
            </Fragment>
          );
        })}
      </div>
      <input
        type="text"
        onChange={(e) => {
          setAddTokenField(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          addSymbolToTokenSet(addTokenField);
          setAddTokenField("");
        }}
      >
        Add to token set
      </button>
      <hr />
    </div>
  ) : null;
};

export default Balances;

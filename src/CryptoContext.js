import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";

const Crypto = createContext();
function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "PKR") setSymbol("Rs");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
}

function CryptoState() {
  return useContext(Crypto);
}
export { CryptoContext, CryptoState };

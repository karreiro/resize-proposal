import { useState } from "react";
import "./App.sass";
import Boxed from "./Boxed";
import GlobalContext from "./GlobalContext";

function App() {
  const [cols, setCols] = useState([]);
  return (
    // [!] Init Global context
    <GlobalContext.Provider value={{ setCols, cols }}>
      <div className="resize-proposal">
        {Boxed("Context", [
          Boxed("Relation"),
          Boxed("Context", [
            Boxed("Literal"),
            Boxed("Context", [
              Boxed("Literal"),
              Boxed("Literal"),
              Boxed("Literal"),
            ]),
            Boxed("Literal"),
          ]),
        ])(0)}
      </div>
    </GlobalContext.Provider>
  );
}

export default App;

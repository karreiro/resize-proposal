import React from "react";

// [!] Maybe we could try to use a map here
const GlobalContext = React.createContext({
  setCols: (e) => {},
  cols: {},
});

export default GlobalContext;

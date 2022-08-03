import { useState, useEffect } from "react";

import strings, { addLoadedListener } from ".";

export function useStrings(){
  const [
    stringsContainer, setStringsContainer
  ] = useState({ strings });


  useEffect(() => {
    addLoadedListener(() => {
      setStringsContainer({ strings })
    })
  }, [])

  return stringsContainer.strings;
}
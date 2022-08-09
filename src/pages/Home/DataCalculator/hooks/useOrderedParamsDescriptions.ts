

// consider switch to context or props
import { useEffect, useState } from "react";
import myMHRCalculator from "../model/App";

export default function useOrderedParamsDescriptions(){
  const [ descs, setDescs ] = useState(() => (
    [ ...myMHRCalculator.params_desc.get() ]
  ));

  useEffect(() => {
    const add = (id: string) => {
      console.log("add", id, descs);
      setDescs([ ...descs, id ])
    }
    const update = () => {}
    const remove = (id: string) => {
      setDescs([ ...descs.filter(_id => _id !== id) ])
      console.log("remove", id, descs, descs.filter(_id => _id !== id));
    }

    myMHRCalculator.params_desc.on("add", add);
    myMHRCalculator.params_desc.on("remove", remove);

    return () => {
      myMHRCalculator.params_desc.off("add", add);
      myMHRCalculator.params_desc.off("remove", remove);
    }

  }, [])

  console.log(descs);


  return {
    descs,
    setDescs,
  }
}
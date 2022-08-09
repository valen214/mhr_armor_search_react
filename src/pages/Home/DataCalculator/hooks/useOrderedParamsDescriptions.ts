

// consider switch to context or props
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import myMHRCalculator from "../model/App";

export default function useOrderedParamsDescriptions(){
  const [ defaultDescs ] = useState(() => (
    [ ...myMHRCalculator.params_desc.get() ]
  ));
  const descsRef = useRef(defaultDescs);

  const descs = useSyncExternalStore(
    onStoreChange => {

      const add = (id: string) => {
        descsRef.current = [ ...descsRef.current, id ];
        onStoreChange();
      }
      const update = () => {}
      const remove = (id: string) => {
        descsRef.current = descsRef.current.filter(_id => _id !== id)
        onStoreChange();
        // console.log("remove", id, descs, descs.filter(_id => _id !== id));
      }
  
      myMHRCalculator.params_desc.on("add", add);
      myMHRCalculator.params_desc.on("remove", remove);

      return () => {

        myMHRCalculator.params_desc.off("add", add);
        myMHRCalculator.params_desc.off("remove", remove);
      }
    },
    () => descsRef.current
  )



  return {
    descs,
  }
}
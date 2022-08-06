import {
  useEffect, useState, useSyncExternalStore, useRef,
} from "react";
import {
  getSkillsProfiles,
  DEFAULT_CALCULATOR,
  getStatProfiles,
  StatProfile
} from "../../../lib/search_algo";



export function useSkillsProfiles(){
  const skillsProfiles = useSyncExternalStore(
    (onStoreChange) => {
      DEFAULT_CALCULATOR.on("profiles change", onStoreChange);
      return () => {
        DEFAULT_CALCULATOR.off("profiles change", onStoreChange);
      }
    },
    () => getSkillsProfiles()
  )

  return skillsProfiles;
}

export function useStatProfile(id: string){
  // const listenerContainer = useRef(() => {});

  const statProfiles = useSyncExternalStore(
    (onStoreChange) => {
      const listener = (_id: string) => {
        if(id === _id){
          onStoreChange();
        }
      };
      DEFAULT_CALCULATOR.on("stat profile update", listener);
      return () => {
        DEFAULT_CALCULATOR.off("stat profile update", listener);
      }
    },
    () => getStatProfiles().get(id)
  )

  return statProfiles;
}

export function useStatProfiles(){
  const statProfRef = useRef<{
    statProfiles: Map<string, StatProfile<any>>
  }>({
    statProfiles: DEFAULT_CALCULATOR.getStatProfiles()
  });
  const { statProfiles } = useSyncExternalStore(
    (onStoreChange) => {
      const statProfChangeListener = () => {
        console.assert(
            statProfRef.current.statProfiles ===
            DEFAULT_CALCULATOR.getStatProfiles(),
            "statProfChangeListener: ref value unmatch",
        );
        console.log(
          "statProfChangeListener:",
          DEFAULT_CALCULATOR.getStatProfiles()
        );
        statProfRef.current = {
          statProfiles: DEFAULT_CALCULATOR.getStatProfiles()
        };
        onStoreChange();
      };

      DEFAULT_CALCULATOR.on(
        "stat profiles change",
        statProfChangeListener
      );
      return () => {
        DEFAULT_CALCULATOR.off(
          "stat profiles change",
          statProfChangeListener
        );
      }
    },
    () => statProfRef.current
  )

  return statProfiles;
}
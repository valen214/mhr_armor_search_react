import {
  useEffect, useState, useSyncExternalStore, useRef,
} from "react";
import {
  getSkillsProfiles,
  DEFAULT_CALCULATOR,
  getStatProfiles,
  StatProfile,
  SkillsProfile
} from "../../../lib/search_algo";



export function useSkillsProfiles(){
  const skillsProfRef = useRef<SkillsProfile[]>(
    DEFAULT_CALCULATOR.getSkillsProfiles()
  );
  const skillsProfiles = useSyncExternalStore(
    (onStoreChange) => {
      const skillsProfChangeListener = () => {
        skillsProfRef.current = [
          ...DEFAULT_CALCULATOR.getSkillsProfiles()
        ];
        onStoreChange();
      };

      DEFAULT_CALCULATOR.on(
        "profiles change",
        skillsProfChangeListener
      );
      return () => {
        DEFAULT_CALCULATOR.off(
          "profiles change",
          skillsProfChangeListener
        );
      }
    },
    () => skillsProfRef.current
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
  const statProfRef = useRef<
    Map<string, StatProfile<any>>
  >(
    DEFAULT_CALCULATOR.getStatProfiles()
  );
  const statProfiles = useSyncExternalStore(
    (onStoreChange) => {
      const statProfChangeListener = () => {
        statProfRef.current = new Map(
          DEFAULT_CALCULATOR.getStatProfiles()
        );
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
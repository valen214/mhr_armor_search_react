import {
  useEffect, useState, useSyncExternalStore
} from "react";
import {
  getSkillsProfiles,
  DEFAULT_CALCULATOR,
  getStatProfiles
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


export function useStatProfiles(){
  const statProfiles = useSyncExternalStore(
    (onStoreChange) => {
      DEFAULT_CALCULATOR.on("stat profiles change", onStoreChange);
      return () => {
        DEFAULT_CALCULATOR.off("stat profiles change", onStoreChange);
      }
    },
    () => getStatProfiles()
  )

  return statProfiles;
}
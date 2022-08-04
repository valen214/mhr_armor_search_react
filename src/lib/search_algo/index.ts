

export type { Skills } from "./types"

export * from "./calculator";


import { DEFAULT_CALCULATOR } from "./calculator";


let {
  removeSkillsProfile,
  getSkillsProfiles,
  addSkillsProfile,
  getStatProfiles,
  addStatProfile,
} = DEFAULT_CALCULATOR;
removeSkillsProfile = removeSkillsProfile.bind(DEFAULT_CALCULATOR);
getSkillsProfiles = getSkillsProfiles.bind(DEFAULT_CALCULATOR);
addSkillsProfile = addSkillsProfile.bind(DEFAULT_CALCULATOR);
getStatProfiles = getStatProfiles.bind(DEFAULT_CALCULATOR);
addStatProfile = addStatProfile.bind(DEFAULT_CALCULATOR);
export {
  removeSkillsProfile,
  getSkillsProfiles,
  addSkillsProfile,
  getStatProfiles,
  addStatProfile,
  DEFAULT_CALCULATOR
}
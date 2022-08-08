

export type Skills = { [skillId: number | string]: number }

/*
https://game.capcom.com/manual/MHRISE/en/switch/page/9/3
https://mhrise.kiranico.com/zh-Hant/data/skills
https://monsterhunterrise.wiki.fextralife.com/Demondrug
*/


export type ParamsType = Partial<{
  "weapon_phy": number
  "petalaces": number
  "motion_value_phy": number
  "absorption_phy": number
  "sharpness_phy": number

  "weapon_elem": number
  "motion_value_elem": number
  "absorption_elem": number
  "sharpness_elem": number

  "powercharm": boolean
  "powertalon": boolean
  [ param: string ]: any
}>

export type WorkerArgType = {
  skills?: Skills,
  params?: ParamsType;
}



export type Skills = { [skillId: number | string]: number }


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

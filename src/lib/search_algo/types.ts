

export type Skills = { [skillId: number | string]: number }


export type ParamsType = Partial<{
  "weapon_phy": number
  "petalaces": number
  "motion_value_phy": number
  "absorption_phy": number
  "sharpness_phy": number



  [name: string]: any
}>


export type ConditionalTypes = Partial<{
  "powercharm": boolean
  "powertalon": boolean
  [ condition: string ]: boolean
}>

export type WorkerArgType = {
  skills?: Skills,
  params?: ParamsType;
  conditionals?: ConditionalTypes
}


import type { IStrings } from ".";


export function translateSkills(
  strings: IStrings,
  skills: { [k: string]: number }
){
  
  let out: any = {};

  for(let [k, v] of Object.entries(skills)){
    if(v){
      out[strings.getSkill(k)] = v;
    }
  }
  return out;
}
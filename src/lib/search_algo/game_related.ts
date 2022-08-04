import type { ParamsType, Skills, WorkerArgType } from "./types";


export function crit(arg: WorkerArgType){
  let { skills, conditionals, params } = arg;

  let crit = 0;

  if(skills){
    crit += [ 0, 3, 5, 7, 10, 15 ][ skills[2] ] || 0;
    crit += [ 0, 15, 30, 50 ][ skills[8] ] || 0;
    crit += [ 0, 10, 20, 30, 40, 50 ][ skills[9] ] || 0;
    crit += [ 0, 10, 20, 30 ][ skills[10] ] || 0;
    crit += [ 0, 20, 25, 25 ][ skills[117] ] || 0;
    crit += [ 0, 20, 25, 25 ][ skills[125] ] || 0; // 攻勢 ???
  }

  return `${crit}`;
}


export function status_phy({
  skills,
  conditionals,
  params
}: WorkerArgType){
  let phy = params?.["weapon_phy"] || 0;

  switch(skills && skills[1]){ // atk
  case 1: phy += 3; break;
  case 2: phy += 6; break;
  case 3: phy += 9; break;
  case 4: phy *= 1.05; phy += 7; break;
  case 5: phy *= 1.06; phy += 8; break;
  case 6: phy *= 1.08; phy += 9; break;
  case 7: phy *= 1.10; phy += 10; break;
  }

  phy += params?.petalaces || 0;

  if(conditionals?.powercharm) phy += 6;
  if(conditionals?.powertalon) phy += 9;

  return phy;
}

export function damage_number_phy(arg: WorkerArgType){
  let { skills, conditionals, params } = arg;
  let phy = status_phy(arg);

  for(let req_param of [
    "motion_value_phy",
    "sharpness_phy",
    "absorption_phy",
  ]){
    if(!params?.[req_param]){
      return "no " + req_param;
    }
  }

  let motion_value_phy = params!.motion_value_phy!;
  let sharpness_phy = params!.sharpness_phy!;
  let absorption_phy = params!.absorption_phy!;


  return (
    phy * sharpness_phy *
    motion_value_phy / 100 *
    absorption_phy / 100
  );
}

export function status_elem(arg: WorkerArgType){
  let { skills, conditionals, params } = arg;
  let elem = params?.["weapon_elem"] || 0;

  return elem;
}
export function damage_number_elem(arg: WorkerArgType){
  let { skills, conditionals, params } = arg;

  let elem = status_elem(arg);

  let motion_value_elem = params!.motion_value_elem!;
  let sharpness_elem = params!.sharpness_elem!;
  let absorption_elem = params!.absorption_elem!;


  return (
    elem * sharpness_elem *
    motion_value_elem *
    absorption_elem / 100
  );
}

export default {
  status_phy,
  damage_number_phy
}


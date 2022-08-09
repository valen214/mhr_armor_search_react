import type { ParamsType, Skills, WorkerArgType } from "./types";
// https://kuroyonhon.com/mhrise/d/dame.php


export function crit(arg: WorkerArgType){
  let { skills, params } = arg;

  let crit = 0;

  if(skills){
    crit += [ 0, 3, 5, 7, 10, 15 ][ skills[2] ] || 0;
    crit += [ 0, 5, 10, 15, 20, 25, 30, 40 ][ skills[6] ] || 0;
    crit += [ 0, 15, 30, 50 ][ skills[8] ] || 0;
    crit += [ 0, 10, 20, 30, 40, 50 ][ skills[9] ] || 0;
    crit += [ 0, 10, 20, 30 ][ skills[10] ] || 0;
    crit += [ 0, 20, 25, 25 ][ skills[117] ] || 0;
    crit += [ 0, 20, 25, 25 ][ skills[125] ] || 0; // 攻勢 ???
  }

  crit += params?.weapon_crit || 0;

  return crit;
}


export function status_phy({
  skills,
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

  phy += [0, 4, 8, 12, 16, 20][skills?.[2] || 0] || 0 // agitator
  phy += [0, 5, 10, 20][skills?.[3] || 0] || 0 // max performance
  phy += [0, 5, 10, 15, 20, 25][skills?.[4] || 0] || 0 // resentment
  phy += [0, 5, 10, 20][skills?.[5] || 0] || 0 // resuscitate
  phy += [0, 10, 15, 25][skills?.[106] || 0] || 0 // counterstrike
  phy += [0, 0, 0, 0][skills?.[116] || 0] || 0 // coalescence
  phy += [0, 10, 12, 15][skills?.[131] || 0] || 0 // chain hit


  phy += params?.petalaces || 0;

  if(params?.powercharm) phy += 6;
  if(params?.powertalon) phy += 9;

  if(params?.demondrug) phy += params.demondrug;

  return phy;
}

export function damage_number_phy(arg: WorkerArgType){
  let { skills, params } = arg;
  let phy = status_phy(arg);

  for(let req_param of [
    "motion_value_phy",
    "sharpness_phy",
    "absorption_phy",
  ]){
    if(!params?.[req_param]){
      throw new Error(
          "damage_number_phy(): " + req_param +
          "is required but not defined"
      );
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

/*

八捨九入(八捨九入(八捨九入(属性値ｘ太刀の練気ゲージｘ
  属性強化乗算補正＋属性強化加算部分)ｘ弓溜め補正)ｘ属性攻撃力UP旋律)
ここまでで一定値以上の属性値にならない？
※属性弾の属性値は八捨九入しない

missing long sword multi, bow multi, HH song multi
missing round function
*/
export function status_elem(arg: WorkerArgType){
  let { skills, params } = arg;
  let elem = params?.["weapon_elem"] || 0;

  let max_elem_lv = 0;
  for(let i = 13; i <= 17; ++i){
    if((skills?.[i] || 0) > max_elem_lv){
      max_elem_lv = skills?.[i]!;
    }
  }
  max_elem_lv = max_elem_lv > 5 ? 5 : max_elem_lv;
  elem *= [1, 1, 1, 1.05, 1.1, 1.2][max_elem_lv];
  elem += [0, 2, 3,    4,   4,   4][max_elem_lv];

 
  return elem;
}
export function damage_number_elem(arg: WorkerArgType){
  let { skills, params } = arg;

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


export function damage_when_crit(arg: WorkerArgType){
  let { skills, params } = arg;

  let phy = damage_number_phy(arg);
  phy *= [ 1.25, 1.30, 1.35, 1.40 ][skills?.[7] || 0]

  let elem = damage_number_elem(arg);
  elem *= [ 1.00, 1.05, 1.10, 1.15 ][skills?.[11] || 0]

  return phy + elem;
}



// might add negative crit;
export function expected_damage_with_crit(arg: WorkerArgType){
  let { skills, params } = arg;


  let crit_rate = Math.min(crit(arg), 100) / 100.0;

  let when_crit = damage_when_crit(arg);
  let no_crit = damage_number_phy(arg) + damage_number_elem(arg);

  return (1 - crit_rate) * no_crit + crit_rate * when_crit;
}


export default {
  status_phy,
  damage_number_phy
}


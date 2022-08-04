import type { ParamsType, Skills } from "./types";


export function damage_number_phy({
  skills,
  prof
}: {
  skills?: Skills
  prof?: {
    params: ParamsType
  }
}){
  let phy = prof?.params?.["weapon_phy"] || 0;

  switch(skills && skills[1]){ // atk
  case 1: phy += 3; break;
  case 2: phy += 6; break;
  case 3: phy += 9; break;
  case 4: phy *= 1.05; phy += 7; break;
  case 5: phy *= 1.06; phy += 8; break;
  case 6: phy *= 1.08; phy += 9; break;
  case 7: phy *= 1.10; phy += 10; break;
  }

  return phy;
}
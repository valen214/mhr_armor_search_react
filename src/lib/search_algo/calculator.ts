

import { EventEmitter } from "events";
import type TypedEmitter from "typed-emitter"
import WorkerWrapper from "../my_components/src/util/WorkerWrapper";
import type { Skills } from "./types";


export class SkillsProfile
{
  static count = 0;

  readonly id: string;
  name: string;
  skills: Skills;

  constructor(skills: Skills){
    this.id = crypto.randomUUID();
    let self_skills: Skills = this.skills = {};
    for(let [ s, v ] of Object.entries(skills)){
      if(v) self_skills[s] = v;
    }

    this.name = "profile " + (++SkillsProfile.count);
  }
}
export class StatProfile<R>
{
  readonly id: string;
  name?: string;
  worker: WorkerWrapper<Skills, R>;
  constructor(func: (skills: Skills) => R, name?: string){
    this.id = crypto.randomUUID();
    this.name = name;
    this.worker = new WorkerWrapper(func);
  }
}

/*
declare function addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
declare function addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;

interface WindowEventMap extends GlobalEventHandlersEventMap, WindowEventHandlersEventMap {
    "DOMContentLoaded": Event;
    "devicemotion": DeviceMotionEvent;
    "deviceorientation": DeviceOrientationEvent;
    "gamepadconnected": GamepadEvent;
    "gamepaddisconnected": GamepadEvent;
    "orientationchange": Event;
}



*/

export type EventMap = {
  [key: string]: (...args: any[]) => void
}

export class MHRCalculator extends (EventEmitter as new () => TypedEmitter<{
  "profiles change": () => void
  "stat profiles change": () => void
}>) {

  skills_profiles: SkillsProfile[] = [];
  stat_profiles: Map<string, StatProfile<any>> = new Map();

  constructor(
    default_skills_profiles?: SkillsProfile[],
    default_stat_profiles?: StatProfile<any>[],
  ){
    super();

    if(default_skills_profiles){
      this.skills_profiles = default_skills_profiles;
    }
    if(default_stat_profiles){
      for(let prof of default_stat_profiles){
        this.stat_profiles.set(prof.id, prof);
      }
    }
  }

  getSkillsProfiles(){
    return this.skills_profiles;
  }
  addSkillsProfile(skills: Skills){
    this.skills_profiles.push(new SkillsProfile(skills));

    localStorage.setItem(
      "skills_profiles",
      JSON.stringify(this.skills_profiles)
    );

    this.emit("profiles change");
  }

  
  getStatProfile(id: string){
    return this.stat_profiles.get(id);
  }

  getStatProfiles(){
    return this.stat_profiles;
  }
  addStatProfile(func: (skills: Skills) => any){
    let prof = new StatProfile(func);
    this.stat_profiles.set(prof.id, prof);

    this.emit("stat profiles change");
  }
}


/*

https://gist.github.com/dmnsgn/4a6ad76de1b5928f13f68f406c70bb09?
permalink_comment_id=3470400#gistcomment-3470400
*/

let storedProfiles = (() => {
  let json = localStorage.getItem("skills_profiles");
  try{
    if(json){
      return JSON.parse(json);
    }
  } catch(e){
    console.error(e);
  }
  return [];
})();
// https://ngabbs.com/read.php?tid=32584513
let storedStatProfiles = (() => {
  return [
    new StatProfile((skills) => {
      let crit = 0;
      crit += [ 0, 3, 5, 7, 10, 15 ][ skills[2] ] || 0;
      crit += [ 0, 15, 30, 50 ][ skills[8] ] || 0;
      crit += [ 0, 10, 20, 30, 40, 50 ][ skills[9] ] || 0;
      crit += [ 0, 10, 20, 30 ][ skills[10] ] || 0;
      crit += [ 0, 20, 25, 25 ][ skills[117] ] || 0;
      crit += [ 0, 20, 25, 25 ][ skills[125] ] || 0; // 攻勢 ???

      return `${crit}`;
    }),
    new StatProfile((skills) => {
      let phy = 0, elem = 0;
      
      let weapon = [ 330, 52 ];
      [ phy, elem ] = weapon;



      switch(skills[1]){
      case 1: phy += 3; break;
      case 2: phy += 6; break;
      case 3: phy += 9; break;
      case 4: phy *= 1.05; phy += 7; break;
      case 5: phy *= 1.06; phy += 8; break;
      case 6: phy *= 1.08; phy += 9; break;
      case 7: phy *= 1.10; phy += 10; break;
      }

      let petalaces = 20; // or 15
      phy += 6 + 9 + petalaces;

      let motion_value = [ 10, 1 ]; // 10 => 41, 8 => 35
      let absorption = [ 60, 20 ];
      let sharpness = [ 1.32, 1.15 ]

      let dmg = [
        phy * motion_value[0] / 100 * absorption[0] / 100 * sharpness[0],
        elem * motion_value[1] * absorption[1] / 100 * sharpness[1]
      ];

      

      return (
        `${Math.trunc(phy)}/${elem.toFixed(1)} =>  ` +
        `${Math.round(dmg[0] + dmg[1])} (${dmg[1].toFixed(1)})`
      );
    }),
  ];
})();
export const DEFAULT_CALCULATOR = new MHRCalculator(
  storedProfiles,
  storedStatProfiles,
);


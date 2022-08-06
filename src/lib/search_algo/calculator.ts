

import { EventEmitter } from "events";
import type TypedEmitter from "typed-emitter"

import WorkerWrapper from "../my_components/src/util/WorkerWrapper";

import type { WorkerArgType, Skills } from "./types";
import { crit, damage_number_elem, damage_number_phy, status_elem, status_phy } from "./game_related";

export class SkillsProfile
{
  static count = 0;

  readonly id: string;
  name: string;
  skills: Skills;

  constructor(skills: Skills){
    this.id = (
      // crypto?.randomUUID() ||
      String(++SkillsProfile.count)
    );
    let self_skills: Skills = this.skills = {};
    for(let [ s, v ] of Object.entries(skills)){
      if(v) self_skills[s] = v;
    }

    this.name = "profile " + (++SkillsProfile.count);
  }
}
export class StatProfile<R>
{
  private static count = 0;

  readonly id: string;
  name?: string;
  private worker: WorkerWrapper<WorkerArgType, R>;

  constructor(
    func: ((arg: WorkerArgType) => R) | string,
    name?: string,
  ){
    this.id = (
      // crypto?.randomUUID() || 
      String(++StatProfile.count)
    );
    this.name = name;
    this.worker = new WorkerWrapper(func);
  }

  public calc(arg: Partial<WorkerArgType>){
    let _arg: WorkerArgType = {
      params: {},
      skills: {},
      ...arg,
    };

    _arg = JSON.parse(JSON.stringify(_arg));

    return this.worker.postMessage(_arg);
  }

  public resetWorker(){
    this.worker.resetWorker();
  }
}

export default class MHRCalculator
extends (EventEmitter as new () => TypedEmitter<{
  "profiles change": () => void
  "stat profiles change": () => void

  "stat profile update": (id: string) => void
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
  removeSkillsProfile(arg: string | SkillsProfile){
    console.log("?????", arg)

    for(let i = 0; i < this.skills_profiles.length; ++i){
      let found = false;
      let prof = this.skills_profiles[i];
      if(prof.id === arg){
        found = true;
      } else if(prof === arg){
        found = true;
      }

      if(found){
        this.skills_profiles.splice(i, 1);
        this.skills_profiles = [ ...this.skills_profiles ];
        this.emit("profiles change");
        break;
      }
    }
  }

  getStatProfileByName(name: string){
    for(let prof of this.stat_profiles.values()){
      if(prof.name === name){
        return prof;
      }
    }
  }
  getStatProfile(id: string){
    return this.stat_profiles.get(id);
  }
  getStatProfiles(){
    return this.stat_profiles;
  }
  addStatProfile<R>(func: (arg: WorkerArgType) => R){
    let prof = new StatProfile(func);
    this.stat_profiles.set(prof.id, prof);

    this.emit("stat profiles change");
  }
}


/*

https://gist.github.com/dmnsgn/4a6ad76de1b5928f13f68f406c70bb09?
permalink_comment_id=3470400#gistcomment-3470400
*/

// console.log(status_phy.toString(), damage_number_phy.toString());
console.log(import.meta.url);

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
    new StatProfile(crit, "Crit"),
    new StatProfile(((arg: WorkerArgType) => {
      // @ts-ignore
      let phy = _damage_number_phy(arg)

      // @ts-ignore
      let elem = _damage_number_elem(arg)

      return (
        `${Math.round(phy + elem)} (${elem.toFixed(1)})`
      );
    }).toString() + [
      `;`,
      `const status_phy = ${status_phy};`,
      `const _damage_number_phy = ${damage_number_phy};`,

      `const status_elem = ${status_elem};`,
      `const _damage_number_elem = ${damage_number_elem};`,
    ].join(""), "Total Damage", ),
  ];
})();
export const DEFAULT_CALCULATOR = new MHRCalculator(
  storedProfiles,
  storedStatProfiles,
);


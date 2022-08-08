

import { EventEmitter } from "events";
import type TypedEmitter from "typed-emitter"

import WorkerWrapper from "mylib/util/WorkerWrapper";

import type { WorkerArgType, Skills } from "./types";
import {
  crit, damage_number_elem,
  damage_number_phy, status_elem, status_phy
} from "./game_related";

export class SkillsProfile
{
  static count = 0;

  readonly id: string;
  name: string;
  skills: Skills;


  constructor(skills: Skills, name?: string){
    this.id = (
      crypto?.randomUUID?.() ||
      String(++SkillsProfile.count)
    );
    let self_skills: Skills = this.skills = {};
    for(let [ s, v ] of Object.entries(skills)){
      if(v) self_skills[s] = v;
    }

    if(name){
      this.name = name;
    } else{
      this.name = "profile " + (++SkillsProfile.count);
    }
  }
}
export class StatProfile<R>
{
  private static count = 0;

  readonly id: string;
  name?: string;
  private _worker: WorkerWrapper<WorkerArgType, R>;
  public get worker(){
    return this._worker;
  }

  constructor(
    func: ((arg: WorkerArgType) => R) | string,
    name?: string,
  ){
    this.id = (
      crypto?.randomUUID?.() || 
      String(++StatProfile.count)
    );
    this.name = name;
    this._worker = new WorkerWrapper(func);
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

  public destroy(){
    this.worker.terminate();
  }
  public resetWorker(){
    return this.worker.resetWorker();
  }

  public export(){
    return {
      id: this.id,
      name: this.name,
      worker_src: this.worker.input_src,
    };
  }
  public toString(){
    return JSON.stringify(this.export())
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

  export(){
    return ({
      skills_profiles: this.skills_profiles,
      stat_profiles: [
        ...this.stat_profiles.values()
      ].map(prof => {
        return prof.export()
      })
    })
  }
  importFrom(calc: {
    skills_profiles: SkillsProfile[]
    stat_profiles: {
      id: string;
      name: string | undefined;
      worker_src: string;
    }[]
  }){
    this.skills_profiles.length = 0;
    for(let inProf of calc.skills_profiles){
      let prof = new SkillsProfile(inProf.skills, inProf.name);
      // @ts-ignore
      prof.id = inProf.id;
      this.skills_profiles.push(prof);
    }

    for(let prof of this.stat_profiles.values()){
      prof.destroy();
    }
    this.stat_profiles.clear();
    for(let inProf of calc.stat_profiles){
      let prof = new StatProfile(
        inProf.worker_src,
        inProf.name
      );
      // @ts-ignore
      prof.id = inProf.id;
      this.stat_profiles.set(prof.id, prof);
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
  addStatProfile<R>(
    arg: string | ((arg: WorkerArgType) => R),
    name: string
  ){
    let prof = new StatProfile(arg, name);
    this.stat_profiles.set(prof.id, prof);

    this.emit("stat profiles change");
  }
  removeStatProfile(arg: string | StatProfile<any>){
    let id = typeof arg === "string" ? arg : arg.id;
    this.stat_profiles.delete(id);
    
    this.emit("stat profiles change");
  }
}


/*

https://gist.github.com/dmnsgn/4a6ad76de1b5928f13f68f406c70bb09?
permalink_comment_id=3470400#gistcomment-3470400
*/

// console.log(status_phy.toString(), damage_number_phy.toString());
// console.log(import.meta.url);

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
    new StatProfile('(' + (
    (_dnp: typeof damage_number_phy,
    _dne: typeof damage_number_elem) => (arg: WorkerArgType) => {
      let phy = _dnp(arg)
      let elem = _dne(arg)

      return (
        `${
          typeof phy === "number"?
          Math.round(phy + elem) : phy
        } (${elem.toFixed(1)})`
      );
    }).toString() +
    `)(${damage_number_phy}, ${damage_number_elem});` + [
      `;`,
      `${status_phy};`,
// `${damage_number_phy};`, `const _dnp = ${damage_number_phy.name};`,
      `${status_elem};`, 
// `${damage_number_elem};`, `const _dne = ${damage_number_elem.name};`,
    ].join(""), "Total Damage"),
  ];
})();
export const DEFAULT_CALCULATOR = new MHRCalculator(
  storedProfiles,
  storedStatProfiles,
);


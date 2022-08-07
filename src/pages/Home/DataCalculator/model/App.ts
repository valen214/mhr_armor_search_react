import { randomstring } from "../../../../lib/my_components/src/util/string"
import WorkerWrapper from "../../../../lib/my_components/src/util/WorkerWrapper";
import { Skills } from "../../../../lib/search_algo"
import { WorkerArgType } from "../../../../lib/search_algo/types";



export class ProfileDescription
{
  private static id_prefix = randomstring(16);
  private static count = 0;
  private static getNewId(){
    return `${this.id_prefix} (${++this.count})`;
  }

  // https://www.typescriptlang.org/docs/handbook/decorators.html
  private _id: string;
  public get id(){ return this._id; }
  
  private _name: string
  public get name(){ return this._name; }

  private _skills: Skills
  public get skills(){ return this._skills; }


  // let a = new ProfileDescription();
  // let b = new ProfileDescription({ ...a, id: undefined });
  constructor({
    id, name = "", skills = {},
  }: {
    id?: string
    name?: string
    skills?: Skills
  } = {}){
    this._id = id || ProfileDescription.getNewId();
    
    if(name){
      this._name = name;
    } else{
      this._name = "profile " + this._id.slice(-4);
    }

    let self_skills: Skills = this._skills = {};
    for(let [ s, v ] of Object.entries(skills)){
      if(v) self_skills[s] = v;
    }
  }
}

export class DataDescription<R>
{
  private static id_prefix = randomstring(16);
  private static count = 0;
  private static getNewId(){
    return `${this.id_prefix} (${++this.count})`;
  }

  private _id: string;
  public get id(){ return this._id; }
  
  private _name: string
  public get name(){ return this._name; }

  private _func_src: string
  public get func_src(){ return this._func_src; }

  private _worker: WorkerWrapper<WorkerArgType, R>;
  

  constructor({
    id, name = "", func_src = "",
  }: {
    id?: string
    name?: string
    func_src?: string
  } = {}){
    this._id = id || DataDescription.getNewId();
    this._name = name;
    this._func_src = func_src;
    this._worker = new WorkerWrapper(func_src);
  }

  public calc(arg: Partial<WorkerArgType>){
    let _arg: WorkerArgType = {
      params: {},
      skills: {},
      ...arg,
    };

    _arg = JSON.parse(JSON.stringify(_arg));

    return this._worker.postMessage(_arg);
  }
  public destroy(){
    this._worker.terminate();
  }
  public resetWorker(func_src?: string){
    return this._worker.resetWorker(func_src);
  }


  public export(){
    return {
      id: this.id,
      name: this.name,
      func_src: this.func_src,
    };
  }
}





export class MHRCalculatorApp
{

  getParamsDescriptions(){
    
  }

  getDataDescriptions(){

  }

  getDataEntries(){

  }

  getProfilesEntries(){
  }
}
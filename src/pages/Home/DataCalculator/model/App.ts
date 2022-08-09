
import EventEmitter from "events";
import type TypedEmitter from "typed-emitter"

import { randomstring } from "mylib/util/string"
import WorkerWrapper from "mylib/util/WorkerWrapper";
import { Skills } from "../../../../lib/search_algo"
import type { ParamsType, WorkerArgType } from "../../../../lib/search_algo/types";

import { ParamsDescriptionType } from "./types";
import { DEFAULT_PARAMS_DESCRIPTIONS } from "./default_values";



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
  public dispose(){
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


class SubscriptableDataClass<T extends { id: string }>
extends (EventEmitter as new () => TypedEmitter<{
  "change": () => void

  "add": (id: string) => void
  "update": (id: string) => void
  "remove": (id: string) => void
}>)
{
  private id_prefix = crypto.randomUUID?.() || randomstring(16);
  private count = 0;
  private genId(){ return `${this.id_prefix} (${++this.count})`; }

  private store: Map<string, T> = new Map();

  private _addAll(arr?: Array<Omit<T, "id"> & { id?: string }>){
    if(arr){
      for(let obj of arr){
        let out = Object.assign({}, obj, {
          id: obj.id ?? this.genId()
        }) as T; // https://github.com/microsoft/TypeScript/issues/35858

        this.store.set(out.id, out);
      }
    }
  }

  constructor(arr?: Array<Omit<T, "id"> & { id?: string }>){
    super();

    this._addAll(arr);
    for(let id of this.store.keys()){
      this.emit("add", id);
    }
  }

  get(): IterableIterator<string>;
  get(id: string): T | undefined;
  get(id?: string){
    if(id){
      return this.store.get(id);
    } else{
      return this.store.keys();
    }
  }

  set(obj: T){
    this.store.set(obj.id, obj);
    this.emit("update", obj.id);
  }
  add(obj: Omit<T, "id"> & { id?: string }){
    let a: T = {
      ...obj,
      id: obj.id ?? this.genId(),
    } as T;
    this.store.set(a.id, a);
    this.emit("add", a.id);
  }
  delete(arg: string | T){
    let id = typeof arg === "string" ? arg : arg.id;
    this.emit("remove", id);
    this.store.delete(id);
  }

  reset(arr?: Array<Omit<T, "id"> & { id?: string }>){
    for(let id of this.store.keys()){
      this.delete(id);
    }

    if(this.store.size){
      console.error("not all entries are removed");
      this.store.clear();
    }

    if(arr){
      for(let obj of arr){
        this.add(obj);
      }
    }
  }

  
  doExport(){
    return [ ...this.store.values() ];
  }
}



export class MHRCalculator
{
  private _params_desc = new SubscriptableDataClass<ParamsDescriptionType> ();
  get params_desc(){ return this._params_desc; }

  constructor(){

  }

  getDataDescriptions(){

  }

  getDataEntries(){

  }

  getProfilesEntries(){
  }

  doExport(){

  }
}

const myMHRCalculator = new MHRCalculator();
myMHRCalculator.params_desc.reset(DEFAULT_PARAMS_DESCRIPTIONS);
export default myMHRCalculator;
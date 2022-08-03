

import { EventEmitter } from "../my_components/src/util/EventEmitter";
import type { Skills } from "./types";

export class SkillsProfile
{
  skills: Skills;

  constructor(skills: Skills){
    this.skills = Object.assign({}, skills);
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

export class DamageCalculator<M> implements EventEmitter<{
// event: listener signature
  "load": () => void
  "add profile": () => void
  "profiles change": () => void
}>
{
  private listeners: Map<keyof EventMap, Array<EventMap[keyof EventMap]>> = {} as any

  on<E extends keyof EventMap>(event: E, func: EventMap[E], option?: any){
    if(this.listeners.has(event)){
      this.listeners.get(event)?.push(func);
    } else{
      this.listeners.set(event, [ func ]);
    }
  }
  off<E extends keyof EventMap>(event: E, func: EventMap[E], option?: any){
    if(this.listeners.has(event)){
      let funcs = this.listeners.get(event)!;
      let i = funcs.indexOf(func);
      if(i >= 0){
        funcs.splice(i, 1);
      }
    }
  }
  emit<E extends keyof EventMap>(event: E, ...args: any[]){
    
    if(!this.listeners.has(event)) return;

    let funcs = this.listeners.get(event)!;
    for(let func of funcs){
      try{
        // @ts-ignore
        func(...args);
      } catch(e){
        console.error(e);
      }
    }
  }

  
  skills_profiles: SkillsProfile[] = [];

  getSkillsProfiles(){
    return this.skills_profiles;
  }
  addSkillsProfile(skills: Skills){
    this.skills_profiles.push(new SkillsProfile(skills));

    this.emit("")
  }
  addDamageProfile(){
  }
}


/*

https://gist.github.com/dmnsgn/4a6ad76de1b5928f13f68f406c70bb09?
permalink_comment_id=3470400#gistcomment-3470400
*/

export const DEFAULT_CALCULATOR = new DamageCalculator();

const {
  getSkillsProfiles,
  addSkillsProfile,
} = DEFAULT_CALCULATOR;
export {
  getSkillsProfiles,
  addSkillsProfile,
}

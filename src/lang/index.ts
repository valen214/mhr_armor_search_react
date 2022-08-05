
import LocalizedStrings, {
  LocalizedStringsMethods
} from 'react-localization';


/*

https://game.capcom.com/manual/MHRISE/en/switch/page/9/3
https://mhrise.kiranico.com/zh-Hant/data/skills


import common language only
fetch the rest after
*/

const DEFAULT_LOCALIZED_STRINGS = {
  en: {
    score: "Score",
    time: "HEY",
    quest: "Mission",
    item: "Item",
    battle_survival: "Battle(Survival)",
    resistance: "Resistance",
    parameter_change: "Parameter change",
    battle_elem_special: "Battle(Elem/Special)",
    battle_attack: "Battle(Attack)",
    battle_swordsman: "Battle(Swordsman)",
    battle_gunner: "Battle(Gunner)",
    set_skill: "Set Skill",
    general_purpose: "General Purpose",
  },
  it: {
    score: "Punti",
    time: "Tempo"
  },
  zh: {
    quest: "任務",
    item: "道具",
    battle_survival: "戰鬥（生存）",
    resistance: "耐性",
    parameter_change: "屬性變化",
    battle_elem_special: "戰鬥（屬性/異常狀態）",
    battle_attack: "戰鬥（攻擊）",
    battle_swordsman: "戰鬥(Swordsman)",
    battle_gunner: "戰鬥（Gunner）", // hmm U+ff09
    set_skill: "套裝技能",
    general_purpose: "通用鑲嵌槽",
  }
};



export interface _IStrings extends LocalizedStringsMethods {
  score: string;

  getSkill(id: number | string): string;
}
export type IStrings = _IStrings & typeof DEFAULT_LOCALIZED_STRINGS["en"]


const strings: IStrings = Object.assign(
  new LocalizedStrings<typeof DEFAULT_LOCALIZED_STRINGS["en"]>(
    DEFAULT_LOCALIZED_STRINGS as any
  ), {
    getSkill(skillId: number | string): string {
      let skillKey = "skill" + skillId;
      return (this as any)[skillKey]
          || (DEFAULT_LOCALIZED_STRINGS as any)[skillKey]
          || "Skill not exists";
    }
  }
);
export default strings;


const loadedListeners: Array<Function> = [];
let loaded = false;
export function addLoadedListener(listener: Function){
  loadedListeners.push(listener);
  if(loaded){
    try{
      listener();
    } catch(e){
      console.error(e);
    }
  } else{
  }
}
export function notifyLoaded(){
  loaded = true;
  for(let func of loadedListeners){
    try{
      func();
    } catch(e){
      console.error(e);
    }
  }
}

const STORED_SKILL_MAX_LEVEL = new Map<number, number> ();
export function getSkillMaxLevel(skillId: number){
  return STORED_SKILL_MAX_LEVEL.get(skillId);
}


function init(){
  Promise.allSettled([
    "/lang/skills_en.csv",
    "/lang/skills_zh.csv",
  ].map(url => fetch(url))
  ).then(results => {
    let out: { [lang: string]: Promise<string> } = {};
  
    for(let result of results){
      if(result.status === "fulfilled"){
        let value = result.value;
        let lang = value.url.match(/_([^.]+)\.csv/i);
        if(lang?.[1]){
          out[lang[1]] = result.value.text();
        }
      }
    }
  
    return out;
  }).then(async texts => {
    let out: { [lang: string]: { [skillId: string]: string } } = {}
    for(let entry of Object.entries(texts)){
      let skillsMap: { [skillId: string]: string } = {};
      
      (
        await entry[1]
      ).split("\n"
      ).map(line => line.split(",")
      ).forEach(arr => {
        let skillId = arr[0]
        let skillName = arr[1];
        if(skillName){
          skillsMap["skill" + skillId] = skillName.trim();
        }
  
        let maxLevel = arr[2];
        if(maxLevel){
          STORED_SKILL_MAX_LEVEL.set(
              parseInt(skillId),
              parseInt(maxLevel)
          );
        }
      });
      
      out[entry[0]] = skillsMap;
    }
  
    console.log(out);
    (window as any)["strings"] = strings;
  
    let transformedOut = Object.fromEntries(
      Object.entries(
        DEFAULT_LOCALIZED_STRINGS
      ).map(([lang, data]) =>
        [ lang, Object.assign({}, data, out[lang]) ]
      )
    );
    strings.setContent(transformedOut);
  
    console.log("lang.ts: extra csv loaded for strings");
    
    strings.setLanguage("zh");
    notifyLoaded();
  })
}
init();
// document.addEventListener("load", () => {
//   init();
// })
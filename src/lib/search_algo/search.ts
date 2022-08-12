




import { HasSkills, HasSlots, Skills } from "./types";

import decos from "./data/decos.json";

/* // generated with 
let a = new Set(ALL_SKILLS)
for(let deco of Object.values(decos)){
  for(let j of Object.keys(deco.skills_id)){
    a.delete(parseInt(j))
  }
}
console.log(JSON.stringify([...a]));
*/
export const SKILLS_NOT_ON_DECO = new Set([
  82,83,100,101,102,103,109,110,111,112,113,
  114,115,117,119,120,125,130,131,132,134
])


/* // LVn_DECO
;(() => {
  let c = {} as any;
  for(let deco of Object.values(decos)){
    if(deco.decoLv === 2){
      // @ts-ignore
      let [a, b] = Object.entries(deco.skills_id)[0];
      c[parseInt(a)] = b;
    }
  }
  console.log(Object.entries(c).map(([k,v])=>`${k}:${v}`).join(", "));
  console.log = () => {};
})();
/*****/
/* // only on
let ONLY_ON = 2
let a = new Set(ALL_SKILLS)
for(let b of SKILLS_NOT_ON_DECO){
  a.delete(b);
}
for(let deco of Object.values(decos)){
  if(deco.decoLv !== ONLY_ON){
    a.delete(parseInt(Object.keys(deco.skills_id)[0]))
  }
}
console.log(JSON.stringify([...a]));
*/

// THIS ONLY WORKS WHEN THERE's NOT COMBINED LV4 LIKE WORLD DOES
export const LV4_DECO = {
  5:2,11:2,12:2,18:3,23:2,25:2,26:2,27:2,29:1,
  30:2,31:2,32:2,33:2,34:2,36:2,38:2,39:2,
  40:2,41:2,42:3,45:2,46:2,47:2,54:2,56:5,
  57:2,58:2,59:3,60:2,61:2,62:3,63:2,64:2,
  65:2,66:2,67:3,68:3,69:3,70:3,71:3,72:2,
  73:3,74:3,75:3,76:3,78:3,79:3,80:3,81:2,
  84:2,85:3,86:3,87:2,88:3,89:4,90:3,93:3,
  96:3,104:2,105:3,106:2,107:2,108:2
};
export const LV4_SKILLS_ONLY_ON_LV4 =  new Set([
  29
]);
export const LV3_DECO = {
  13:3,14:3,15:3,16:3,17:3,22:1,35:2,37:1,
  38:1,48:1,49:1,50:1,51:1,55:1,56:3,61:1,
  84:1,87:1,89:3,94:1,108:1,122:1,126:1,127:1,133:1
};
export const LV3_SKILLS_ONLY_ON_LV3 = new Set([
  22,37,48,49,50,51,55,94,122,126,127,133
]);

export const LV2_DECO = {
  1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1, 9:1, 10:1,
  11:1, 12:1, 13:2, 14:2, 15:2, 16:2, 17:2, 19:1, 20:1,
  21:1, 23:1, 24:1, 25:1, 26:1, 27:1, 28:1, 30:1,
  31:1, 32:1, 33:1, 34:1, 35:1, 36:1, 39:1, 40:1,
  41:1, 45:1, 46:1, 47:1, 56:2, 57:1, 58:1, 60:1,
  63:1, 64:1, 65:1, 66:1, 72:1, 81:1, 88:1, 89:1,
  91:1, 92:1, 99:1, 104:1, 105:1, 106:1, 107:1, 116:1, 124:1, 128:1
};
export const LV2_SKILLS_ONLY_ON_LV2 = new Set([
  1,2,3,4,6,7,8,9,10,19,20,21,24,28,91,92,99,116,124,128
]);


export const LV1_DECO = new Set([
  13,14,15,16,17,18,42,43,44,52,53,54,56,59,62,
  67,68,69,70,71,73,74,75,76,77,78,79,80,85,86,
  90,93,95,96,97,98,123,129,118
]);
export const LV1_SKILLS_ONLY_ON_LV1 = new Set([
  43,44,52,53,77,95,97,98,118,123,129
]);

export const SET_SKILLS = [
  110, 109, 100, 101, 102, 111,
  118, 119, 120, 130, 132, 134
];

export const ALL_SKILLS = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
  101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
  111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
  122, 123, 124, 125, 126, 127, 128, 129, 130,
  131, 132, 133, 134,
])

/*
4,3,2,1

*/
export const EFFECTIVE_1_SKILLS = new Set([
  ...LV4_SKILLS_ONLY_ON_LV4,
  ...LV3_SKILLS_ONLY_ON_LV3,
  ...LV2_SKILLS_ONLY_ON_LV2,
  ...LV1_SKILLS_ONLY_ON_LV1,
])

export function transformSkillsKeyToId(
  skills: { [k: string]: number }
){
  if(transformSkillsKeyToId.cache.size === 0){
    for(let [key, value] of Object.entries(default_data.skills)){
      transformSkillsKeyToId.cache.set(value.name, parseInt(key));
    }
  }

  let out: any = {};

  for(let [k, v] of Object.entries(skills)){
    if(v){
      out[transformSkillsKeyToId.cache.get(k) || parseInt(k) || k] = v;
    }
  }
  return out;
}
transformSkillsKeyToId.cache = new Map<string, number>();


function intersect<T>(setA: Set<T>, B: Iterable<T>){
  return new Set(
    [...B].filter(v => setA.has(v))
  );
}
function minus<T>(a: Iterable<T>, minus: Iterable<T>){
  let b = new Set(minus);
  return [...a].filter(v => !b.has(v));
}

/*
procedure:
1) 

score: [
  <only on item (not on deco)>,
  <only on lv 4/3/2/1 deco skills>,
  (() => {
    lv 4 slots * 1
    lv 3 slots * 1
    lv 2 slots * 1
    lv 1 slots * 0.3

  }){}
]
*/
type Equipable = HasSkills & HasSlots & { [key: string]: any };
type Evaluation = [ number, number, number, number, number, number ]
type PartString = "head" | "chest" | "gloves" | "waist" | "legs" | "charms";
export class ArmorSearch
{
  private count = 0;
  private genId(){ return ++this.count; }
  store = [
    new Map<number, Equipable> (),
    new Map<number, Equipable> (),
    new Map<number, Equipable> (),
    new Map<number, Equipable> (),
    new Map<number, Equipable> (),
    new Map<number, Equipable> (),
  ];
  evaluations = new Map<number, Evaluation> ();

  sorted: Record<PartString, Array<number>> = {
    head: [],
    chest: [],
    gloves: [],
    waist: [],
    legs: [],
    charms: [],
  }

  reset(){
    this.store.forEach(map => map.clear());
    this.evaluations.clear();
    this.sorted = {
      head: [],
      chest: [],
      gloves: [],
      waist: [],
      legs: [],
      charms: [],
    };

    this.store.forEach(map => map.set(0, {
      skills: {},
      slots: [0, 0, 0],
      name: "None"
    }))
    this.evaluations.set(0, [0, 0, 0, 0, 0, 0]);

    for(let i of [0, 1, 2, 3, 4, 5]){
      this.add({
        part: i,
        skills: {},
        slots: [0, 0, 0]
      });
    }
  }
  constructor(){
    this.reset();
  }

  add(obj: Equipable & { part: number }){
    let id = this.genId();
    this.store[obj.part].set(id, obj);
    this.evaluations.set(id, this.evaluate(obj));
    
    let part: PartString = [
      "head", "chest", "gloves", "waist", "legs", "charms",
    ][obj.part] as PartString;
    this.sorted[part].push(id)

    this.sorted[part].sort((a, b) => (
      this.compareEvaluation(
        this.evaluations.get(b)!,
        this.evaluations.get(a)!
      )
    ));

    return id;
  }

  evaluate({
    skills, slots
  }: Equipable): Evaluation{

    let evaluation: Evaluation = [ 0, 0, 0, 0, 0, 0 ];
    for(let [ key, lv ] of Object.entries(skills)){
      let id = parseInt(key);

      switch(true){
      case LV4_SKILLS_ONLY_ON_LV4.has(id): evaluation[4] += lv; break;
      case LV3_SKILLS_ONLY_ON_LV3.has(id): evaluation[3] += lv; break;
      case LV2_SKILLS_ONLY_ON_LV2.has(id): evaluation[2] += lv; break;
      case LV1_SKILLS_ONLY_ON_LV1.has(id): evaluation[1] += lv; break;
      case SKILLS_NOT_ON_DECO.has(id): evaluation[5] += lv; break;
      default:
        evaluation[0] = [
          LV4_DECO, LV3_DECO, LV2_DECO, LV1_DECO
        ].map(decos => {
          if(Object.hasOwn(decos, id)){
            // @ts-ignore
            return 1 / decos[id];
          }
          return 0;
        }).reduce((l, r) => l < r ? l : r) * lv;
      }
    }

    // console.log(evaluation[0], SKILLS_NOT_ON_DECO);

    for(let lv of slots){
      if(!lv) continue;
      evaluation[lv] += 1;
    }

    return evaluation;
    // return evaluation.reduce((l, r) => (l << 8) | r);

  }
  compareEvaluation(a: Evaluation, b: Evaluation): number {

    if(a[5] !== b[5]){
      return a[5] - b[5];
    }
    
      let c = 0;
    for(let i = 4; i >= 1; --i){
      c += a[i] - b[i];
      if(c < 0) return c;
    }
    
    return a[0] + c - b[0];


  }
  higherEvaluation(a: Evaluation, b: Evaluation): boolean{
    return this.compareEvaluation(a, b) >= 0;
  }

  search(skills: Skills, {
    max_build = 200
  }: {
    max_build?: number
  } = {}){
    const in_skills_keys = Object.keys(skills);
    const in_skills_ids = new Set(Object.keys(skills).map(k => {
      let out = parseInt(k);
      if(!out){
        // translate here just in case
      }

      return out;
    }));

    let not_on_deco = Object.keys(
      skills
    ).filter(k => SKILLS_NOT_ON_DECO.has(parseInt(k))
    ).reduce((out, k) => {
      out[k] = skills[k];
      return out;
    }, {} as Skills);

    let required_eval = this.evaluate({
      skills,
      slots: [0, 0, 0]
    });
  

    let builds_found: number[][] = [];


    const sorted = ([
      "head", "chest", "gloves", "waist", "legs", "charms",
    ] as PartString[]).map((k, partTypeId) => {
      let bestSlots = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
      const betterSlots = (slots: [ number, number, number ]) => {
        slots.sort((a,b) => b-a);

        let better = false;
        for(let i of [2, 1, 0]){
          if(slots[i] > bestSlots[i][i]){
            for(let j = i; j <= 2; ++j){
              bestSlots[j] = slots.slice();
            }
            better = true;
          }
        }
        return better;
      }
      
      return this.sorted[k].filter(id => {
        let obj = this.store[partTypeId].get(id)!;
        let keys = Object.keys(obj.skills).map(k => parseInt(k));

        let keep = false;
        if(intersect(in_skills_ids, keys).size > 0){
          keep = true;
        }
        if(betterSlots(obj.slots)){
          keep = true;
        }
        return keep;
      });
    });

    sorted.forEach(arr => {
      arr.push(0);
    });
    console.log("SEARCH POOL:", sorted);

    sorted.forEach(arr => {
      console.log(this.evaluations.get(arr[0]));
    });

    let max_evals = Array(6).fill(0).map(_ => Array(6).fill(0) as Evaluation)
    for(let i = 0; i < 6; ++i){
      let maxEval = Array(6).fill(0) as Evaluation;

      let arr = sorted[i];
      for(let j = 0; j < arr.length; ++j){
        let tryEval = this.evaluations.get(arr[j]);
        if(tryEval === null || tryEval === undefined){
          throw new Error(arr[j] + " is not evaluated")
        }
        
        for(let k = 0; k < 6; ++k){
          maxEval[k] = Math.max(maxEval[k], tryEval[k]);
        }

      }

      max_evals[i] = maxEval;

    }
    let max_eval_suff = max_evals.reduceRight((r, l) => {
      let out = r[0].slice()
      for(let i = 0; i < 6; ++i){
        out[i] += l[i]
      }
      r.unshift(out);
      return r;
    }, [ [ 0, 0, 0, 0, 0, 0 ] ]);




    const self = this;

    let count = 10;
    let MAX_COUNT = 2;
    let sumUpSkillsTime = 0;
    let effective1Time = 0;
    const fillSlots = (selected: number[]) => {
      // ++count;

      const _log = (...args: any[]) => {
        // console.log("[fillSlots]", ...args);
      }
      
      if(count < MAX_COUNT){
        // _log("try to fill:", selected, selected.map(this.store.get.bind(this.store)));
      }

      let hasSkills: { [key: number]: number} = {}
      let hasSlots = [ 0, 0, 0, 0, 0 ];
      for(let selectedPart = 0; selectedPart <= 5; ++selectedPart){
        let id = selected[selectedPart];
        let obj = this.store[selectedPart].get(id)!;

        for(let [ key, lv ] of Object.entries(obj.skills)){
          let skillId = parseInt(key);
          hasSkills[skillId] = (hasSkills[skillId] || 0) + lv;
        }

        for(let slot of obj.slots){
          hasSlots[slot] += 1;
        }
      }


      if(count < MAX_COUNT){
        _log("hasSkills:", hasSkills, "hasSlots:", hasSlots);
      }

      let sumUpSkillsBeginTime = performance.now();
      let needSkills: { [key: number]: number } = {};
      for(let id of in_skills_ids){
        let lv = skills[id];
        lv -= (hasSkills[id] || 0);
        if(lv > 0){
          needSkills[id] = lv;
        }
      }
      let need_skills_ids = Object.keys(
        needSkills
      ).map(k => parseInt(k));
      sumUpSkillsTime += performance.now() - sumUpSkillsBeginTime;
      
      if(count < MAX_COUNT){
        _log("hasSkills:", hasSkills,
          "hasSlots:", hasSlots,
          "needSkills:", needSkills,
          skills, skills[29]
        );
      }

      // for(let id of intersect(LV4_SKILLS, need_skills_ids)){
      //   if(hasSlots[4] >= needSkills[id]){
      //     hasSlots[4] -= needSkills[id];
      //   } else{
      //     return false;
      //   }
      // }
      // need_skills_ids = minus(need_skills_ids, LV4_SKILLS);
      
      // #region filter out skills not on deco
      for(let id of intersect(SKILLS_NOT_ON_DECO, need_skills_ids)){
        if(!hasSkills[id]) return false;
        if(hasSkills[id] < needSkills[id]) return false;
      }
      // #endregion
      

      //*
      // #region filter effectively 1 skills
      let effective1StartTime = performance.now();
      let effective_1_skills = [
        LV1_SKILLS_ONLY_ON_LV1,
        LV2_SKILLS_ONLY_ON_LV2,
        LV3_SKILLS_ONLY_ON_LV3,
        LV4_SKILLS_ONLY_ON_LV4,
      ];
      for(let slotLv = 4; slotLv >= 1; --slotLv){
        let skillsOnlyAtCurrentLv = intersect(effective_1_skills[slotLv-1], need_skills_ids);
        
        // let evaluation = 0
        // for(let i = 0; i <= 5; ++i){
        //   evaluation += this.evaluations.get(selected[i])!;
        // }

        for(let id of skillsOnlyAtCurrentLv){

          if(!needSkills[id] || needSkills[id] <= 0){
            throw new Error(
              "FATAL: searching needs skill #" +
              id + " of 0 level"
            )
          }
  
          for(let i = slotLv; i <= 4; ++i){
            if(hasSlots[i] >= needSkills[id]){
              hasSlots[i] -= needSkills[id];
              needSkills[id] = 0;
              break;
            } else if(hasSlots[i] > 0){
              needSkills[id] -= hasSlots[i];
              hasSlots[i] = 0;
            }
          }
          
  
          if(needSkills[id] > 0){
            return false;
          }
  
          delete needSkills[id];
        }
      }
      effective1Time += performance.now() - effective1StartTime;
      // #endregion filter effectively 1 skills
/*****/

      need_skills_ids = Object.keys(
        needSkills
      ).map(k => parseInt(k)
      ).sort((a, b) => needSkills[b]-needSkills[a]);

      // if(intersect(EFFECTIVE_1_SKILLS, need_skills_ids).size){
      //   throw new Error(
      //     "FATAL: effective 1 skills remains [" + [
      //       ...intersect(EFFECTIVE_1_SKILLS, need_skills_ids)
      //     ].join(" ") + "]"
      //   );
      // }


      const hasDecoAtLv = (id: number, lv: number) => {
        switch(lv){
        case 4: return Object.hasOwn(LV4_DECO, id);
        case 3: return Object.hasOwn(LV3_DECO, id);
        case 2: return Object.hasOwn(LV2_DECO, id);
        case 1: return LV1_DECO.has(id);
        }

        throw new Error(
          "FATAL: skill without deco slipped in deco searching" +
          " skill id: " + id
        );
      };

      // I wannt use DP but dunno how
      return (function fillRemainingSlots(
        hasSlots, needSkills, currentIndex
      ): boolean{
        if(currentIndex >= need_skills_ids.length){
          return true;
        }

        let id = need_skills_ids[currentIndex];
        if(needSkills[id] <= 0){
          return fillRemainingSlots(
            hasSlots, needSkills, currentIndex+1
          );
        }

        
        hasSlots = hasSlots.slice();
        needSkills = { ...needSkills };
        for(let deco = 4; deco >= 1; --deco){
          _log("OMG", need_skills_ids, currentIndex, deco, hasSlots, needSkills)

          if(!hasDecoAtLv(id, deco)) continue;
          for(let fillSlot = deco; fillSlot <= 4; ++fillSlot){
            if(hasSlots[fillSlot] < 0) continue;

            let decoSkillLv: number = deco === 1 ? 1 : (
            // @ts-ignore
              [LV2_DECO, LV3_DECO, LV4_DECO][deco-2][id]
            );

            hasSlots[fillSlot] -= 1;
            needSkills[id] -= decoSkillLv;
            let success = fillRemainingSlots(
              hasSlots,
              needSkills,
              currentIndex
            );
            if(success){
              return true;
            }
            
            hasSlots[fillSlot] += 1;
            needSkills[id] += decoSkillLv;
          }
        }

        return false;
      })(hasSlots, needSkills, 0);
    };

    console.log("max_eval_suff:", max_eval_suff, max_evals);
    // console.log(sorted.map(arr => arr[0]));
    // console.log(sorted.map(arr => arr[0]).map(id => this.evaluations.get(id)));
    // console.log(sorted.map(arr => arr[0]).map((id, i) => this.store[i].get(id)));
    // console.log(required_eval.toString(8));

    let buildsAttemped = 0
    
    let fillSlotsTime = 0;


    const higherEvaluation = self.higherEvaluation.bind(self);
    function innerSearch(
      currentLevel: number,
      current_eval: Evaluation,
      selected = [ 0, 0, 0, 0, 0, 0 ]
    ){
      const _log = (...args: any[]) => {
        // console.info("[innerSearch]", ...args);
      }
      _log("new call:", currentLevel, current_eval, selected);


      if(builds_found.length >= max_build){
        return false;
      }

      if(!higherEvaluation(
        current_eval.map((e, i) => {
          return e + max_eval_suff[currentLevel][i] + (
            (currentLevel === 5 ? 0 : max_eval_suff[currentLevel+1][i])
          )
        }) as Evaluation,
        required_eval,
      )){

        _log(
          "terminate early:",
          currentLevel,
          current_eval,
          max_eval_suff[currentLevel+1],
          required_eval
        );
        return false;
      }


      for(let id of sorted[currentLevel]){
        let self_eval = self.evaluations.get(id)!;

        

        if(currentLevel === 5){
          buildsAttemped++;
  
          let fillSlotsStartTime = performance.now();
          if(fillSlots(selected)){
            builds_found.push(selected);
          }
          fillSlotsTime += performance.now() - fillSlotsStartTime;
  
          if(builds_found.length >= max_build){
            return false;
          }
  
          return true;
        }
  
          
        let keepGoing = innerSearch(
          currentLevel + 1,
          current_eval.map((e, i) => {
            return e + self_eval[i]
          }) as Evaluation,
          selected.map((e, i) => i === currentLevel ? id : e)
        )
        if(!keepGoing){
          // return true;
        }
      }

      return true;

    }
    
    innerSearch(0, [0, 0, 0, 0, 0, 0]);

    console.log(
      "buildsAttempted:", buildsAttemped,
      "fillSlotsTime:", fillSlotsTime,
      "sumUpSkillsTime:", sumUpSkillsTime,
      "effective1Time:", effective1Time
    );

    return builds_found;
  }
}

console.time("init");
import default_data from "./data/default_data.json";

let LIMITED = false;

let a = new ArmorSearch();
for(let {
  part,
  skills_id,
  slots,
  name
} of Object.values(default_data.armors)){
  if(LIMITED && [
    "妃蜘蛛X頭盔",
    "禍鎧･怨【胸甲】",
    "禍鎧･怨【臂甲】",
    "禍鎧･怨【腰具】",
    "方舟護腿",
  ].includes(name)){
    continue;
  }
  
  let id = a.add({
    part,
    skills: JSON.parse(skills_id.replaceAll(/\d+:/g, (g0) => `"${g0}":`)),
    slots: slots as [ number, number, number ],
    name
  })
}
import fs from "fs";
import path from "path";
let f = fs.readFileSync(
  path.resolve(__dirname, "data/exported_charms.csv"), {
    encoding: "utf-8"
  }
);
for(let line of f.split("\n")){
  if(LIMITED) continue;

  line = line.trim()
  if(!line) continue;

  let arr = line.split(",")
  let charm: Equipable = {
    //@ts-ignore
    skills: transformSkillsKeyToId({
      [arr[0]]: parseInt(arr[1] || "") || undefined,
      [arr[2]]: parseInt(arr[3] || "") || undefined,
    }),
    slots: [
      parseInt(arr[4]),
      parseInt(arr[5]),
      parseInt(arr[6]),
    ]
  }
  a.add({
    part: 5,
    name: line,
    ...charm
  });
}
console.timeEnd("init");


console.time("search");
let searchFor = { '1': 4, '11': 3, '29': 1, '49': 2, '50': 3, '115': 3, '117': 1 };
let result = a.search(searchFor);
console.log("searching for: ", searchFor, a.evaluate({
  skills: searchFor,
  slots: [0, 0, 0]
}));
for(let set of result.slice(-2)){
  console.log(
    set.map((id, i) => {
      let obj = a.store[i].get(id);
      if(obj){
        let skills = JSON.stringify(obj.skills);
        return `${obj.name} ${skills}`;
      }
      return "BRUH";
    })
  )
}
console.log("builds found:", result.length);
console.timeEnd("search");

let out = transformSkillsKeyToId({

  "貫通彈･貫通箭強化": 2,
  "散彈･擴散箭強化": 3,
  "業鎧【修羅】": 3,
  "狂龍症【蝕】": 1,
  "會心擊【屬性】": 3,
  "解放弓的蓄力階段": 1,
})
console.log(out);


console.log(a.higherEvaluation([ 0, 0, 2, 1, 0, 1 ], [ 0, 0, 0, 4, 1, 0 ]))

;[
  470, 510, 473, 432, 433, 337,
    338, 326, 307, 426, 449, 450,
    443, 525, 502, 532, 305, 497,
    498, 485, 304, 306
].forEach(id => {
  // console.log(a.evaluations.get(id), a.store[1].get(id))
})
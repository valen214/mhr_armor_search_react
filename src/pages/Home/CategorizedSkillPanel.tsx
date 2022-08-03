
import React, {
  useContext,
  useEffect, useState
} from "react";
import SkillSelector from "./SkillSelector";
import { useControlled } from "@mui/material";
import { SkillsContext } from "./ManualSearchScreen";

export type CategorizedSkillPanelProps = {
  title?: string
  skillIds: Array<number>
  skillLvs?: Array<number>
  setSkillLvs?: (lvs: Array<number>) => void
  updateContext?: boolean
}
export default function CategorizedSkillPanel({
  title,
  skillIds,
  skillLvs: initialSkillLvs,
  updateContext,
}: CategorizedSkillPanelProps){
  const [, setSkill] = useContext(SkillsContext);
  const [ collapse, setCollapse ] = useState(false);
  const [ skillLvs, setSkillLvs ] = useControlled({
    controlled: initialSkillLvs,
    //@ts-ignore
    default: () => Array(skillIds.length).fill(0),
    name: "CategorizedSkillPanel"
  });

  const setSkillLv = (i: number, lv: number) => {
    let newSkillLvs = [ ...skillLvs ];
    newSkillLvs[i] = lv;
    setSkillLvs(newSkillLvs);
    if(updateContext){
      setSkill(skillIds[i], lv);
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      {skillIds.map((id, i) => (
        <SkillSelector
          key={id}
          skillId={id}
          lv={skillLvs[i]}
          setLv={(lv) => setSkillLv(i, lv)}
        />
      ))}
    </div>
  );
}
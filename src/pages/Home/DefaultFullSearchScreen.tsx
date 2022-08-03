
import React, {
  useEffect, useState
} from "react";
import SkillSelector from "./SkillSelector";

export type DefaultFullSearchScreenProps = {
  
}
export default function DefaultFullSearchScreen({
  
}: DefaultFullSearchScreenProps){

  return (
    <div>
      <SkillSelector skillId={1} maxLv={3} />
      <SkillSelector skillId={1} maxLv={3} />
      <SkillSelector skillId={1} maxLv={3} />
      <SkillSelector skillId={1} maxLv={3} />
      <SkillSelector skillId={3} maxLv={3} />
      <SkillSelector skillId={1} maxLv={3} />
      <SkillSelector skillId={5} maxLv={3} />
    </div>
  );
}
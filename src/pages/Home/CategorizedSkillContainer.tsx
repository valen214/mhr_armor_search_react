import { useMemo } from "react";
import styled from "styled-components";
import { useStrings } from "../../lang/useStrings";
import { Skills } from "../../lib/search_algo";
import ContextedCategorizedSkillPanel from "./ContextedCategorizedSkillPanel";
import { SkillsContext } from "./ManualSearchScreen";


// from https://mhrise.wiki-db.com/sim/?hl=en
const DEFAULT_SKILLS_CATEGORIES = {
  quest: [
    34, 94, 32, 104, 105, 33, 80, 79,
    43, 96, 95, 83, 84, 82, 123, 129
  ],
  item: [ 60, 58, 88, 87, 90, 89, 86 ],
  battle_survival: [
    64, 65, 66, 97, 35, 36, 57, 40,
    93, 59, 112, 122, 114
  ],
  resistance: [
    61, 62, 63, 76, 74, 73, 75, 77, 78, 72, 108, 133
  ],
  parameter_change: [
    1, 56, 67, 68, 69, 70, 71
  ],
  battle_elem_special: [
    13, 14, 15, 16, 17, 18, 21, 20, 19, 41, 81, 42, 99, 98, 124
  ],
  battle_attack: [
    6, 8, 10, 38, 39, 7, 11, 37, 91, 103, 4, 106, 5, 92, 3, 9,
    2, 28, 30, 31, 45, 113, 115, 116, 117, 125, 127, 128, 131
  ],
  battle_swordsman: [
    22, 23, 12, 26, 85, 25, 107, 46, 44
  ],
  battle_gunner: [
    48, 50, 49, 24, 27, 47, 53, 52, 51, 54, 55, 29, 126
  ],
  set_skill: [
    110, 109, 100, 101, 102, 111
  ],
  // general_purpose: [],
}

const StyledCategorizedSkillContainer = styled.div`
overflow: auto;
`;

export default function CategorizedSkillContainer({
  skills, setSkill, collapseAll
}: {
  skills: Skills
  setSkill: (id: number, lv: number) => void
  collapseAll?: boolean
}){
  const strings = useStrings();
  const skillsContext = useMemo<[
    Skills,
    (id: number, lv: number) => void
  ]>(() => {
    return [ skills, setSkill ]
  }, [ skills, setSkill ]);
  
  const DefaultCategorizedSkills = useMemo(() => (
    Object.entries(DEFAULT_SKILLS_CATEGORIES).map((
      [ category, skillIds ]
    ) => (
      <ContextedCategorizedSkillPanel
        // @ts-ignore
        key={category}
        // @ts-ignore
        title={strings[category]}
        skillIds={skillIds}
        collapseAll={collapseAll}
      />
    ))
  ), [ collapseAll, strings, strings.getLanguage() ]);

  return (
    <StyledCategorizedSkillContainer>
      <SkillsContext.Provider value={skillsContext}>
        { DefaultCategorizedSkills }
        <ContextedCategorizedSkillPanel
          title={strings.quest}
          skillIds={[ 1, 2, 3, 4, 5, 6 ]}
          collapseAll={collapseAll}
        />
        <ContextedCategorizedSkillPanel
          title={strings.battle_survival}
          skillIds={[ 2, 4, 6, 8, 5, 10 ]}
          collapseAll={collapseAll}
        />
        <ContextedCategorizedSkillPanel
          title={strings.item}
          skillIds={[ 2, 4, 6, 8, 5, 10 ]}
          collapseAll={collapseAll}
        />
      </SkillsContext.Provider>
    </StyledCategorizedSkillContainer>
  )
}